/** Supplier My Loads row (TZ read-through shape). */

export type SupplierLoadStatus =
  | "active"
  | "expired"
  | "cancelled"
  | "completed"
  | "draft"
  | string;

export type SupplierLoadTab = "active" | "expired" | "cancelled" | "completed" | "all";

export type SupplierLoadRow = {
  id: string;
  originLabel: string;
  destinationLabel: string;
  material: string;
  materialCode?: string | null;
  weightTonnes?: number | null;
  trucksNeeded: number;
  trucksBooked: number;
  priceAmount: number;
  priceType: "fixed" | "per_ton" | string;
  pickupDate?: string | null;
  status: SupplierLoadStatus;
  isSuperLoad: boolean;
  superStatus?: string | null;
  publishedAt?: string | null;
  listingDuration?: string | null;
  isOnMarketplace?: boolean;
  /** TZ has no `expired` status — listings expire via `marketplace_visible_until`. */
  marketplaceVisibleUntil?: string | null;
  isExpired?: boolean;
  /** True when this load id was posted from TSM (audit / listing mirror). */
  postedFromTsm?: boolean;
  sourceShipmentId?: string | null;
};

export type SupplierLoadsListResult = {
  items: SupplierLoadRow[];
  source: "live" | "mock";
  linked: boolean;
  supplierIdMasked: string | null;
  honesty: string;
  /** Total matching rows in TZ, not just this page. */
  total: number;
  limit?: number;
  offset?: number;
};
