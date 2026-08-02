import {
  getShipment,
  updateShipmentFields,
  updateShipmentStatus,
} from "@/lib/data/shipment-repository";
import { getLoadExchangeClient } from "@/lib/network/load-exchange/client";
import {
  buildListingsBoardMap,
  expireStaleListings,
  getListingByShipment,
  getOutboundListingStats,
  listAcceptedListingAssignments,
  listOffersForListing,
  listOffersForShipment,
  listOutboundListings,
  toListingMirror,
} from "@/lib/network/listing-store";
import {
  ensureNetworkHydrated,
  persistNetworkSnapshot,
} from "@/lib/network/network-persistence";
import type { PostListingInput, UpdateListingInput } from "@/lib/network/listing-types";
import { logActivity } from "@/lib/dev-store";
import { getPolicySettings } from "@/lib/settings/config-repository";

export { buildListingsBoardMap, getOutboundListingStats, listAcceptedListingAssignments };

async function syncExpiredListingMirrors() {
  await ensureNetworkHydrated();
  const expiredIds = expireStaleListings();
  for (const shipmentId of expiredIds) {
    await syncShipmentListingMirror(shipmentId, null);
  }
  if (expiredIds.length > 0) await persistNetworkSnapshot();
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
  try {
    if (!listing || ["withdrawn", "expired"].includes(listing.state)) {
      await updateShipmentFields(shipmentId, { networkListing: null });
      return;
    }
    await updateShipmentFields(shipmentId, { networkListing: toListingMirror(listing) });
  } catch (e) {
    console.warn(
      "[network] shipment mirror skipped (Fleetbase down?):",
      e instanceof Error ? e.message : e,
    );
  }
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
  await ensureNetworkHydrated();
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

  const lx = getLoadExchangeClient();
  const result = await lx.listingCreate({
    ...input,
    listingTtlHours: policies.listingTtlHours,
  });
  if (!result.ok) return { error: result.error };

  const listing = result.data.listing;
  await syncShipmentListingMirror(input.shipmentId, listing);
  await persistNetworkSnapshot();
  const offers = listOffersForListing(listing.id);
  if (offers.length > hadOffers && listing.state === "offers_received") {
    notifyFirstOffers(input.shipmentId, shipment.publicId, offers.length);
  }
  return { listing, offers };
}

export async function updateShipmentListing(shipmentId: string, input: UpdateListingInput) {
  await ensureNetworkHydrated();
  const shipment = await getShipment(shipmentId);
  const listingBefore = getListingByShipment(shipmentId);
  const offersBefore = listingBefore ? listOffersForListing(listingBefore.id).length : 0;

  const lx = getLoadExchangeClient();
  const result = await lx.listingUpdate({ shipmentId, patch: input });
  if (!result.ok) return { error: result.error };

  const listing = result.data.listing;
  await syncShipmentListingMirror(shipmentId, listing);
  await persistNetworkSnapshot();
  const offers = listOffersForListing(listing.id);
  if (
    shipment &&
    offers.length > offersBefore &&
    listing.state === "offers_received"
  ) {
    notifyFirstOffers(shipmentId, shipment.publicId, offers.length);
  }
  return { listing, offers };
}

export async function withdrawShipmentListing(shipmentId: string) {
  await ensureNetworkHydrated();
  const lx = getLoadExchangeClient();
  const result = await lx.listingWithdraw({ shipmentId });
  if (!result.ok) return { error: result.error };

  await syncShipmentListingMirror(shipmentId, null);
  await persistNetworkSnapshot();
  return { listing: result.data.listing };
}

export async function withdrawListingOnCancel(shipmentId: string) {
  await ensureNetworkHydrated();
  const listing = getListingByShipment(shipmentId);
  if (!listing) return;
  const lx = getLoadExchangeClient();
  await lx.listingWithdraw({ shipmentId });
  await syncShipmentListingMirror(shipmentId, null);
  await persistNetworkSnapshot();
}

export async function acceptNetworkOffer(offerId: string) {
  await ensureNetworkHydrated();
  const lx = getLoadExchangeClient();
  const result = await lx.offerAccept({ offerId });
  if (!result.ok) return { error: result.error };

  const { listing, offer } = result.data;
  await syncShipmentListingMirror(listing.shipmentId, listing);
  await persistNetworkSnapshot();

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
  await ensureNetworkHydrated();
  const lx = getLoadExchangeClient();
  const result = await lx.offerReject({ offerId, reason });
  if (!result.ok) return { error: result.error };
  await persistNetworkSnapshot();
  return { offer: result.data.offer };
}

export async function listOutboundNetworkDesk(state?: string) {
  await syncExpiredListingMirrors();
  const rows = listOutboundListings({ state });
  const enriched = await Promise.all(
    rows.map(async (listing) => {
      let shipment = null;
      try {
        shipment = await getShipment(listing.shipmentId);
      } catch {
        shipment = null;
      }
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
