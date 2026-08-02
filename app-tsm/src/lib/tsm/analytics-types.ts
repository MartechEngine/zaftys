/** Marketplace analytics — TZ supplier dashboard read-through. */

export type MarketplaceAnalyticsKpis = {
  activeLoads: number;
  pendingBookings: number;
  activeTrips: number;
  inTransitTrips: number;
  completedTrips: number;
  loadsPostedToday: number;
};

export type MarketplaceLoadFunnelRow = {
  loadId: string;
  originLabel: string;
  destinationLabel: string;
  material: string;
  status: string;
  trucksNeeded: number;
  trucksBooked: number;
  impressions: number;
  detailViews: number;
  publishedAt: string | null;
};

export type MarketplaceAnalyticsResult = {
  kpis: MarketplaceAnalyticsKpis;
  topLoads: MarketplaceLoadFunnelRow[];
  source: "live" | "mock";
  honesty: string;
  linked: boolean;
  supplierIdMasked: string | null;
};
