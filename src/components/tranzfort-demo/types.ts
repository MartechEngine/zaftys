export type DemoRole = "trucker" | "supplier" | "assistant";

export type MarketplaceLoad = {
  id: string;
  origin: string;
  originState?: string;
  destination: string;
  destinationState?: string;
  material: string;
  weightTonnes: number;
  priceInr: number;
  pickupDate: string;
  matchScore?: number;
  supplierName: string;
  supplierInitial?: string;
  listingAge?: string;
  bodyType?: string;
  tyres?: number;
  advancePercent?: number;
  distanceKm?: number;
  isSuperLoad?: boolean;
  dieselEstimateInr?: number;
  netProfitInr?: number;
  priceType?: "fixed" | "per_ton";
  trucksNeeded?: number;
  trucksBooked?: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  rich?: AssistantRichReply;
};

export type RouteCardReply = {
  kind: "route";
  origin: string;
  destination: string;
  km: number;
  eta: string;
  via: string;
  fuelStops: number;
};

export type LoadCardReply = {
  kind: "loads";
  count: number;
  material: string;
  priceInr: number;
  route: string;
  pickupDate: string;
};

export type LrCardReply = {
  kind: "lr";
  consignor: string;
  consignee: string;
  weight: string;
  gst: string;
};

export type AssistantRichReply = RouteCardReply | LoadCardReply | LrCardReply;

export type QueuedAction = {
  id: string;
  label: string;
  status: "pending" | "syncing" | "synced";
};
