import { createDemoLoadExchangeAdapter } from "@/lib/network/load-exchange/demo-adapter";
import type { LoadExchangeClient, OutboundExchangeHealth } from "@/lib/network/load-exchange/types";
import { isTranZfortConfigured } from "@/lib/sync/tranzfort-client";

let client: LoadExchangeClient | null = null;

/**
 * Returns the active Load Exchange adapter.
 * Phase 1: always demo (in-memory store). When TranZfort is configured, swap in a
 * Supabase service-role adapter that implements the same command/event contract (§6.4).
 */
export function getLoadExchangeClient(): LoadExchangeClient {
  if (!client) {
    // Future: if (isTranZfortConfigured()) client = createSupabaseLoadExchangeAdapter();
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
  };
}
