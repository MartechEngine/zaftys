/**
 * Marketplace booking inbox — TZ booking_requests for the linked supplier.
 */

export type BookingInboxTab = "pending" | "decided" | "all";

export type BookingInboxStatus =
  | "submitted"
  | "approved"
  | "rejected"
  | "cancelled"
  | "withdrawn"
  | "superseded"
  | "expired";

export type BookingInboxRow = {
  id: string;
  loadId: string;
  status: BookingInboxStatus;
  createdAt: string;
  decidedAt: string | null;
  decisionReason: string | null;
  truckerId: string | null;
  truckerName: string;
  truckerVerification: string | null;
  truckerRating: number | null;
  truckId: string | null;
  truckNumber: string | null;
  truckBodyType: string | null;
  truckTyres: number | null;
  originLabel: string;
  destinationLabel: string;
  material: string;
  isSuperLoad: boolean;
  trucksNeeded: number;
  trucksBooked: number;
  postedFromTsm: boolean;
  tripId: string | null;
};

export type BookingInboxListResult = {
  items: BookingInboxRow[];
  source: "live" | "mock";
  linked: boolean;
  supplierIdMasked: string | null;
  honesty: string;
  total: number;
  limit?: number;
  offset?: number;
  /** Live approve/reject needs TZ service_* booking RPCs applied. */
  actionsAvailable: boolean;
};

export type BookingActionResult = {
  ok: boolean;
  bookingId: string;
  status: BookingInboxStatus;
  tripId?: string | null;
  source: "live" | "mock";
  message?: string;
};
