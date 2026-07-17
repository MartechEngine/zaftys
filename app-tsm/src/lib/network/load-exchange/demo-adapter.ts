import {
  acceptOffer,
  createListing,
  getOutboundListingStats,
  listOffersForListing,
  listOutboundListings,
  rejectOffer,
  updateListing,
  withdrawListing,
} from "@/lib/network/listing-store";
import type {
  LoadExchangeClient,
  LoadExchangeCommandResult,
  LoadExchangeEvent,
  ListingCommandData,
  ListingCreateCommand,
  ListingUpdateCommand,
  ListingWithdrawCommand,
  OfferAcceptCommand,
  OfferAcceptData,
  OfferCommandData,
  OfferRejectCommand,
  OutboundExchangeHealth,
} from "@/lib/network/load-exchange/types";

function publishedEvent(listing: { id: string; shipmentId: string; postedAt?: string }): LoadExchangeEvent | null {
  if (!listing.postedAt) return null;
  return {
    type: "listing.published",
    listingId: listing.id,
    shipmentId: listing.shipmentId,
    postedAt: listing.postedAt,
  };
}

function offerCreatedEvents(listingId: string, shipmentId: string, beforeCount: number): LoadExchangeEvent[] {
  const offers = listOffersForListing(listingId);
  return offers.slice(0, Math.max(0, offers.length - beforeCount)).map((o) => ({
    type: "offer.created" as const,
    offerId: o.id,
    listingId,
    shipmentId,
  }));
}

/** Phase 1 demo adapter — in-memory listing store stands in for TranZfort marketplace. */
export function createDemoLoadExchangeAdapter(): LoadExchangeClient {
  return {
    async listingCreate(cmd: ListingCreateCommand): Promise<LoadExchangeCommandResult<ListingCommandData>> {
      const result = createListing(cmd);
      if ("error" in result) return { ok: false, error: result.error };

      const events: LoadExchangeEvent[] = [];
      const published = publishedEvent(result);
      if (published) events.push(published);
      if (result.state === "offers_received") {
        events.push(...offerCreatedEvents(result.id, result.shipmentId, 0));
      }
      return { ok: true, data: { listing: result }, events };
    },

    async listingUpdate(cmd: ListingUpdateCommand): Promise<LoadExchangeCommandResult<ListingCommandData>> {
      const beforeOffers = listOffersForListing(
        listOutboundListings().find((l) => l.shipmentId === cmd.shipmentId)?.id ?? "",
      ).length;

      const result = updateListing(cmd.shipmentId, cmd.patch);
      if ("error" in result) return { ok: false, error: result.error };

      const events: LoadExchangeEvent[] = [];
      if (cmd.patch.publish === true && result.postedAt) {
        const published = publishedEvent(result);
        if (published) events.push(published);
      }
      if (result.state === "offers_received") {
        events.push(...offerCreatedEvents(result.id, result.shipmentId, beforeOffers));
      }
      return { ok: true, data: { listing: result }, events };
    },

    async listingWithdraw(cmd: ListingWithdrawCommand): Promise<LoadExchangeCommandResult<ListingCommandData>> {
      const listing = withdrawListing(cmd.shipmentId);
      if (!listing) return { ok: false, error: "No active listing to withdraw." };
      return { ok: true, data: { listing }, events: [] };
    },

    async offerAccept(cmd: OfferAcceptCommand): Promise<LoadExchangeCommandResult<OfferAcceptData>> {
      const result = acceptOffer(cmd.offerId);
      if ("error" in result) return { ok: false, error: result.error };

      const { listing, offer } = result;
      const events: LoadExchangeEvent[] = [
        {
          type: "slot.assigned",
          offerId: offer.id,
          listingId: listing.id,
          slotIndex: offer.slotIndex ?? listing.trucksFilled - 1,
        },
      ];
      return { ok: true, data: { listing, offer }, events };
    },

    async offerReject(cmd: OfferRejectCommand): Promise<LoadExchangeCommandResult<OfferCommandData>> {
      const offer = rejectOffer(cmd.offerId, cmd.reason);
      if (!offer) return { ok: false, error: "Offer not available." };
      return { ok: true, data: { offer }, events: [] };
    },

    getOutboundHealth(): OutboundExchangeHealth {
      const stats = getOutboundListingStats();
      const rows = listOutboundListings();
      const lastListingPostedAt =
        rows
          .map((l) => l.postedAt)
          .filter(Boolean)
          .sort((a, b) => (b ?? "").localeCompare(a ?? ""))[0] ?? null;

      return {
        adapter: "demo",
        configured: false,
        lastListingPostedAt,
        openListingsCount: stats.openPosts,
        openOffersCount: stats.offersWaiting,
        draftListingsCount: stats.drafts,
      };
    },
  };
}
