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
import {
  getExecutionBackend,
  getExecutionStore,
  isLiveExecutionMode,
} from "@/lib/execution";
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
import type { ExecutionStore } from "@/lib/execution";

/** Prefer session org for Postgres LOS; Fleetbase ignores org. */
async function execution(): Promise<ExecutionStore> {
  if (getExecutionBackend() !== "postgres") {
    return getExecutionStore();
  }
  try {
    const { getSession } = await import("@/lib/auth/session");
    const session = await getSession();
    if (session?.tsmOrgId?.trim()) {
      return getExecutionStore({ orgId: session.tsmOrgId });
    }
    if (session?.supplierId?.trim()) {
      const { orgIdForSupplier } = await import("@/lib/tsm/org");
      return getExecutionStore({ orgId: orgIdForSupplier(session.supplierId) });
    }
  } catch {
    /* fall through to env org */
  }
  return getExecutionStore();
}

function withGeo(record: ShipmentRecord): ShipmentRecord {
  const live = isLiveExecutionMode();
  const current = record.geo?.current;

  if (live) {
    // Keep real GPS only; never invent a moving pin from city corridors.
    if (current && isValidGps(current.lat, current.lng)) return record;

    const fromFields =
      record.originLat != null &&
      record.originLng != null &&
      record.destinationLat != null &&
      record.destinationLng != null &&
      isValidGps(Number(record.originLat), Number(record.originLng)) &&
      isValidGps(Number(record.destinationLat), Number(record.destinationLng))
        ? {
            origin: { lat: Number(record.originLat), lng: Number(record.originLng) },
            destination: {
              lat: Number(record.destinationLat),
              lng: Number(record.destinationLng),
            },
          }
        : undefined;

    const synthetic = geoForShipment({
      id: record.id,
      origin: record.origin,
      destination: record.destination,
      status: record.status,
      updatedAt: record.updatedAt,
    });
    const endpoints = fromFields ?? (synthetic
      ? { origin: synthetic.origin, destination: synthetic.destination }
      : undefined);

    if (!endpoints) {
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
        origin: endpoints.origin,
        destination: endpoints.destination,
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

async function applyExecutionPositions(
  shipments: ShipmentRecord[],
): Promise<ShipmentRecord[]> {
  if (!isLiveExecutionMode() || shipments.length === 0) {
    return shipments;
  }
  try {
    const positions = await (await execution()).listPositions(100);
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

export type DataSource = "fleetbase" | "postgres" | "dev-store";

export function getActiveDataSource(): DataSource {
  return getExecutionBackend();
}

/** True only when the live backend is Fleetbase (not Postgres). */
export function isLiveFleetbaseMode(): boolean {
  return getExecutionBackend() === "fleetbase";
}

function liveFail(context: string, e: unknown): never {
  const msg = e instanceof Error ? e.message : String(e);
  console.error(`[${context}] Execution live mode failed (no demo fallback):`, e);
  throw new Error(`Execution backend unavailable (${context}): ${msg}`);
}

export async function fetchAllShipmentsRaw(): Promise<ShipmentRecord[]> {
  const { ensurePositionsHydrated, applyLiveGeo } = await import(
    "@/lib/map/live-positions"
  );
  await ensurePositionsHydrated();

  if (isLiveExecutionMode()) {
    try {
      const orders = await (await execution()).listShipments(100);
      const mapped = orders.map(withGeo);
      return applyLiveGeo(await applyExecutionPositions(mapped));
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
  if (isLiveExecutionMode()) {
    try {
      const order = await (await execution()).getShipment(id);
      if (!order) return undefined;
      const [withPos] = await applyExecutionPositions([withGeo(order)]);
      return withPos;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) return undefined;
      liveFail("getShipment", e);
    }
  }
  return devGetShipment(id);
}

export async function getShipmentByToken(token: string) {
  // Live honesty: try execution backend first; only use demo/dev tokens in demo UI.
  if (isLiveExecutionMode() || !allowDemoSeeds()) {
    try {
      const order = await (await execution()).getShipment(token);
      return order ? withGeo(order) : undefined;
    } catch {
      return undefined;
    }
  }
  return devGetByToken(token);
}

export async function assignShipment(id: string, driverId: string, vehicleId: string) {
  if (isLiveExecutionMode()) {
    try {
      const mapped = withGeo(
        await (await execution()).assignShipment(id, driverId, vehicleId),
      );
      recordShipmentActivity(
        mapped.id,
        "shipment.assigned",
        `${mapped.publicId} assigned · ${mapped.driver ?? "driver"} · ${mapped.vehicle ?? "vehicle"}`,
      );
      return mapped;
    } catch (e) {
      liveFail("assignShipment", e);
    }
  }
  return devAssign(id, driverId, vehicleId);
}

export async function createShipment(input: CreateShipmentInput): Promise<ShipmentRecord | null> {
  if (isLiveExecutionMode()) {
    try {
      const mapped = withGeo(await (await execution()).createShipment(input));
      recordShipmentActivity(
        mapped.id,
        "shipment.created",
        `${mapped.publicId} created · ${mapped.origin} → ${mapped.destination}`,
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

  if (isLiveExecutionMode()) {
    try {
      updated = withGeo(await (await execution()).updateShipmentStatus(id, status));
      recordShipmentActivity(
        updated.id,
        `shipment.${status}`,
        `${updated.publicId} · ${status.replace("_", " ")}`,
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

  if (isLiveExecutionMode()) {
    try {
      const fbPatch: Record<string, unknown> = {};
      if (
        patch.client !== undefined ||
        patch.commodity !== undefined ||
        patch.tonnageMt !== undefined ||
        patch.lrNumber !== undefined ||
        patch.originType !== undefined ||
        patch.tranzfortId !== undefined
      ) {
        fbPatch.meta = {
          ...(patch.client !== undefined ? { client: patch.client } : {}),
          ...(patch.commodity !== undefined ? { commodity: patch.commodity } : {}),
          ...(patch.tonnageMt !== undefined
            ? { tonnage: patch.tonnageMt, tonnage_mt: patch.tonnageMt }
            : {}),
          ...(patch.lrNumber !== undefined ? { lr_number: patch.lrNumber } : {}),
          ...(patch.originType !== undefined ? { origin_type: patch.originType } : {}),
          ...(patch.tranzfortId !== undefined
            ? { tranzfort_id: patch.tranzfortId }
            : {}),
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
        const mapped = withGeo(
          await (await execution()).updateShipmentPatch(id, fbPatch),
        );
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

  if (isLiveExecutionMode() && patch.eta) {
    try {
      return withGeo(
        await (await execution()).updateShipmentPatch(id, {
          eta: patch.eta,
          meta: patch.scheduledAt ? { scheduled_at: patch.scheduledAt } : undefined,
        }),
      );
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
  if (isLiveExecutionMode()) {
    try {
      base = await (await execution()).listDrivers(100);
    } catch (e) {
      liveFail("listDrivers", e);
    }
    // Live: execution backend only — do not merge legacy local store rows.
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
  if (isLiveExecutionMode()) {
    try {
      base = await (await execution()).listVehicles(100);
    } catch (e) {
      liveFail("listVehicles", e);
    }
    // Live: execution backend only — do not merge legacy local store rows.
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
  const doc = {
    id: input.id ?? `doc-${Date.now()}`,
    type: input.type,
    name: input.name,
    uploadedAt: new Date().toISOString(),
    ...(input.storageKey ? { storageKey: input.storageKey } : {}),
    ...(input.contentType ? { contentType: input.contentType } : {}),
    ...(input.sizeBytes != null ? { sizeBytes: input.sizeBytes } : {}),
  };

  if (isLiveExecutionMode()) {
    try {
      const existing = await getShipment(id);
      if (!existing) return null;
      const next = {
        ...existing,
        documents: [...(existing.documents ?? []), doc],
        updatedAt: new Date().toISOString(),
      };
      const store = await execution();
      if ("putShipmentRecord" in store && typeof (store as { putShipmentRecord?: unknown }).putShipmentRecord === "function") {
        await (store as { putShipmentRecord: (r: typeof next) => Promise<typeof next> }).putShipmentRecord(next);
      } else {
        // Fleetbase escape: keep metadata locally + DB row; order meta may not hold docs.
        await store.updateShipmentPatch(id, {
          meta: { lr_number: existing.lrNumber, last_document: doc.name },
        });
      }
      recordShipmentActivity(
        id,
        "document.uploaded",
        `${existing.publicId} · ${input.type.toUpperCase()} uploaded`,
      );
      const { isDatabaseConfigured } = await import("@/lib/db/client");
      if (isDatabaseConfigured()) {
        const { insertDocumentToDb } = await import("@/lib/db/documents-repository");
        try {
          await insertDocumentToDb(id, doc);
        } catch (err) {
          console.error("[documents] failed to persist to database", err);
        }
      }
      return withGeo(next);
    } catch (e) {
      liveFail("addShipmentDocument", e);
    }
  }

  const shipment = devAddDocument(id, input);
  if (!shipment) return null;

  const last = shipment.documents[shipment.documents.length - 1];
  if (last) {
    const { isDatabaseConfigured } = await import("@/lib/db/client");
    if (isDatabaseConfigured()) {
      const { insertDocumentToDb } = await import("@/lib/db/documents-repository");
      try {
        await insertDocumentToDb(id, last);
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

  if (source === "fleetbase" || source === "postgres") {
    const healthy = await (await execution()).healthCheck();
    return {
      ...base,
      healthy: healthy && tz.healthy,
      dataSource: source,
      fleetbaseReachable: source === "fleetbase" ? healthy : false,
      executionBackend: source,
    };
  }

  return {
    ...base,
    healthy: tz.healthy,
    dataSource: "dev-store" as const,
    fleetbaseReachable: false,
    executionBackend: "dev-store" as const,
  };
}
