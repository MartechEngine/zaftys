import { logActivity } from "@/lib/dev-store";
import type {
  NetworkListing,
  NetworkListingMirror,
  NetworkOffer,
  PostListingInput,
  UpdateListingInput,
} from "@/lib/network/listing-types";

const g = globalThis as typeof globalThis & {
  __tsmNetworkListings?: NetworkListing[];
  __tsmNetworkOffers?: NetworkOffer[];
};

function listings(): NetworkListing[] {
  if (!g.__tsmNetworkListings) g.__tsmNetworkListings = [];
  return g.__tsmNetworkListings;
}

function offers(): NetworkOffer[] {
  if (!g.__tsmNetworkOffers) g.__tsmNetworkOffers = [];
  return g.__tsmNetworkOffers;
}

function seedDemoOffers(listing: NetworkListing) {
  const existing = offers().filter((o) => o.listingId === listing.id);
  if (existing.length > 0) return;
  const demos: Omit<NetworkOffer, "id" | "listingId" | "shipmentId" | "submittedAt" | "status">[] = [
    {
      partnerName: "Rajesh K.",
      rating: 4.8,
      verified: true,
      bodyType: listing.bodyType || "Open",
      tyres: 10,
      truckLabel: "MH-12 AB 4521",
      rateInr: listing.rateInr,
    },
    {
      partnerName: "Suresh M.",
      rating: 4.6,
      verified: true,
      bodyType: listing.bodyType || "Open",
      tyres: 12,
      truckLabel: "GJ-06 CD 8890",
      rateInr: Math.round(listing.rateInr * 0.98),
    },
    {
      partnerName: "Manjeet S.",
      rating: 4.9,
      verified: true,
      bodyType: "Container",
      tyres: 10,
      truckLabel: "PB-03 EF 2210",
      rateInr: listing.rateInr,
    },
  ];
  const now = new Date().toISOString();
  for (const d of demos) {
    offers().unshift({
      ...d,
      id: `no-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      listingId: listing.id,
      shipmentId: listing.shipmentId,
      submittedAt: now,
      status: "open",
    });
  }
  listing.state = "offers_received";
}

export function toListingMirror(listing: NetworkListing): NetworkListingMirror {
  return {
    id: listing.id,
    state: listing.state,
    trucksNeeded: listing.trucksNeeded,
    trucksFilled: listing.trucksFilled,
    rateInr: listing.rateInr,
    postedAt: listing.postedAt,
  };
}

const OUTBOUND_KPI_STATES = ["posted", "offers_received", "partially_assigned"] as const;

export function getOutboundListingStats() {
  const active = listings().filter((l) =>
    OUTBOUND_KPI_STATES.includes(l.state as (typeof OUTBOUND_KPI_STATES)[number]),
  );
  const openPosts = active.length;
  const activeIds = new Set(active.map((l) => l.id));
  const offersWaiting = offers().filter(
    (o) => o.status === "open" && activeIds.has(o.listingId),
  ).length;
  const drafts = listings().filter((l) => l.state === "draft").length;
  return { openPosts, offersWaiting, drafts };
}

export function getListingBoardEntry(shipmentId: string): {
  listing: NetworkListing;
  openOffers: number;
} | null {
  const listing = listings().find(
    (l) => l.shipmentId === shipmentId && !["withdrawn", "expired"].includes(l.state),
  );
  if (!listing) return null;
  const openOffers = offers().filter(
    (o) => o.listingId === listing.id && o.status === "open",
  ).length;
  return { listing, openOffers };
}

export function buildListingsBoardMap(): Record<
  string,
  { listing: NetworkListing; openOffers: number }
> {
  const map: Record<string, { listing: NetworkListing; openOffers: number }> = {};
  for (const listing of listings()) {
    if (["withdrawn", "expired"].includes(listing.state)) continue;
    const openOffers = offers().filter(
      (o) => o.listingId === listing.id && o.status === "open",
    ).length;
    map[listing.shipmentId] = { listing, openOffers };
  }
  return map;
}

export function getListingByShipment(shipmentId: string): NetworkListing | null {
  return (
    listings().find(
      (l) =>
        l.shipmentId === shipmentId &&
        !["withdrawn", "expired"].includes(l.state),
    ) ?? null
  );
}

export function listOutboundListings(opts?: {
  state?: string;
}): NetworkListing[] {
  let rows = [...listings()];
  if (opts?.state && opts.state !== "all") {
    rows = rows.filter((l) => l.state === opts.state);
  }
  return rows.sort((a, b) => (b.postedAt || "").localeCompare(a.postedAt || ""));
}

export function listOffersForListing(listingId: string): NetworkOffer[] {
  return offers().filter((o) => o.listingId === listingId);
}

export function listOffersForShipment(shipmentId: string): NetworkOffer[] {
  return offers().filter((o) => o.shipmentId === shipmentId);
}

export function createListing(input: PostListingInput): NetworkListing | { error: string } {
  const existing = getListingByShipment(input.shipmentId);
  if (existing && !["withdrawn", "expired", "assigned"].includes(existing.state)) {
    return { error: "Shipment already has an active TranZfort listing." };
  }

  const trucksNeeded = Math.max(1, Math.min(20, Math.round(input.trucksNeeded) || 1));
  const advancePercent = Math.max(0, Math.min(50, Math.round(input.advancePercent) || 0));
  const rateInr = Math.max(1, Math.round(input.rateInr) || 0);
  if (!rateInr) return { error: "Rate is required." };

  const publish = input.publish !== false;
  const listing: NetworkListing = {
    id: `nl-${Date.now().toString(36)}`,
    shipmentId: input.shipmentId,
    state: publish ? "posted" : "draft",
    trucksNeeded,
    trucksFilled: 0,
    priceType: input.priceType === "per_ton" ? "per_ton" : "fixed",
    rateInr,
    advancePercent,
    visibility: "verified_open",
    bodyType: input.bodyType?.trim() || undefined,
    tyres: input.tyres ? Math.max(6, Math.min(22, Math.round(input.tyres))) : undefined,
    pickupWindowStart: input.pickupWindowStart || undefined,
    pickupWindowEnd: input.pickupWindowEnd || undefined,
    plantNotes: input.plantNotes?.trim() || undefined,
    postedAt: publish ? new Date().toISOString() : undefined,
    expiresAt: publish
      ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      : undefined,
    tranzfortTripIds: [],
  };

  listings().unshift(listing);
  logActivity({
    shipmentId: input.shipmentId,
    type: publish ? "network.listing.posted" : "network.listing.draft",
    message: publish
      ? `Posted to TranZfort · ${trucksNeeded} truck(s) · ₹${rateInr.toLocaleString("en-IN")}`
      : `Draft TranZfort listing · ${trucksNeeded} truck(s)`,
    timestamp: new Date().toISOString(),
  });

  if (publish) {
    // Demo: partners respond immediately so Offers tab is usable
    seedDemoOffers(listing);
  }

  return listing;
}

export function updateListing(
  shipmentId: string,
  input: UpdateListingInput,
): NetworkListing | { error: string } {
  const listing = getListingByShipment(shipmentId);
  if (!listing) return { error: "No active listing to update." };
  if (["assigned", "withdrawn", "expired"].includes(listing.state)) {
    return { error: "Listing cannot be edited in this state." };
  }

  if (input.rateInr !== undefined) {
    const rateInr = Math.max(1, Math.round(input.rateInr));
    if (!rateInr) return { error: "Rate is required." };
    listing.rateInr = rateInr;
  }
  if (input.trucksNeeded !== undefined) {
    const trucksNeeded = Math.max(1, Math.min(20, Math.round(input.trucksNeeded) || 1));
    if (trucksNeeded < listing.trucksFilled) {
      return { error: "Cannot reduce trucks below filled slots." };
    }
    listing.trucksNeeded = trucksNeeded;
  }
  if (input.bodyType !== undefined) {
    listing.bodyType = input.bodyType.trim() || undefined;
  }
  if (input.tyres !== undefined) {
    listing.tyres = Math.max(6, Math.min(22, Math.round(input.tyres) || 10));
  }
  if (input.pickupWindowStart !== undefined) {
    listing.pickupWindowStart = input.pickupWindowStart || undefined;
  }
  if (input.pickupWindowEnd !== undefined) {
    listing.pickupWindowEnd = input.pickupWindowEnd || undefined;
  }
  if (input.plantNotes !== undefined) {
    listing.plantNotes = input.plantNotes.trim() || undefined;
  }

  if (input.publish === true && listing.state === "draft") {
    listing.state = "posted";
    listing.postedAt = new Date().toISOString();
    listing.expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    seedDemoOffers(listing);
    logActivity({
      shipmentId,
      type: "network.listing.posted",
      message: `Published draft to TranZfort · ${listing.trucksNeeded} truck(s) · ₹${listing.rateInr.toLocaleString("en-IN")}`,
      timestamp: new Date().toISOString(),
    });
  } else {
    logActivity({
      shipmentId,
      type: "network.listing.updated",
      message: `Updated TranZfort listing ${listing.id}`,
      timestamp: new Date().toISOString(),
    });
  }

  return listing;
}

export function withdrawListing(shipmentId: string): NetworkListing | null {
  const listing = getListingByShipment(shipmentId);
  if (!listing) return null;
  if (["assigned", "withdrawn", "expired"].includes(listing.state)) return null;

  listing.state = "withdrawn";
  for (const o of offers().filter((x) => x.listingId === listing.id && x.status === "open")) {
    o.status = "withdrawn";
  }
  logActivity({
    shipmentId,
    type: "network.listing.withdrawn",
    message: `Withdrew TranZfort listing ${listing.id}`,
    timestamp: new Date().toISOString(),
  });
  return listing;
}

export function acceptOffer(
  offerId: string,
): { listing: NetworkListing; offer: NetworkOffer } | { error: string } {
  const offer = offers().find((o) => o.id === offerId);
  if (!offer || offer.status !== "open") return { error: "Offer not available." };

  const listing = listings().find((l) => l.id === offer.listingId);
  if (!listing || ["withdrawn", "expired", "assigned"].includes(listing.state)) {
    return { error: "Listing is not open for accepts." };
  }

  const slotIndex = listing.trucksFilled;
  offer.status = "accepted";
  offer.slotIndex = slotIndex;
  listing.trucksFilled += 1;
  listing.tranzfortTripIds.push(`tz-${Date.now().toString(36)}`);

  if (listing.trucksFilled >= listing.trucksNeeded) {
    listing.state = "assigned";
    for (const o of offers().filter(
      (x) => x.listingId === listing.id && x.status === "open",
    )) {
      o.status = "rejected";
    }
  } else {
    listing.state = "partially_assigned";
  }

  logActivity({
    shipmentId: listing.shipmentId,
    type: "network.offer.accepted",
    message: `Accepted ${offer.partnerName} · ${offer.truckLabel} (slot ${slotIndex + 1}/${listing.trucksNeeded})`,
    timestamp: new Date().toISOString(),
  });

  return { listing, offer };
}

export function rejectOffer(offerId: string): NetworkOffer | null {
  const offer = offers().find((o) => o.id === offerId);
  if (!offer || offer.status !== "open") return null;
  offer.status = "rejected";
  logActivity({
    shipmentId: offer.shipmentId,
    type: "network.offer.rejected",
    message: `Rejected ${offer.partnerName}`,
    timestamp: new Date().toISOString(),
  });
  return offer;
}
