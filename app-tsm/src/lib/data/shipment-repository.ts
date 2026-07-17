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
import { getSyncState } from "@/lib/sync/sync-state";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { buildFleetbaseCreatePayload, mapFleetbaseOrder, mapFleetbaseDriver, mapFleetbaseVehicle, toFleetbaseStatus } from "@/lib/fleetbase/mapper";
import { geoForShipment } from "@/lib/geo";
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
  return {
    ...record,
    geo: geoForShipment({
      id: record.id,
      origin: record.origin,
      destination: record.destination,
      status: record.status,
      updatedAt: record.updatedAt,
    }),
  };
}

function recordShipmentActivity(shipmentId: string, type: string, message: string) {
  logActivity({
    shipmentId,
    type,
    message,
    timestamp: new Date().toISOString(),
  });
}

export type DataSource = "fleetbase" | "dev-store";

export function getActiveDataSource(): DataSource {
  // Rich demo UI by default — set TSM_DEMO_UI=0 to prefer live Fleetbase
  if (process.env.TSM_DEMO_UI !== "0") return "dev-store";
  if (process.env.FLEETBASE_API_KEY) return "fleetbase";
  return "dev-store";
}

export async function fetchAllShipmentsRaw(): Promise<ShipmentRecord[]> {
  if (getActiveDataSource() === "fleetbase") {
    try {
      const client = getFleetbaseClient();
      const orders = await client.listOrders(100);
      return orders.map(mapFleetbaseOrder).map(withGeo);
    } catch (e) {
      console.warn("[shipments] Fleetbase fallback to dev-store:", e);
      return devListShipments();
    }
  }
  return devListShipments();
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
  if (getActiveDataSource() === "fleetbase") {
    try {
      const order = await getFleetbaseClient().getOrder(id);
      return withGeo(mapFleetbaseOrder(order));
    } catch (e) {
      console.warn("[shipment] Fleetbase fallback:", e);
    }
  }
  return devGetShipment(id);
}

export async function getShipmentByToken(token: string) {
  const dev = devGetByToken(token);
  if (dev) return dev;
  if (getActiveDataSource() === "fleetbase") {
    try {
      const order = await getFleetbaseClient().getOrder(token);
      return withGeo(mapFleetbaseOrder(order));
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export async function assignShipment(id: string, driverId: string, vehicleId: string) {
  if (getActiveDataSource() === "fleetbase") {
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
      console.warn("[assign] Fleetbase failed, using dev-store:", e);
    }
  }
  return devAssign(id, driverId, vehicleId);
}

export async function createShipment(input: CreateShipmentInput): Promise<ShipmentRecord | null> {
  if (getActiveDataSource() === "fleetbase") {
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
      console.warn("[createShipment] Fleetbase failed, using dev-store:", e);
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

  if (getActiveDataSource() === "fleetbase") {
    try {
      const order = await getFleetbaseClient().updateOrderStatus(id, toFleetbaseStatus(status));
      updated = withGeo(mapFleetbaseOrder(order));
      recordShipmentActivity(
        updated.id,
        `shipment.${status}`,
        `${updated.publicId} · ${status.replace("_", " ")} (Fleetbase)`,
      );
    } catch (e) {
      console.warn("[updateStatus] Fleetbase failed:", e);
      throw e instanceof Error ? e : new Error("Fleetbase status update failed.");
    }
  } else {
    updated = devUpdateStatus(id, status);
  }

  const tranzfortId = updated?.tranzfortId ?? existing.tranzfortId;
  if (updated && tranzfortId && isTranZfortConfigured()) {
    try {
      await pushTranZfortStatus(tranzfortId, status);
    } catch (e) {
      console.warn("[updateStatus] TranZfort push failed:", e);
    }
  }

  return updated;
}

export async function updateShipmentFields(id: string, patch: ShipmentFieldsPatch) {
  const existing = await getShipment(id);
  if (!existing) return null;
  if (["delivered", "cancelled"].includes(existing.status)) {
    throw new Error(`Cannot edit a ${existing.status} shipment.`);
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
  const shipments = await listShipments();
  return computeKpisFromShipments(shipments);
}

export async function getExceptions() {
  const shipments = await listShipments();
  return computeExceptionsFromShipments(shipments);
}

export function listActivities(limit?: number) {
  return devActivities(limit);
}

export function getShipmentActivities(shipmentId: string, limit?: number) {
  return devActivitiesForShipment(shipmentId, limit);
}

export function listShipmentNotes(shipmentId: string) {
  return devListShipmentNotes(shipmentId);
}

export function addShipmentNote(shipmentId: string, author: string, body: string) {
  return devAddShipmentNote(shipmentId, author, body);
}

export async function listDrivers() {
  const {
    listStoredDrivers,
    getDriverPatch,
  } = await import("@/lib/mutations/fleet-entity-store");

  let base: Awaited<ReturnType<typeof devListDrivers>>;
  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().listDrivers(100);
      base = raw.map((d) => mapFleetbaseDriver(d as Record<string, unknown>));
    } catch (e) {
      console.warn("[drivers] Fleetbase fallback:", e);
      base = devListDrivers();
    }
  } else {
    base = devListDrivers();
  }

  const merged = [...listStoredDrivers(), ...base].map((d) => {
    const patch = getDriverPatch(d.id);
    return patch ? { ...d, ...patch, id: d.id } : d;
  });
  return merged;
}

export async function listVehicles() {
  const {
    listStoredVehicles,
    getVehiclePatch,
  } = await import("@/lib/mutations/fleet-entity-store");

  let base: Awaited<ReturnType<typeof devListVehicles>>;
  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().listVehicles(100);
      base = raw.map((v) => mapFleetbaseVehicle(v as Record<string, unknown>));
    } catch (e) {
      console.warn("[vehicles] Fleetbase fallback:", e);
      base = devListVehicles();
    }
  } else {
    base = devListVehicles();
  }

  const merged = [...listStoredVehicles(), ...base].map((v) => {
    const patch = getVehiclePatch(v.id);
    return patch ? { ...v, ...patch, id: v.id } : v;
  });
  return merged;
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

export function addShipmentDocument(
  id: string,
  input: { type: "lr" | "epod" | "invoice" | "other"; name: string },
) {
  return devAddDocument(id, input);
}

export async function getSyncStatus() {
  const source = getActiveDataSource();
  const tz = getSyncState();
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
