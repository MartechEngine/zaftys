import type {
  NetworkListing,
  NetworkOffer,
  PostListingInput,
  UpdateListingInput,
} from "@/lib/network/listing-types";

/** Load Exchange commands (TSM → TranZfort) — §6.1 */
export type ListingCreateCommand = PostListingInput;

export type ListingUpdateCommand = {
  shipmentId: string;
  patch: UpdateListingInput;
};

export type ListingWithdrawCommand = {
  shipmentId: string;
};

export type OfferAcceptCommand = {
  offerId: string;
  slotIndex?: number;
};

export type OfferRejectCommand = {
  offerId: string;
  reason?: string;
};

/** Load Exchange events (TranZfort → TSM) — §6.2 */
export type LoadExchangeEvent =
  | { type: "listing.published"; listingId: string; shipmentId: string; postedAt: string }
  | { type: "offer.created"; offerId: string; listingId: string; shipmentId: string }
  | { type: "offer.withdrawn"; offerId: string; listingId: string }
  | { type: "slot.assigned"; offerId: string; listingId: string; slotIndex: number }
  | { type: "trip.status_changed"; tripId: string; status: string }
  | { type: "trip.epod_uploaded"; tripId: string }
  | { type: "listing.expired"; listingId: string; shipmentId: string };

export type LoadExchangeCommandResult<T> =
  | { ok: true; data: T; events: LoadExchangeEvent[] }
  | { ok: false; error: string };

export type ListingCommandData = { listing: NetworkListing };
export type OfferCommandData = { offer: NetworkOffer };
export type OfferAcceptData = { listing: NetworkListing; offer: NetworkOffer };

export type OutboundExchangeHealth = {
  adapter: "demo" | "supabase";
  configured: boolean;
  lastListingPostedAt: string | null;
  openListingsCount: number;
  openOffersCount: number;
  draftListingsCount: number;
};

/** TranZfortClient / Load Exchange boundary — §6.4 */
export interface LoadExchangeClient {
  listingCreate(cmd: ListingCreateCommand): Promise<LoadExchangeCommandResult<ListingCommandData>>;
  listingUpdate(cmd: ListingUpdateCommand): Promise<LoadExchangeCommandResult<ListingCommandData>>;
  listingWithdraw(cmd: ListingWithdrawCommand): Promise<LoadExchangeCommandResult<ListingCommandData>>;
  offerAccept(cmd: OfferAcceptCommand): Promise<LoadExchangeCommandResult<OfferAcceptData>>;
  offerReject(cmd: OfferRejectCommand): Promise<LoadExchangeCommandResult<OfferCommandData>>;
  getOutboundHealth(): OutboundExchangeHealth;
}
