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

export function getDriverPatch(id: string) {
  return g.__tsmDriverPatches?.[id];
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

export function getVehiclePatch(id: string) {
  return g.__tsmVehiclePatches?.[id];
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

export function getVendorPatch(id: string) {
  return g.__tsmVendorPatches?.[id];
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
