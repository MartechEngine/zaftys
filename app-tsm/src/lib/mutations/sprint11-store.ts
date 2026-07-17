import { logActivity } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmTraccarTest?: { lastTestAt: string; status: "connected" | "disconnected" };
  __tsmRolePatches?: Record<string, { name?: string }>;
  __tsmGroupPatches?: Record<string, { name?: string; policy?: string }>;
  __tsmPlacePatches?: Record<string, { name?: string; type?: string; city?: string; geofence?: string }>;
  __tsmGeofencePatches?: Record<string, { name?: string; radius?: string; triggers?: string }>;
  __tsmEquipmentPatches?: Record<string, { location?: string; status?: "active" | "stored" | "maintenance" }>;
  __tsmOrderTypeFlows?: Record<string, string[]>;
};

export function getTraccarTestState() {
  return g.__tsmTraccarTest;
}

export function recordTraccarTest() {
  g.__tsmTraccarTest = {
    lastTestAt: new Date().toISOString(),
    status: "connected",
  };
  logActivity({
    shipmentId: "",
    type: "traccar.tested",
    message: "Traccar connection OK",
    timestamp: new Date().toISOString(),
  });
  return g.__tsmTraccarTest;
}

export function getRolePatch(id: string) {
  return g.__tsmRolePatches?.[id];
}

export function patchRoleFields(id: string, patch: { name?: string }) {
  if (!g.__tsmRolePatches) g.__tsmRolePatches = {};
  g.__tsmRolePatches[id] = { ...g.__tsmRolePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "role.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmRolePatches[id];
}

export function getGroupPatch(id: string) {
  return g.__tsmGroupPatches?.[id];
}

export function patchGroupFields(id: string, patch: { name?: string; policy?: string }) {
  if (!g.__tsmGroupPatches) g.__tsmGroupPatches = {};
  g.__tsmGroupPatches[id] = { ...g.__tsmGroupPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "settings_group.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmGroupPatches[id];
}

export function getPlacePatch(id: string) {
  return g.__tsmPlacePatches?.[id];
}

export function replacePlacePatches(
  next: Record<string, { name?: string; type?: string; city?: string; geofence?: string }>,
) {
  g.__tsmPlacePatches = { ...next };
}

export function patchPlaceFields(
  id: string,
  patch: { name?: string; type?: string; city?: string; geofence?: string },
) {
  if (!g.__tsmPlacePatches) g.__tsmPlacePatches = {};
  g.__tsmPlacePatches[id] = { ...g.__tsmPlacePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "place.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmPlacePatches[id];
}

export function getGeofencePatch(id: string) {
  return g.__tsmGeofencePatches?.[id];
}

export function patchGeofenceFields(
  id: string,
  patch: { name?: string; radius?: string; triggers?: string },
) {
  if (!g.__tsmGeofencePatches) g.__tsmGeofencePatches = {};
  g.__tsmGeofencePatches[id] = { ...g.__tsmGeofencePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "geofence.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmGeofencePatches[id];
}

export function getEquipmentPatch(id: string) {
  return g.__tsmEquipmentPatches?.[id];
}

export function replaceEquipmentPatches(
  next: Record<
    string,
    { location?: string; status?: "active" | "stored" | "maintenance" }
  >,
) {
  g.__tsmEquipmentPatches = { ...next };
}

export function patchEquipmentFields(
  id: string,
  patch: { location?: string; status?: "active" | "stored" | "maintenance" },
) {
  if (!g.__tsmEquipmentPatches) g.__tsmEquipmentPatches = {};
  g.__tsmEquipmentPatches[id] = { ...g.__tsmEquipmentPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "equipment.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmEquipmentPatches[id];
}

export function getOrderTypeFlowOverride(id: string) {
  return g.__tsmOrderTypeFlows?.[id];
}

export function setOrderTypeFlowOverride(id: string, steps: string[]) {
  if (!g.__tsmOrderTypeFlows) g.__tsmOrderTypeFlows = {};
  g.__tsmOrderTypeFlows[id] = steps;
  logActivity({
    shipmentId: "",
    type: "order_type.flow_updated",
    message: `${id} · ${steps.length} steps`,
    timestamp: new Date().toISOString(),
  });
  return steps;
}
