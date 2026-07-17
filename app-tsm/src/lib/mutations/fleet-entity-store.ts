import { logActivity } from "@/lib/dev-store";
import type { Driver, Vehicle } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmDrivers?: Driver[];
  __tsmDriverPatches?: Record<string, Partial<Driver>>;
  __tsmVehicles?: Vehicle[];
  __tsmVehiclePatches?: Record<string, Partial<Vehicle>>;
  __tsmTallyConfigured?: boolean;
  __tsmCustomReports?: Array<{
    id: string;
    name: string;
    description: string;
    href: string;
    metric: string;
    status: "ready" | "planned";
  }>;
  __tsmVendorPatches?: Record<string, { name?: string; type?: string; city?: string; contact?: string }>;
};

export function listStoredDrivers(): Driver[] {
  if (!g.__tsmDrivers) g.__tsmDrivers = [];
  return [...g.__tsmDrivers];
}

export function replaceStoredDrivers(items: Driver[]) {
  g.__tsmDrivers = [...items];
}

export function getDriverPatch(id: string) {
  return g.__tsmDriverPatches?.[id];
}

export function replaceDriverPatches(next: Record<string, Partial<Driver>>) {
  g.__tsmDriverPatches = { ...next };
}

export function createStoredDriver(input: {
  name: string;
  phone: string;
  license?: string;
}): Driver {
  if (!g.__tsmDrivers) g.__tsmDrivers = [];
  const driver: Driver = {
    id: `d-${Date.now().toString(36)}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    license: input.license?.trim() || "MH-00-0000000",
    licenseExpiry: "31 Dec 2027",
    status: "on_duty",
  };
  g.__tsmDrivers.unshift(driver);
  logActivity({
    shipmentId: "",
    type: "driver.created",
    message: driver.name,
    timestamp: new Date().toISOString(),
  });
  return driver;
}

export function patchStoredDriver(id: string, patch: Partial<Driver>) {
  if (!g.__tsmDriverPatches) g.__tsmDriverPatches = {};
  g.__tsmDriverPatches[id] = { ...g.__tsmDriverPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "driver.updated",
    message: `Driver ${id} updated`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmDriverPatches[id];
}

export function listStoredVehicles(): Vehicle[] {
  if (!g.__tsmVehicles) g.__tsmVehicles = [];
  return [...g.__tsmVehicles];
}

export function replaceStoredVehicles(items: Vehicle[]) {
  g.__tsmVehicles = [...items];
}

export function getVehiclePatch(id: string) {
  return g.__tsmVehiclePatches?.[id];
}

export function replaceVehiclePatches(next: Record<string, Partial<Vehicle>>) {
  g.__tsmVehiclePatches = { ...next };
}

export function createStoredVehicle(input: {
  registration: string;
  type?: string;
}): Vehicle {
  if (!g.__tsmVehicles) g.__tsmVehicles = [];
  const vehicle: Vehicle = {
    id: `v-${Date.now().toString(36)}`,
    registration: input.registration.trim().toUpperCase(),
    type: input.type?.trim() || "Multi-axle",
    capacityMt: 32,
    status: "available",
    docs: "valid",
  };
  g.__tsmVehicles.unshift(vehicle);
  logActivity({
    shipmentId: "",
    type: "vehicle.created",
    message: vehicle.registration,
    timestamp: new Date().toISOString(),
  });
  return vehicle;
}

export function patchStoredVehicle(id: string, patch: Partial<Vehicle>) {
  if (!g.__tsmVehiclePatches) g.__tsmVehiclePatches = {};
  g.__tsmVehiclePatches[id] = { ...g.__tsmVehiclePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "vehicle.updated",
    message: `Vehicle ${id} updated`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmVehiclePatches[id];
}

export function isTallyConfiguredLocally() {
  return Boolean(g.__tsmTallyConfigured);
}

export function configureTallyLocal() {
  g.__tsmTallyConfigured = true;
  logActivity({
    shipmentId: "",
    type: "tally.configured",
    message: "Tally export enabled (local)",
    timestamp: new Date().toISOString(),
  });
  return { configured: true };
}

export function listStoredCustomReports() {
  if (!g.__tsmCustomReports) g.__tsmCustomReports = [];
  return [...g.__tsmCustomReports];
}

export function replaceStoredCustomReports(
  items: ReturnType<typeof listStoredCustomReports>,
) {
  g.__tsmCustomReports = [...items];
}

export function createStoredCustomReport(input: {
  name: string;
  description?: string;
}) {
  if (!g.__tsmCustomReports) g.__tsmCustomReports = [];
  const row = {
    id: `cr-${Date.now().toString(36)}`,
    name: input.name.trim(),
    description: input.description?.trim() || "Custom saved report",
    href: "/reports/operations",
    metric: "Saved just now",
    status: "ready" as const,
  };
  g.__tsmCustomReports.unshift(row);
  logActivity({
    shipmentId: "",
    type: "report.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export type StoredReportSchedule = {
  id: string;
  name: string;
  cadence: string;
  recipients: string;
};

export function listStoredReportSchedules(): StoredReportSchedule[] {
  const store = globalThis as typeof globalThis & {
    __tsmReportSchedules?: StoredReportSchedule[];
  };
  if (!store.__tsmReportSchedules) store.__tsmReportSchedules = [];
  return [...store.__tsmReportSchedules];
}

export function replaceStoredReportSchedules(items: StoredReportSchedule[]) {
  const store = globalThis as typeof globalThis & {
    __tsmReportSchedules?: StoredReportSchedule[];
  };
  store.__tsmReportSchedules = [...items];
}

export function createStoredReportSchedule(input: {
  name: string;
  cadence: string;
  recipients: string;
}): StoredReportSchedule {
  const store = globalThis as typeof globalThis & {
    __tsmReportSchedules?: StoredReportSchedule[];
  };
  if (!store.__tsmReportSchedules) store.__tsmReportSchedules = [];
  const row: StoredReportSchedule = {
    id: `rs-${Date.now().toString(36)}`,
    name: input.name.trim(),
    cadence: input.cadence.trim(),
    recipients: input.recipients.trim(),
  };
  store.__tsmReportSchedules.unshift(row);
  logActivity({
    shipmentId: "",
    type: "report_schedule.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function deleteStoredReportSchedule(id: string) {
  const store = globalThis as typeof globalThis & {
    __tsmReportSchedules?: StoredReportSchedule[];
  };
  if (!store.__tsmReportSchedules) return;
  store.__tsmReportSchedules = store.__tsmReportSchedules.filter((r) => r.id !== id);
}

export function patchStoredReportSchedule(
  id: string,
  patch: Partial<Pick<StoredReportSchedule, "cadence" | "recipients">>,
): StoredReportSchedule | undefined {
  const store = globalThis as typeof globalThis & {
    __tsmReportSchedules?: StoredReportSchedule[];
  };
  if (!store.__tsmReportSchedules) return undefined;
  const row = store.__tsmReportSchedules.find((r) => r.id === id);
  if (!row) return undefined;
  if (patch.cadence !== undefined) row.cadence = patch.cadence.trim();
  if (patch.recipients !== undefined) row.recipients = patch.recipients.trim();
  logActivity({
    shipmentId: "",
    type: "report_schedule.updated",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function getVendorPatch(id: string) {
  return g.__tsmVendorPatches?.[id];
}

export function replaceVendorPatches(
  next: Record<
    string,
    { name?: string; type?: string; city?: string; contact?: string }
  >,
) {
  g.__tsmVendorPatches = { ...next };
}

export function patchStoredVendor(
  id: string,
  patch: { name?: string; type?: string; city?: string; contact?: string },
) {
  if (!g.__tsmVendorPatches) g.__tsmVendorPatches = {};
  g.__tsmVendorPatches[id] = { ...g.__tsmVendorPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "vendor.updated",
    message: `Vendor ${id} updated`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmVendorPatches[id];
}

/** Hydrate created drivers/vehicles (+ patches) from Postgres once. */
export async function ensureFleetEntitiesHydrated() {
  const { isDatabaseConfigured } = await import("@/lib/db/client");
  if (!isDatabaseConfigured()) return;
  const gHydrate = globalThis as typeof globalThis & {
    __tsmFleetEntitiesHydrated?: boolean;
  };
  if (gHydrate.__tsmFleetEntitiesHydrated) return;

  const {
    ensureArrayHydrated,
    loadCollection,
    isCollectionHydrated,
    markCollectionHydrated,
  } = await import("@/lib/db/collections");

  await ensureArrayHydrated({
    collection: "fleet_drivers",
    list: listStoredDrivers,
    replace: replaceStoredDrivers,
  });
  await ensureArrayHydrated({
    collection: "fleet_vehicles",
    list: listStoredVehicles,
    replace: replaceStoredVehicles,
  });

  if (!isCollectionHydrated("driver_patches")) {
    const rows = await loadCollection<{ id: string; value: Partial<Driver> }>(
      "driver_patches",
    );
    if (rows.length > 0) {
      replaceDriverPatches(Object.fromEntries(rows.map((r) => [r.id, r.value])));
    }
    markCollectionHydrated("driver_patches");
  }
  if (!isCollectionHydrated("vehicle_patches")) {
    const rows = await loadCollection<{ id: string; value: Partial<Vehicle> }>(
      "vehicle_patches",
    );
    if (rows.length > 0) {
      replaceVehiclePatches(Object.fromEntries(rows.map((r) => [r.id, r.value])));
    }
    markCollectionHydrated("vehicle_patches");
  }

  gHydrate.__tsmFleetEntitiesHydrated = true;
}

export async function persistFleetEntities() {
  const { isDatabaseConfigured } = await import("@/lib/db/client");
  if (!isDatabaseConfigured()) return;
  const { upsertDocument, persistMapEntry } = await import("@/lib/db/collections");
  try {
    for (const d of listStoredDrivers()) {
      await upsertDocument("fleet_drivers", d.id, d);
    }
    for (const v of listStoredVehicles()) {
      await upsertDocument("fleet_vehicles", v.id, v);
    }
    for (const [id, value] of Object.entries(g.__tsmDriverPatches ?? {})) {
      await persistMapEntry("driver_patches", id, value);
    }
    for (const [id, value] of Object.entries(g.__tsmVehiclePatches ?? {})) {
      await persistMapEntry("vehicle_patches", id, value);
    }
  } catch (err) {
    console.error("[fleet-entity-store] persist failed", err);
  }
}
