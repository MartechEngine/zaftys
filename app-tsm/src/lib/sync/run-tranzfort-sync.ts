import {
  fetchTranZfortTrips,
  isTranZfortConfigured,
  type SyncRunResult,
  type TranZfortTrip,
} from "@/lib/sync/tranzfort-client";
import { recordSyncRun } from "@/lib/sync/sync-state";
import {
  getExecutionBackend,
  getExecutionStore,
  isLiveExecutionMode,
} from "@/lib/execution";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";

function tripToCreateInput(trip: TranZfortTrip): CreateShipmentInput {
  return {
    client: "TranZfort network",
    origin: trip.origin ?? "Pickup",
    destination: trip.destination ?? "Dropoff",
    commodity: trip.commodity ?? "general",
    tonnageMt: Number(trip.weight) > 0 ? Number(trip.weight) : 1,
    lrNumber: trip.lr_number ?? undefined,
    originType: "network",
  };
}

/**
 * Shadow sync: TranZfort trips → TSM execution shipments (Postgres default / Fleetbase escape).
 * Idempotent via shipment.tranzfortId / tranzfortTripIds.
 */
export async function runTranZfortSync(): Promise<SyncRunResult> {
  const result: SyncRunResult = { scanned: 0, created: 0, skipped: 0, errors: [] };

  if (!isTranZfortConfigured()) {
    result.errors.push("TRANZFORT_SUPABASE_URL / TRANZFORT_SERVICE_KEY not configured");
    await recordSyncRun({ ...result, success: false, source: "none" });
    return result;
  }

  if (!isLiveExecutionMode()) {
    result.errors.push("Execution backend is demo/dev-store — sync skipped");
    await recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  let trips: TranZfortTrip[] = [];
  try {
    trips = await fetchTranZfortTrips(50);
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "TranZfort fetch failed");
    await recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  result.scanned = trips.length;

  const backend = getExecutionBackend();
  let store;
  try {
    store = getExecutionStore(
      backend === "postgres"
        ? { orgId: process.env.TSM_EXECUTION_ORG_ID ?? undefined }
        : undefined,
    );
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "ExecutionStore unavailable");
    await recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  const existingTranzfortIds = new Set<string>();
  try {
    const shipments = await store.listShipments(200);
    for (const s of shipments) {
      if (s.tranzfortId) existingTranzfortIds.add(s.tranzfortId);
      for (const tid of s.tranzfortTripIds ?? []) existingTranzfortIds.add(tid);
    }
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "listShipments failed");
    await recordSyncRun({ ...result, success: false, source: "tranzfort" });
    return result;
  }

  for (const trip of trips) {
    if (existingTranzfortIds.has(trip.id)) {
      result.skipped++;
      continue;
    }
    try {
      const created = await store.createShipment(tripToCreateInput(trip));
      await store.updateShipmentPatch(created.id, {
        meta: {
          tranzfort_id: trip.id,
          lr_number: trip.lr_number,
          origin_type: "network",
          commodity: trip.commodity ?? "general",
          tonnage: trip.weight,
        },
      });
      result.created++;
      existingTranzfortIds.add(trip.id);
    } catch (e) {
      result.errors.push(
        `Trip ${trip.id}: ${e instanceof Error ? e.message : "create failed"}`,
      );
    }
  }

  await recordSyncRun({
    scanned: result.scanned,
    created: result.created,
    skipped: result.skipped,
    errors: result.errors,
    success: result.errors.length === 0,
    source: "tranzfort",
  });

  return result;
}
