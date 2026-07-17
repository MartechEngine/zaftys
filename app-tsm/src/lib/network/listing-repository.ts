import {
  getShipment,
  updateShipmentFields,
  updateShipmentStatus,
} from "@/lib/data/shipment-repository";
import {
  acceptOffer,
  buildListingsBoardMap,
  createListing,
  getListingByShipment,
  getOutboundListingStats,
  listOffersForListing,
  listOffersForShipment,
  listOutboundListings,
  rejectOffer,
  toListingMirror,
  updateListing,
  withdrawListing,
} from "@/lib/network/listing-store";
import type { PostListingInput, UpdateListingInput } from "@/lib/network/listing-types";

export { buildListingsBoardMap, getOutboundListingStats };

async function syncShipmentListingMirror(
  shipmentId: string,
  listing: ReturnType<typeof getListingByShipment>,
) {
  if (!listing || ["withdrawn", "expired"].includes(listing.state)) {
    await updateShipmentFields(shipmentId, { networkListing: null });
    return;
  }
  await updateShipmentFields(shipmentId, { networkListing: toListingMirror(listing) });
}

export async function getShipmentNetworkContext(shipmentId: string) {
  const shipment = await getShipment(shipmentId);
  if (!shipment) return null;
  const listing = getListingByShipment(shipmentId);
  const offers = listing
    ? listOffersForListing(listing.id)
    : listOffersForShipment(shipmentId);
  return { shipment, listing, offers };
}

export async function postShipmentListing(input: PostListingInput) {
  const shipment = await getShipment(input.shipmentId);
  if (!shipment) return { error: "Shipment not found." as const };
  if (shipment.status === "delivered" || shipment.status === "cancelled") {
    return { error: "Cannot post completed or cancelled shipments." as const };
  }
  if (!["pending", "dispatched"].includes(shipment.status)) {
    return { error: "Only pending or dispatched shipments can be posted." as const };
  }

  const result = createListing(input);
  if ("error" in result) return result;

  await syncShipmentListingMirror(input.shipmentId, result);
  return { listing: result, offers: listOffersForListing(result.id) };
}

export async function updateShipmentListing(shipmentId: string, input: UpdateListingInput) {
  const result = updateListing(shipmentId, input);
  if ("error" in result) return result;

  await syncShipmentListingMirror(shipmentId, result);
  return { listing: result, offers: listOffersForListing(result.id) };
}

export async function withdrawShipmentListing(shipmentId: string) {
  const listing = withdrawListing(shipmentId);
  if (!listing) return { error: "No active listing to withdraw." as const };
  await syncShipmentListingMirror(shipmentId, null);
  return { listing };
}

export async function withdrawListingOnCancel(shipmentId: string) {
  const listing = getListingByShipment(shipmentId);
  if (!listing) return;
  withdrawListing(shipmentId);
  await syncShipmentListingMirror(shipmentId, null);
}

export async function acceptNetworkOffer(offerId: string) {
  const result = acceptOffer(offerId);
  if ("error" in result) return result;

  const { listing, offer } = result;
  await syncShipmentListingMirror(listing.shipmentId, listing);

  // Capacity source becomes network on first accept (ADR-006)
  await updateShipmentFields(listing.shipmentId, {
    originType: "network",
    driver: offer.partnerName,
    vehicle: offer.truckLabel,
  });
  if (listing.state === "assigned") {
    try {
      await updateShipmentStatus(listing.shipmentId, "dispatched");
    } catch {
      // pending→dispatched may already be dispatched; ignore
    }
  }

  const shipment = await getShipment(listing.shipmentId);
  return { listing, offer, shipment };
}

export async function rejectNetworkOffer(offerId: string) {
  const offer = rejectOffer(offerId);
  if (!offer) return { error: "Offer not available." as const };
  return { offer };
}

export async function listOutboundNetworkDesk(state?: string) {
  const rows = listOutboundListings({ state });
  const enriched = await Promise.all(
    rows.map(async (listing) => {
      const shipment = await getShipment(listing.shipmentId);
      return {
        listing,
        offers: listOffersForListing(listing.id),
        openOffers: listOffersForListing(listing.id).filter((o) => o.status === "open").length,
        shipment: shipment
          ? {
              publicId: shipment.publicId,
              origin: shipment.origin,
              destination: shipment.destination,
              commodity: shipment.commodity,
            }
          : null,
      };
    }),
  );
  return enriched;
}
