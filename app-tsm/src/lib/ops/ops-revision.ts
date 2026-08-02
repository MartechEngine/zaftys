import {
  getExceptions,
  listActivities,
  fetchShipmentsForEnrichment,
} from "@/lib/data/shipment-repository";

/**
 * Lightweight ops revision fingerprint for SSE clients.
 * When this changes, dispatch / Command Center should reload.
 * Uses enrichment fetch (soft-fail) so SSE polling never hammers Fleetbase rate limits.
 */
export async function computeOpsRevision(): Promise<{
  revision: string;
  shipmentCount: number;
  exceptionCount: number;
  activityCount: number;
  at: string;
}> {
  const [shipments, exceptions] = await Promise.all([
    fetchShipmentsForEnrichment(),
    getExceptions(),
  ]);
  const activities = listActivities(20);

  const shipmentSig = shipments
    .map((s) => `${s.id}:${s.status}:${s.driver ?? ""}:${s.updatedAt}`)
    .sort()
    .join("|");
  const exceptionSig = exceptions.map((e) => e.id).sort().join("|");
  const activitySig = activities.map((a) => a.id).join("|");

  const raw = `${shipmentSig}#${exceptionSig}#${activitySig}`;
  // FNV-1a 32-bit for a short stable revision token
  let hash = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const revision = (hash >>> 0).toString(16).padStart(8, "0");

  return {
    revision,
    shipmentCount: shipments.length,
    exceptionCount: exceptions.length,
    activityCount: activities.length,
    at: new Date().toISOString(),
  };
}
