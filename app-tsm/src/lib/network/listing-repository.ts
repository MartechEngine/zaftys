import {
  getShipment,
  updateShipmentFields,
  updateShipmentStatus,
} from "@/lib/data/shipment-repository";
import {
  acceptOffer,
  buildListingsBoardMap,
  createListing,
  expireStaleListings,
  getListingByShipment,
  getOutboundListingStats,
  listAcceptedListingAssignments,
  listOffersForListing,
  listOffersForShipment,
  listOutboundListings,
  rejectOffer,
  toListingMirror,
  updateListing,
  withdrawListing,
} from "@/lib/network/listing-store";
import type { PostListingInput, UpdateListingInput } from "@/lib/network/listing-types";
import { logActivity } from "@/lib/dev-store";
import { getPolicySettings } from "@/lib/settings/config-repository";

export { buildListingsBoardMap, getOutboundListingStats, listAcceptedListingAssignments };

async function syncExpiredListingMirrors() {
  const expiredIds = expireStaleListings();
  for (const shipmentId of expiredIds) {
    await syncShipmentListingMirror(shipmentId, null);
  }
}

function notifyFirstOffers(shipmentId: string, publicId: string, count: number) {
  logActivity({
    shipmentId,
    type: "network.offer.received",
    message: `TranZfort offer on ${publicId} · ${count} partner request(s)`,
    timestamp: new Date().toISOString(),
  });
}

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
  await syncExpiredListingMirrors();
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

  const policies = await getPolicySettings();
  const listingBefore = getListingByShipment(input.shipmentId);
  const hadOffers = listingBefore ? listOffersForListing(listingBefore.id).length : 0;

  const result = createListing({
    ...input,
    listingTtlHours: policies.listingTtlHours,
  });
  if ("error" in result) return result;

  await syncShipmentListingMirror(input.shipmentId, result);
  const offers = listOffersForListing(result.id);
  if (offers.length > hadOffers && result.state === "offers_received") {
    notifyFirstOffers(input.shipmentId, shipment.publicId, offers.length);
  }
  return { listing: result, offers };
}

export async function updateShipmentListing(shipmentId: string, input: UpdateListingInput) {
  const shipment = await getShipment(shipmentId);
  const listingBefore = getListingByShipment(shipmentId);
  const offersBefore = listingBefore ? listOffersForListing(listingBefore.id).length : 0;

  const result = updateListing(shipmentId, input);
  if ("error" in result) return result;

  await syncShipmentListingMirror(shipmentId, result);
  const offers = listOffersForListing(result.id);
  if (
    shipment &&
    offers.length > offersBefore &&
    result.state === "offers_received"
  ) {
    notifyFirstOffers(shipmentId, shipment.publicId, offers.length);
  }
  return { listing: result, offers };
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

export async function rejectNetworkOffer(offerId: string, reason?: string) {
  const offer = rejectOffer(offerId, reason);
  if (!offer) return { error: "Offer not available." as const };
  return { offer };
}

export async function listOutboundNetworkDesk(state?: string) {
  await syncExpiredListingMirrors();
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
