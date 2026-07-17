import { logActivity } from "@/lib/dev-store";

export type PolicyPatchValues = Record<string, unknown>;

export type ShipmentSchedulePatch = {
  eta?: string;
  scheduledAt?: string;
};

export type StoredPart = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorder: number;
  location: string;
};

const SYSTEM_ROLE_IDS = new Set(["r1"]);

const g = globalThis as typeof globalThis & {
  __tsmPolicyPatches?: Record<string, PolicyPatchValues>;
  __tsmShipmentSchedulePatches?: Record<string, ShipmentSchedulePatch>;
  __tsmDeletedRoleIds?: string[];
  __tsmOrgUserInviteResends?: Record<string, { lastResentAt: string; count: number }>;
  __tsmCreatedParts?: StoredPart[];
  __tsmFaultWorkOrders?: Record<string, string>;
  __tsmPlaceGeofenceSyncs?: Record<string, { geofence: string; syncedAt: string }>;
};

export function patchPolicyValues(policyId: string, values: PolicyPatchValues) {
  if (!g.__tsmPolicyPatches) g.__tsmPolicyPatches = {};
  g.__tsmPolicyPatches[policyId] = { ...g.__tsmPolicyPatches[policyId], ...values };
  logActivity({
    shipmentId: "",
    type: "policy.updated",
    message: `${policyId} · ${Object.keys(values).join(", ")}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmPolicyPatches[policyId];
}

export function getPolicyPatch(policyId: string): PolicyPatchValues | undefined {
  return g.__tsmPolicyPatches?.[policyId];
}

export function getAllPolicyPatches(): Record<string, PolicyPatchValues> {
  return { ...(g.__tsmPolicyPatches ?? {}) };
}

export function patchShipmentSchedule(shipmentId: string, patch: ShipmentSchedulePatch) {
  if (!g.__tsmShipmentSchedulePatches) g.__tsmShipmentSchedulePatches = {};
  g.__tsmShipmentSchedulePatches[shipmentId] = {
    ...g.__tsmShipmentSchedulePatches[shipmentId],
    ...patch,
  };
  logActivity({
    shipmentId,
    type: "shipment.rescheduled",
    message: `ETA ${patch.eta ?? "—"} · ${patch.scheduledAt ?? "—"}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmShipmentSchedulePatches[shipmentId];
}

export function getShipmentSchedulePatch(shipmentId: string): ShipmentSchedulePatch | undefined {
  return g.__tsmShipmentSchedulePatches?.[shipmentId];
}

export function isSystemRole(roleId: string) {
  return SYSTEM_ROLE_IDS.has(roleId);
}

export function deleteOrgRole(roleId: string): boolean {
  if (isSystemRole(roleId)) return false;
  if (!g.__tsmDeletedRoleIds) g.__tsmDeletedRoleIds = [];
  if (g.__tsmDeletedRoleIds.includes(roleId)) return true;
  g.__tsmDeletedRoleIds.push(roleId);
  logActivity({
    shipmentId: "",
    type: "role.deleted",
    message: roleId,
    timestamp: new Date().toISOString(),
  });
  return true;
}

export function isRoleDeleted(roleId: string) {
  return (g.__tsmDeletedRoleIds ?? []).includes(roleId);
}

export function resendOrgUserInvite(userId: string) {
  if (!g.__tsmOrgUserInviteResends) g.__tsmOrgUserInviteResends = {};
  const lastResentAt = new Date().toISOString();
  const count = (g.__tsmOrgUserInviteResends[userId]?.count ?? 0) + 1;
  g.__tsmOrgUserInviteResends[userId] = { lastResentAt, count };
  logActivity({
    shipmentId: "",
    type: "user.invite_resent",
    message: `${userId} · resend #${count}`,
    timestamp: lastResentAt,
  });
  return { userId, lastResentAt, count };
}

export function getOrgUserInviteResend(userId: string) {
  return g.__tsmOrgUserInviteResends?.[userId];
}

export function createStoredPart(input: {
  sku: string;
  name: string;
  stock?: number;
  reorder?: number;
  location?: string;
}): StoredPart {
  if (!g.__tsmCreatedParts) g.__tsmCreatedParts = [];
  const row: StoredPart = {
    id: `pt-${Date.now().toString(36)}`,
    sku: input.sku.trim().toUpperCase(),
    name: input.name.trim(),
    stock: input.stock ?? 0,
    reorder: input.reorder ?? 4,
    location: input.location?.trim() || "Main depot",
  };
  g.__tsmCreatedParts.unshift(row);
  logActivity({
    shipmentId: "",
    type: "parts.created",
    message: `${row.sku} · ${row.name}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listCreatedParts(): StoredPart[] {
  return [...(g.__tsmCreatedParts ?? [])];
}

export function linkFaultToWorkOrder(faultId: string, workOrderId: string) {
  if (!g.__tsmFaultWorkOrders) g.__tsmFaultWorkOrders = {};
  g.__tsmFaultWorkOrders[faultId] = workOrderId;
  logActivity({
    shipmentId: "",
    type: "fault.work_order_linked",
    message: `${faultId} → ${workOrderId}`,
    timestamp: new Date().toISOString(),
  });
  return workOrderId;
}

export function getFaultWorkOrderId(faultId: string) {
  return g.__tsmFaultWorkOrders?.[faultId];
}

export function recordPlaceGeofenceSync(placeId: string, geofence: string) {
  if (!g.__tsmPlaceGeofenceSyncs) g.__tsmPlaceGeofenceSyncs = {};
  const syncedAt = new Date().toISOString();
  g.__tsmPlaceGeofenceSyncs[placeId] = { geofence, syncedAt };
  logActivity({
    shipmentId: "",
    type: "place.geofence_synced",
    message: `${placeId} · ${geofence}`,
    timestamp: syncedAt,
  });
  return g.__tsmPlaceGeofenceSyncs[placeId];
}

export function getPlaceGeofenceSync(placeId: string) {
  return g.__tsmPlaceGeofenceSyncs?.[placeId];
}
