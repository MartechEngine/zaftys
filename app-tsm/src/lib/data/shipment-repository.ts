import {
  assignShipment as devAssign,
  createShipment as devCreateShipment,
  generateTrackLink as devTrackLink,
  addShipmentDocument as devAddDocument,
  getShipment as devGetShipment,
  getShipmentByToken as devGetByToken,
  listActivities as devActivities,
  listActivitiesForShipment as devActivitiesForShipment,
  listShipmentNotes as devListShipmentNotes,
  addShipmentNote as devAddShipmentNote,
  listDrivers as devListDrivers,
  listShipments as devListShipments,
  listVehicles as devListVehicles,
  syncStatus as devSyncStatus,
  tickActiveGeo as devTickGeo,
  updateShipmentStatus as devUpdateStatus,
  updateShipmentFields as devUpdateFields,
  logActivity,
} from "@/lib/dev-store";
import type { ShipmentFieldsPatch } from "@/lib/dev-store";
import { allowDemoSeeds } from "@/lib/data/demo-mode";
import { getSyncState } from "@/lib/sync/sync-state";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { buildFleetbaseCreatePayload, mapFleetbaseOrder, mapFleetbaseDriver, mapFleetbaseVehicle, toFleetbaseStatus } from "@/lib/fleetbase/mapper";
import { geoForShipment, isValidGps } from "@/lib/geo";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import {
  validateStatusTransition,
} from "@/lib/shipments/update-shipment";
import type { ShipmentStatus } from "@/lib/constants";
import {
  computeExceptionsFromShipments,
  computeKpisFromShipments,
} from "@/lib/shipments/kpis";
import {
  filterShipmentsByQuery,
  filterShipmentsByTab,
  filterShipmentsAdvanced,
  shipmentFilterOptions,
  shipmentTabCounts,
  sortShipments,
} from "@/lib/shipments/filters";
import {
  filterDocumentLibrary,
  flattenShipmentDocuments,
  type DocumentLibraryEntry,
} from "@/lib/documents/library";
import { pushTranZfortStatus, isTranZfortConfigured } from "@/lib/sync/tranzfort-client";
import type { ShipmentRecord } from "@/lib/dev-store";

function withGeo(record: ShipmentRecord): ShipmentRecord {
  const live = getActiveDataSource() === "fleetbase";
  const current = record.geo?.current;

  if (live) {
    // Keep real GPS only; never invent a moving pin from city corridors.
    if (current && isValidGps(current.lat, current.lng)) return record;

    const synthetic = geoForShipment({
      id: record.id,
      origin: record.origin,
      destination: record.destination,
      status: record.status,
      updatedAt: record.updatedAt,
    });
    if (!synthetic) {
      if (!record.geo) return record;
      return {
        ...record,
        geo: {
          origin: record.geo.origin,
          destination: record.geo.destination,
          gpsStale: true,
        },
      };
    }
    return {
      ...record,
      geo: {
        origin: synthetic.origin,
        destination: synthetic.destination,
        gpsStale: true,
      },
    };
  }

  const synthetic = geoForShipment({
    id: record.id,
    origin: record.origin,
    destination: record.destination,
    status: record.status,
    updatedAt: record.updatedAt,
  });
  return { ...record, geo: synthetic };
}

async function applyFleetbasePositions(
  shipments: ShipmentRecord[],
): Promise<ShipmentRecord[]> {
  if (getActiveDataSource() !== "fleetbase" || shipments.length === 0) {
    return shipments;
  }
  try {
    const positions = await getFleetbaseClient().listPositions(100);
    if (!positions.length) return shipments;
    const byOrder = new Map(
      positions
        .filter(
          (p) =>
            p.orderId &&
            p.latitude != null &&
            p.longitude != null &&
            isValidGps(p.latitude, p.longitude),
        )
        .map((p) => [p.orderId!, p]),
    );
    if (byOrder.size === 0) return shipments;

    return shipments.map((s) => {
      const pos = byOrder.get(s.id);
      if (!pos?.latitude || !pos?.longitude || !isValidGps(pos.latitude, pos.longitude)) {
        return s;
      }
      const fallback = geoForShipment({
        id: s.id,
        origin: s.origin,
        destination: s.destination,
        status: s.status,
        updatedAt: s.updatedAt,
      });
      const origin = s.geo?.origin ?? fallback?.origin ?? {
        lat: pos.latitude,
        lng: pos.longitude,
      };
      const destination = s.geo?.destination ?? fallback?.destination ?? {
        lat: pos.latitude,
        lng: pos.longitude,
      };
      return {
        ...s,
        geo: {
          origin,
          destination,
          current: { lat: pos.latitude, lng: pos.longitude },
          gpsUpdatedAt: new Date().toISOString(),
          gpsStale: false,
        },
      };
    });
  } catch {
    return shipments;
  }
}

function recordShipmentActivity(shipmentId: string, type: string, message: string) {
  logActivity({
    shipmentId,
    type,
    message,
    timestamp: new Date().toISOString(),
  });
  void import("@/lib/ops/ops-bus").then(({ publishOpsChange }) => publishOpsChange());
}

export type DataSource = "fleetbase" | "dev-store";

export function getActiveDataSource(): DataSource {
  // Live-first: Fleetbase unless demo UI is explicitly enabled (TSM_DEMO_UI=1).
  if (process.env.TSM_DEMO_UI === "1") return "dev-store";
  return "fleetbase";
}

/** True when ops must use Fleetbase only — no silent demo fallback. */
export function isLiveFleetbaseMode(): boolean {
  return getActiveDataSource() === "fleetbase";
}

function liveFail(context: string, e: unknown): never {
  const msg = e instanceof Error ? e.message : String(e);
  console.error(`[${context}] Fleetbase live mode failed (no demo fallback):`, e);
  throw new Error(`Fleetbase unavailable (${context}): ${msg}`);
}

export async function fetchAllShipmentsRaw(): Promise<ShipmentRecord[]> {
  const { ensurePositionsHydrated, applyLiveGeo } = await import(
    "@/lib/map/live-positions"
  );
  await ensurePositionsHydrated();

  if (isLiveFleetbaseMode()) {
    try {
      const client = getFleetbaseClient();
      const orders = await client.listOrders(100);
      const mapped = orders.map(mapFleetbaseOrder).map(withGeo);
      return applyLiveGeo(await applyFleetbasePositions(mapped));
    } catch (e) {
      liveFail("listShipments", e);
    }
  }
  return applyLiveGeo(devListShipments());
}

export async function listShipments(filters?: {
  tab?: string;
  status?: string;
  q?: string;
  client?: string;
  origin?: string;
  destination?: string;
  source?: string;
}) {
  let result = await fetchAllShipmentsRaw();

  result = filterShipmentsByTab(result, filters?.tab);
  if (filters?.status) {
    result = result.filter((s) => s.status === filters.status);
  }
  result = filterShipmentsAdvanced(result, {
    client: filters?.client,
    origin: filters?.origin,
    destination: filters?.destination,
    source: filters?.source,
  });
  result = filterShipmentsByQuery(result, filters?.q);

  return result;
}

/** Domain modules: enrich from shipments without failing when Fleetbase is down. */
export async function fetchShipmentsForEnrichment(): Promise<ShipmentRecord[]> {
  try {
    return await fetchAllShipmentsRaw();
  } catch (e) {
    console.warn(
      "[enrichment] shipments unavailable:",
      e instanceof Error ? e.message : e,
    );
    return [];
  }
}

export async function getShipmentFilterOptions() {
  const all = await fetchAllShipmentsRaw();
  return shipmentFilterOptions(all);
}

export async function getShipmentTabCounts(q?: string) {
  let all = await fetchAllShipmentsRaw();
  all = filterShipmentsByQuery(all, q);
  return shipmentTabCounts(all);
}

export async function getShipment(id: string) {
  if (isLiveFleetbaseMode()) {
    try {
      const order = await getFleetbaseClient().getOrder(id);
      const [withPos] = await applyFleetbasePositions([
        withGeo(mapFleetbaseOrder(order)),
      ]);
      return withPos;
    } catch (e) {
      // Not found vs API down: only fail loud on transport/auth errors if order missing locally
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) return undefined;
      liveFail("getShipment", e);
    }
  }
  return devGetShipment(id);
}

export async function getShipmentByToken(token: string) {
  // Live honesty: try Fleetbase first; only use demo/dev tokens in demo UI.
  if (isLiveFleetbaseMode() || !allowDemoSeeds()) {
    try {
      const order = await getFleetbaseClient().getOrder(token);
      return withGeo(mapFleetbaseOrder(order));
    } catch {
      return undefined;
    }
  }
  return devGetByToken(token);
}

export async function assignShipment(id: string, driverId: string, vehicleId: string) {
  if (isLiveFleetbaseMode()) {
    try {
      const order = await getFleetbaseClient().assignOrder(id, driverId, vehicleId);
      const mapped = withGeo(mapFleetbaseOrder(order));
      recordShipmentActivity(
        mapped.id,
        "shipment.assigned",
        `${mapped.publicId} assigned via Fleetbase · ${mapped.driver ?? "driver"} · ${mapped.vehicle ?? "vehicle"}`,
      );
      return mapped;
    } catch (e) {
      liveFail("assignShipment", e);
    }
  }
  return devAssign(id, driverId, vehicleId);
}

export async function createShipment(input: CreateShipmentInput): Promise<ShipmentRecord | null> {
  if (isLiveFleetbaseMode()) {
    try {
      const client = getFleetbaseClient();
      let order = await client.createOrder(buildFleetbaseCreatePayload(input));

      if (input.driverId && input.vehicleId) {
        try {
          order = await client.assignOrder(order.id, input.driverId, input.vehicleId);
        } catch (e) {
          console.warn("[createShipment] Fleetbase assign failed; order created unassigned:", e);
        }
      }

      const mapped = withGeo(mapFleetbaseOrder(order));
      recordShipmentActivity(
        mapped.id,
        "shipment.created",
        `${mapped.publicId} created via Fleetbase · ${mapped.origin} → ${mapped.destination}`,
      );
      return mapped;
    } catch (e) {
      liveFail("createShipment", e);
    }
  }

  return devCreateShipment(input);
}

export async function updateShipmentStatus(id: string, status: ShipmentStatus) {
  const existing = await getShipment(id);
  if (!existing) return null;

  const err = validateStatusTransition(existing.status, status);
  if (err) throw new Error(err);

  let updated: ShipmentRecord | null;

  if (isLiveFleetbaseMode()) {
    try {
      const order = await getFleetbaseClient().updateOrderStatus(id, toFleetbaseStatus(status));
      updated = withGeo(mapFleetbaseOrder(order));
      recordShipmentActivity(
        updated.id,
        `shipment.${status}`,
        `${updated.publicId} · ${status.replace("_", " ")} (Fleetbase)`,
      );
    } catch (e) {
      liveFail("updateShipmentStatus", e);
    }
  } else {
    updated = devUpdateStatus(id, status);
  }

  const tripIds =
    (updated?.tranzfortTripIds?.length
      ? updated.tranzfortTripIds
      : existing.tranzfortTripIds?.length
        ? existing.tranzfortTripIds
        : null) ??
    (() => {
      const id = updated?.tranzfortId ?? existing.tranzfortId;
      return id ? [id] : [];
    })();

  if (updated && tripIds.length > 0 && isTranZfortConfigured()) {
    for (const tranzfortId of tripIds) {
      try {
        await pushTranZfortStatus(tranzfortId, status);
      } catch (e) {
        console.warn("[updateStatus] TranZfort push failed:", e);
      }
    }
  }

  if (updated) {
    void import("@/lib/ops/ops-bus").then(({ publishOpsChange }) => publishOpsChange());
  }

  return updated;
}

export async function updateShipmentFields(id: string, patch: ShipmentFieldsPatch) {
  const existing = await getShipment(id);
  if (!existing) return null;
  if (["delivered", "cancelled"].includes(existing.status)) {
    throw new Error(`Cannot edit a ${existing.status} shipment.`);
  }

  if (isLiveFleetbaseMode()) {
    try {
      const fbPatch: Record<string, unknown> = {};
      if (patch.client !== undefined || patch.commodity !== undefined || patch.tonnageMt !== undefined || patch.lrNumber !== undefined || patch.originType !== undefined) {
        fbPatch.meta = {
          ...(patch.client !== undefined ? { client: patch.client } : {}),
          ...(patch.commodity !== undefined ? { commodity: patch.commodity } : {}),
          ...(patch.tonnageMt !== undefined
            ? { tonnage: patch.tonnageMt, tonnage_mt: patch.tonnageMt }
            : {}),
          ...(patch.lrNumber !== undefined ? { lr_number: patch.lrNumber } : {}),
          ...(patch.originType !== undefined ? { origin_type: patch.originType } : {}),
        };
      }
      if (patch.origin !== undefined) {
        fbPatch.pickup = { name: patch.origin, city: patch.origin };
      }
      if (patch.destination !== undefined) {
        fbPatch.dropoff = { name: patch.destination, city: patch.destination };
      }
      if (patch.eta !== undefined) fbPatch.eta = patch.eta;
      if (patch.driver !== undefined || patch.driverId !== undefined) {
        if (patch.driverId) fbPatch.driver = patch.driverId;
      }
      if (patch.vehicle !== undefined || patch.vehicleId !== undefined) {
        if (patch.vehicleId) fbPatch.vehicle = patch.vehicleId;
      }
      if (Object.keys(fbPatch).length > 0) {
        const order = await getFleetbaseClient().updateOrder(id, fbPatch);
        const mapped = withGeo(mapFleetbaseOrder(order));
        // Local-only overlays (network listing mirror, etc.)
        if (patch.networkListing !== undefined) {
          return { ...mapped, networkListing: patch.networkListing };
        }
        return mapped;
      }
    } catch (e) {
      liveFail("updateShipmentFields", e);
    }
  }

  return devUpdateFields(id, patch);
}

export async function rescheduleShipment(
  id: string,
  patch: { eta?: string; scheduledAt?: string },
) {
  const existing = await getShipment(id);
  if (!existing) return null;
  if (["delivered", "cancelled"].includes(existing.status)) {
    throw new Error(`Cannot reschedule a ${existing.status} shipment.`);
  }

  const { patchShipmentSchedule } = await import("@/lib/mutations/sprint17-store");
  patchShipmentSchedule(id, patch);

  if (isLiveFleetbaseMode() && patch.eta) {
    try {
      const order = await getFleetbaseClient().updateOrder(id, {
        eta: patch.eta,
        meta: patch.scheduledAt ? { scheduled_at: patch.scheduledAt } : undefined,
      });
      return withGeo(mapFleetbaseOrder(order));
    } catch (e) {
      liveFail("rescheduleShipment", e);
    }
  }

  if (patch.eta) {
    const updated = await devUpdateFields(id, { eta: patch.eta });
    if (updated) return updated;
  }

  return { ...existing, eta: patch.eta ?? existing.eta };
}

export async function listAllDocuments(filters?: {
  q?: string;
  type?: string;
}): Promise<DocumentLibraryEntry[]> {
  const shipments = await listShipments();
  const entries = flattenShipmentDocuments(shipments);

  // Merge DB-backed docs (MinIO uploads) so library sees storageKey even if shipment seed lacks it
  try {
    const { isDatabaseConfigured } = await import("@/lib/db/client");
    if (isDatabaseConfigured()) {
      const { listAllDocumentsFromDb } = await import("@/lib/db/documents-repository");
      const fromDb = await listAllDocumentsFromDb();
      if (fromDb?.length) {
        const byId = new Map(entries.map((e) => [e.id, e]));
        for (const row of fromDb) {
          const shipment = shipments.find((s) => s.id === row.shipmentId);
          const existing = byId.get(row.id);
          if (existing) {
            byId.set(row.id, {
              ...existing,
              storageKey: row.storageKey ?? existing.storageKey,
              downloadable: Boolean(row.storageKey ?? existing.storageKey),
            });
          } else if (shipment) {
            byId.set(row.id, {
              id: row.id,
              name: row.name,
              type: row.type as DocumentLibraryEntry["type"],
              typeLabel: row.type.toUpperCase(),
              shipmentId: row.shipmentId,
              shipmentPublicId: shipment.publicId,
              client: shipment.client,
              uploadedAt: row.uploadedAt,
              uploadedLabel: row.uploadedAt.slice(0, 10),
              storageKey: row.storageKey,
              downloadable: Boolean(row.storageKey),
            });
          }
        }
        return filterDocumentLibrary([...byId.values()], filters);
      }
    }
  } catch (err) {
    console.warn("[documents] DB merge skipped:", err);
  }

  return filterDocumentLibrary(entries, filters);
}

export async function cancelShipment(id: string) {
  const { withdrawListingOnCancel } = await import("@/lib/network/listing-repository");
  await withdrawListingOnCancel(id);
  return updateShipmentStatus(id, "cancelled");
}

export function tickMapGeo() {
  devTickGeo();
}

export async function getKpis() {
  const { ensureNetworkHydrated } = await import("@/lib/network/network-persistence");
  await ensureNetworkHydrated();
  const shipments = await fetchShipmentsForEnrichment();
  return computeKpisFromShipments(shipments);
}

export async function getExceptions() {
  const shipments = await fetchShipmentsForEnrichment();
  return computeExceptionsFromShipments(shipments);
}

export function listActivities(limit?: number) {
  const all = devActivities(limit ?? 50);
  if (allowDemoSeeds()) return all.slice(0, limit ?? 10);
  // Live: only process-recorded events (logActivity uses a${Date.now()}), not seed a1..aN
  return all.filter((a) => /^a\d{10,}$/.test(a.id)).slice(0, limit ?? 10);
}

export function getShipmentActivities(shipmentId: string, limit?: number) {
  const all = devActivitiesForShipment(shipmentId, limit ?? 50);
  if (allowDemoSeeds()) return all.slice(0, limit ?? 20);
  return all.filter((a) => /^a\d{10,}$/.test(a.id)).slice(0, limit ?? 20);
}

export async function listShipmentNotes(shipmentId: string) {
  const { isDatabaseConfigured } = await import("@/lib/db/client");
  if (isDatabaseConfigured()) {
    const { listNotesFromDb } = await import("@/lib/db/notes-repository");
    const fromDb = await listNotesFromDb(shipmentId);
    if (fromDb) return fromDb;
  }
  return devListShipmentNotes(shipmentId);
}

export async function addShipmentNote(shipmentId: string, author: string, body: string) {
  const note = devAddShipmentNote(shipmentId, author, body);
  if (!note) return null;

  const { isDatabaseConfigured } = await import("@/lib/db/client");
  if (isDatabaseConfigured()) {
    const { insertNoteToDb } = await import("@/lib/db/notes-repository");
    try {
      await insertNoteToDb(note);
    } catch (err) {
      console.error("[notes] failed to persist to database", err);
    }
  }
  return note;
}

export async function listDrivers() {
  const {
    listStoredDrivers,
    getDriverPatch,
    ensureFleetEntitiesHydrated,
  } = await import("@/lib/mutations/fleet-entity-store");

  await ensureFleetEntitiesHydrated();

  let base: Awaited<ReturnType<typeof devListDrivers>>;
  if (isLiveFleetbaseMode()) {
    try {
      const raw = await getFleetbaseClient().listDrivers(100);
      base = raw.map((d) => mapFleetbaseDriver(d as Record<string, unknown>));
    } catch (e) {
      liveFail("listDrivers", e);
    }
    // Live: Fleetbase only — do not merge legacy local store rows.
    return base.map((d) => {
      const patch = getDriverPatch(d.id);
      return patch ? { ...d, ...patch, id: d.id } : d;
    });
  }

  base = [...listStoredDrivers(), ...devListDrivers()];
  return base.map((d) => {
    const patch = getDriverPatch(d.id);
    return patch ? { ...d, ...patch, id: d.id } : d;
  });
}

export async function listVehicles() {
  const {
    listStoredVehicles,
    getVehiclePatch,
    ensureFleetEntitiesHydrated,
  } = await import("@/lib/mutations/fleet-entity-store");

  await ensureFleetEntitiesHydrated();

  let base: Awaited<ReturnType<typeof devListVehicles>>;
  if (isLiveFleetbaseMode()) {
    try {
      const raw = await getFleetbaseClient().listVehicles(100);
      base = raw.map((v) => mapFleetbaseVehicle(v as Record<string, unknown>));
    } catch (e) {
      liveFail("listVehicles", e);
    }
    // Live: Fleetbase only — do not merge legacy local store rows.
    return base.map((v) => {
      const patch = getVehiclePatch(v.id);
      return patch ? { ...v, ...patch, id: v.id } : v;
    });
  }

  base = [...listStoredVehicles(), ...devListVehicles()];
  return base.map((v) => {
    const patch = getVehiclePatch(v.id);
    return patch ? { ...v, ...patch, id: v.id } : v;
  });
}

/** Domain modules: empty list when Fleetbase is down (core fleet APIs still fail-loud). */
export async function listVehiclesSafe() {
  try {
    return await listVehicles();
  } catch (e) {
    console.warn(
      "[enrichment] vehicles unavailable:",
      e instanceof Error ? e.message : e,
    );
    return [];
  }
}

export async function listDriversSafe() {
  try {
    return await listDrivers();
  } catch (e) {
    console.warn(
      "[enrichment] drivers unavailable:",
      e instanceof Error ? e.message : e,
    );
    return [];
  }
}

export async function getAssignOptions(shipmentId: string) {
  const shipment = await getShipment(shipmentId);
  if (!shipment) return undefined;

  const [drivers, vehicles] = await Promise.all([listDrivers(), listVehicles()]);
  return {
    drivers: drivers.filter((d) => d.status !== "off_duty"),
    vehicles: vehicles.filter(
      (v) =>
        (v.status === "available" || v.status === "on_trip") &&
        v.docs !== "expired" &&
        v.capacityMt >= shipment.tonnageMt,
    ),
  };
}

export function generateTrackLink(id: string) {
  return devTrackLink(id);
}

export async function addShipmentDocument(
  id: string,
  input: {
    type: "lr" | "epod" | "invoice" | "other";
    name: string;
    id?: string;
    storageKey?: string;
    contentType?: string;
    sizeBytes?: number;
  },
) {
  const shipment = devAddDocument(id, input);
  if (!shipment) return null;

  const doc = shipment.documents[shipment.documents.length - 1];
  if (doc) {
    const { isDatabaseConfigured } = await import("@/lib/db/client");
    if (isDatabaseConfigured()) {
      const { insertDocumentToDb } = await import("@/lib/db/documents-repository");
      try {
        await insertDocumentToDb(id, doc);
      } catch (err) {
        console.error("[documents] failed to persist to database", err);
      }
    }
  }
  return shipment;
}

export async function getSyncStatus() {
  const source = getActiveDataSource();
  const tz = await getSyncState();
  const base = {
    ...devSyncStatus,
    lastSyncAt: tz.lastSyncAt,
    tranzfortConfigured: Boolean(
      process.env.TRANZFORT_SUPABASE_URL && process.env.TRANZFORT_SERVICE_KEY,
    ),
    tranzfortSource: tz.source,
    lastRun: tz.lastRun,
  };

  if (source === "fleetbase") {
    const healthy = await getFleetbaseClient().healthCheck();
    return {
      ...base,
      healthy: healthy && tz.healthy,
      dataSource: "fleetbase" as const,
      fleetbaseReachable: healthy,
    };
  }

  return {
    ...base,
    healthy: tz.healthy,
    dataSource: "dev-store" as const,
    fleetbaseReachable: false,
  };
}
