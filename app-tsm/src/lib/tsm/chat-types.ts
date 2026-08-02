/** Marketplace chat inbox — read-only conversation summaries. */

export type MarketplaceChatRow = {
  id: string;
  truckerName: string;
  routeLabel: string;
  material: string | null;
  loadId: string | null;
  tripId: string | null;
  latestMessageText: string | null;
  lastMessageAt: string | null;
  isArchived: boolean;
};

export type MarketplaceChatListResult = {
  items: MarketplaceChatRow[];
  total: number;
  source: "live" | "mock";
  honesty: string;
  linked: boolean;
  supplierIdMasked: string | null;
};
