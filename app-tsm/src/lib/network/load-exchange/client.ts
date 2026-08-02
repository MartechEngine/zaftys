import { allowDemoSeeds } from "@/lib/data/demo-mode";
import { createDemoLoadExchangeAdapter } from "@/lib/network/load-exchange/demo-adapter";
import type { LoadExchangeClient, OutboundExchangeHealth } from "@/lib/network/load-exchange/types";
import { isTranZfortConfigured } from "@/lib/sync/tranzfort-client";

let client: LoadExchangeClient | null = null;

/**
 * Returns the active Load Exchange adapter for **local TSM listing persistence**.
 *
 * Live marketplace writes go through `/api/tsm/tranzfort/publish` (bridge RPC).
 * This adapter keeps NetworkListing drafts/mirrors in the portal store.
 * Demo offer seeding remains gated by `allowDemoSeeds()` inside createListing.
 */
export function getLoadExchangeClient(): LoadExchangeClient {
  if (!client) {
    client = createDemoLoadExchangeAdapter();
  }
  return client;
}

/** Outbound Load Exchange health for sync desk and monitoring. */
export function getOutboundExchangeHealth(): OutboundExchangeHealth {
  const health = getLoadExchangeClient().getOutboundHealth();
  return {
    ...health,
    configured: isTranZfortConfigured(),
    adapter: allowDemoSeeds() ? "demo" : health.adapter,
  };
}
