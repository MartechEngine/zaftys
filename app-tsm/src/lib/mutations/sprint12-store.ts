import { logActivity } from "@/lib/dev-store";
import type { AutomationRuleRecord } from "@/lib/settings/automation-repository";

const g = globalThis as typeof globalThis & {
  __tsmOrgLogo?: string;
  __tsmFleetbaseKeyMask?: string;
  __tsmPasswordChangedAt?: string;
  __tsmFleetGroupPatches?: Record<string, { name?: string; zone?: string }>;
  __tsmFuelProviderStatus?: Record<string, "connected" | "disconnected">;
  __tsmTelematicsPings?: Record<string, string>;
  __tsmStoredAutomation?: AutomationRuleRecord[];
  __tsmOrderTypeNamePatches?: Record<string, string>;
  __tsmDeletedWebhooks?: Set<string>;
  __tsmDevicePatches?: Record<string, { vehicle?: string; vehicleId?: string }>;
};

export function getOrgLogoFilename() {
  return g.__tsmOrgLogo;
}

export function setOrgLogoFilename(name: string) {
  g.__tsmOrgLogo = name.trim() || "zaftys-logo.png";
  logActivity({
    shipmentId: "",
    type: "org.logo_uploaded",
    message: g.__tsmOrgLogo,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmOrgLogo;
}

export function getFleetbaseKeyMask() {
  return g.__tsmFleetbaseKeyMask;
}

export function rotateFleetbaseKeyMask() {
  const suffix = Date.now().toString(36).slice(-4);
  g.__tsmFleetbaseKeyMask = `••••••••••••${suffix}`;
  logActivity({
    shipmentId: "",
    type: "fleetbase.key_rotated",
    message: "API key rotated (local stub)",
    timestamp: new Date().toISOString(),
  });
  return g.__tsmFleetbaseKeyMask;
}

export function recordPasswordChange() {
  g.__tsmPasswordChangedAt = new Date().toISOString();
  logActivity({
    shipmentId: "",
    type: "profile.password_changed",
    message: "Password updated (local stub)",
    timestamp: new Date().toISOString(),
  });
  return { changedAt: g.__tsmPasswordChangedAt };
}

export function getFleetGroupPatch(id: string) {
  return g.__tsmFleetGroupPatches?.[id];
}

export function patchFleetGroupFields(id: string, patch: { name?: string; zone?: string }) {
  if (!g.__tsmFleetGroupPatches) g.__tsmFleetGroupPatches = {};
  g.__tsmFleetGroupPatches[id] = { ...g.__tsmFleetGroupPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "fleet_group.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmFleetGroupPatches[id];
}

export function getFuelProviderStatus(id: string) {
  return g.__tsmFuelProviderStatus?.[id];
}

export function setFuelProviderStatus(id: string, status: "connected" | "disconnected") {
  if (!g.__tsmFuelProviderStatus) g.__tsmFuelProviderStatus = {};
  g.__tsmFuelProviderStatus[id] = status;
  logActivity({
    shipmentId: "",
    type: "fuel_provider.updated",
    message: `${id} · ${status}`,
    timestamp: new Date().toISOString(),
  });
  return status;
}

export function getTelematicsPing(id: string) {
  return g.__tsmTelematicsPings?.[id];
}

export function recordTelematicsPing(id: string) {
  if (!g.__tsmTelematicsPings) g.__tsmTelematicsPings = {};
  g.__tsmTelematicsPings[id] = "Just now";
  logActivity({
    shipmentId: "",
    type: "telematics.tested",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmTelematicsPings[id];
}

export function listStoredAutomationRules(): AutomationRuleRecord[] {
  if (!g.__tsmStoredAutomation) g.__tsmStoredAutomation = [];
  return [...g.__tsmStoredAutomation];
}

export function createStoredAutomationRule(input: {
  trigger: string;
  action: string;
}): AutomationRuleRecord {
  if (!g.__tsmStoredAutomation) g.__tsmStoredAutomation = [];
  const row: AutomationRuleRecord = {
    id: `ar-${Date.now().toString(36)}`,
    trigger: input.trigger.trim(),
    action: input.action.trim(),
    enabled: true,
    matchCount: 0,
  };
  g.__tsmStoredAutomation.unshift(row);
  logActivity({
    shipmentId: "",
    type: "automation.created",
    message: row.trigger,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function getOrderTypeNamePatch(id: string) {
  return g.__tsmOrderTypeNamePatches?.[id];
}

export function patchOrderTypeName(id: string, name: string) {
  if (!g.__tsmOrderTypeNamePatches) g.__tsmOrderTypeNamePatches = {};
  g.__tsmOrderTypeNamePatches[id] = name.trim();
  logActivity({
    shipmentId: "",
    type: "order_type.renamed",
    message: `${id} · ${name}`,
    timestamp: new Date().toISOString(),
  });
  return name.trim();
}

export function isWebhookDeleted(id: string) {
  return Boolean(g.__tsmDeletedWebhooks?.has(id));
}

export function markWebhookDeleted(id: string) {
  if (!g.__tsmDeletedWebhooks) g.__tsmDeletedWebhooks = new Set();
  g.__tsmDeletedWebhooks.add(id);
  logActivity({
    shipmentId: "",
    type: "webhook.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function getDevicePatch(id: string) {
  return g.__tsmDevicePatches?.[id];
}

export function patchDeviceFields(id: string, patch: { vehicle?: string; vehicleId?: string }) {
  if (!g.__tsmDevicePatches) g.__tsmDevicePatches = {};
  g.__tsmDevicePatches[id] = { ...g.__tsmDevicePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "device.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmDevicePatches[id];
}
