import { getFleetbaseClient } from "@/lib/fleetbase/client";
import {
  fetchTranZfortTrips,
  isTranZfortConfigured,
  type SyncRunResult,
  type TranZfortTrip,
} from "@/lib/sync/tranzfort-client";
import { recordSyncRun } from "@/lib/sync/sync-state";

function tripToFleetbasePayload(trip: TranZfortTrip) {
  return {
    meta: {
      tranzfort_id: trip.id,
      lr_number: trip.lr_number,
      commodity: trip.commodity ?? "general",
      tonnage: trip.weight,
      origin: trip.origin,
      destination: trip.destination,
      origin_type: "network",
    },
    pickup: { name: trip.origin ?? "Pickup" },
    dropoff: { name: trip.destination ?? "Dropoff" },
  };
}

/** Shadow sync: TranZfort trips → Fleetbase orders (idempotent via meta.tranzfort_id). */
export async function runTranZfortSync(): Promise<SyncRunResult> {
  const result: SyncRunResult = { scanned: 0, created: 0, skipped: 0, errors: [] };

  if (!isTranZfortConfigured()) {
    result.errors.push("TRANZFORT_SUPABASE_URL / TRANZFORT_SERVICE_KEY not configured");
    recordSyncRun({ ...result, success: false, source: "none" });
    return result;
  }

  const client = getFleetbaseClient();
  if (!client.isConfigured) {
    result.errors.push("FLEETBASE_API_KEY not configured");
    recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  let trips: TranZfortTrip[] = [];
  try {
    trips = await fetchTranZfortTrips(50);
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "TranZfort fetch failed");
    recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  result.scanned = trips.length;

  const existingTranzfortIds = new Set<string>();
  try {
    const orders = await client.listOrders(100);
    for (const o of orders) {
      const tzId = o.meta?.tranzfort_id;
      if (typeof tzId === "string") existingTranzfortIds.add(tzId);
    }
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "Fleetbase list orders failed");
    recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  for (const trip of trips) {
    if (existingTranzfortIds.has(trip.id)) {
      result.skipped++;
      continue;
    }
    try {
      await client.createOrder(tripToFleetbasePayload(trip));
      result.created++;
      existingTranzfortIds.add(trip.id);
    } catch (e) {
      result.errors.push(
        `Trip ${trip.id}: ${e instanceof Error ? e.message : "create failed"}`,
      );
    }
  }

  recordSyncRun({
    scanned: result.scanned,
    created: result.created,
    skipped: result.skipped,
    errors: result.errors,
    success: result.errors.length === 0,
    source: "tranzfort",
  });

  return result;
}
