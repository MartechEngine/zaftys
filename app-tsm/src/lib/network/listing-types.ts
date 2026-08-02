/** Outbound TranZfort listing — separate from ShipmentStatus (ADR-006 / Load Exchange). */

import type { TsmPostDraft } from "@/lib/tsm/post-draft";

export type NetworkListingState =
  | "not_posted"
  | "draft"
  | "posted"
  | "offers_received"
  | "partially_assigned"
  | "assigned"
  | "withdrawn"
  | "expired";

export type NetworkPriceType = "fixed" | "per_ton";

export type NetworkVisibility = "verified_open" | "invite_only";

export type NetworkOffer = {
  id: string;
  listingId: string;
  shipmentId: string;
  partnerName: string;
  rating: number;
  verified: boolean;
  bodyType: string;
  tyres: number;
  truckLabel: string;
  rateInr?: number;
  submittedAt: string;
  status: "open" | "accepted" | "rejected" | "withdrawn";
  slotIndex?: number;
  rejectReason?: string;
};

/** Lightweight mirror stored on ShipmentRecord for board/KPI reads. */
export type NetworkListingMirror = {
  id: string;
  state: NetworkListingState;
  trucksNeeded: number;
  trucksFilled: number;
  rateInr: number;
  postedAt?: string;
};

export type NetworkListing = {
  id: string;
  shipmentId: string;
  state: NetworkListingState;
  trucksNeeded: number;
  trucksFilled: number;
  priceType: NetworkPriceType;
  rateInr: number;
  advancePercent: number;
  visibility: NetworkVisibility;
  bodyType?: string;
  tyres?: number;
  pickupWindowStart?: string;
  pickupWindowEnd?: string;
  plantNotes?: string;
  postedAt?: string;
  expiresAt?: string;
  tranzfortTripIds: string[];
  /** Full create_load-shaped draft for reopen / live publish. */
  draftSnapshot?: TsmPostDraft;
  /** Live TranZfort load id when published via bridge. */
  tranzfortLoadId?: string;
  liveOnTranzfort?: boolean;
  superLoad?: boolean;
};

export type PostListingInput = {
  shipmentId: string;
  trucksNeeded: number;
  priceType: NetworkPriceType;
  rateInr: number;
  advancePercent: number;
  bodyType?: string;
  tyres?: number;
  pickupWindowStart?: string;
  pickupWindowEnd?: string;
  plantNotes?: string;
  publish?: boolean;
  listingTtlHours?: number;
  draftSnapshot?: TsmPostDraft;
  tranzfortLoadId?: string;
  liveOnTranzfort?: boolean;
  superLoad?: boolean;
};

export type UpdateListingInput = {
  trucksNeeded?: number;
  rateInr?: number;
  bodyType?: string;
  tyres?: number;
  pickupWindowStart?: string;
  pickupWindowEnd?: string;
  plantNotes?: string;
  publish?: boolean;
  expiresAt?: string;
  draftSnapshot?: TsmPostDraft;
  tranzfortLoadId?: string;
  liveOnTranzfort?: boolean;
  superLoad?: boolean;
  advancePercent?: number;
  priceType?: NetworkPriceType;
};

export const LISTING_STATE_LABEL: Record<NetworkListingState, string> = {
  not_posted: "Not posted",
  draft: "Draft",
  posted: "Posted",
  offers_received: "Offers received",
  partially_assigned: "Partially assigned",
  assigned: "Assigned",
  withdrawn: "Withdrawn",
  expired: "Expired",
};
