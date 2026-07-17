import { logActivity } from "@/lib/dev-store";

export type StoredFleetGroupMember = {
  driver: string;
  vehicle: string;
};

export type StoredLedgerAccount = {
  id: string;
  code: string;
  name: string;
  type: "Income" | "Expense" | "Asset" | "Liability";
  balance: string;
  balanceInr: number;
};

const g = globalThis as typeof globalThis & {
  __tsmDeletedGeofences?: Set<string>;
  __tsmReportSchedulePatches?: Record<string, { cadence?: string; recipients?: string }>;
  __tsmFleetGroupMembers?: Record<string, StoredFleetGroupMember[]>;
  __tsmFleetbaseHealth?: { checkedAt: string; latencyMs: number; reachable: boolean };
  __tsmPasswordResetRequests?: Array<{ email: string; requestedAt: string }>;
  __tsmLedgerAccounts?: StoredLedgerAccount[];
};

export function isGeofenceDeleted(id: string) {
  return Boolean(g.__tsmDeletedGeofences?.has(id));
}

export function markGeofenceDeleted(id: string) {
  if (!g.__tsmDeletedGeofences) g.__tsmDeletedGeofences = new Set();
  g.__tsmDeletedGeofences.add(id);
  logActivity({
    shipmentId: "",
    type: "geofence.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function getReportSchedulePatch(id: string) {
  return g.__tsmReportSchedulePatches?.[id];
}

export function patchReportScheduleFields(
  id: string,
  patch: { cadence?: string; recipients?: string },
) {
  if (!g.__tsmReportSchedulePatches) g.__tsmReportSchedulePatches = {};
  g.__tsmReportSchedulePatches[id] = { ...g.__tsmReportSchedulePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "report_schedule.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmReportSchedulePatches[id];
}

export function listFleetGroupMembers(groupId: string): StoredFleetGroupMember[] {
  return [...(g.__tsmFleetGroupMembers?.[groupId] ?? [])];
}

export function addFleetGroupMember(groupId: string, member: StoredFleetGroupMember) {
  if (!g.__tsmFleetGroupMembers) g.__tsmFleetGroupMembers = {};
  if (!g.__tsmFleetGroupMembers[groupId]) g.__tsmFleetGroupMembers[groupId] = [];
  g.__tsmFleetGroupMembers[groupId].push({
    driver: member.driver.trim(),
    vehicle: member.vehicle.trim(),
  });
  logActivity({
    shipmentId: "",
    type: "fleet_group.member_added",
    message: `${groupId} · ${member.driver}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmFleetGroupMembers[groupId];
}

export function recordFleetbaseHealthCheck(reachable: boolean, latencyMs: number) {
  g.__tsmFleetbaseHealth = {
    checkedAt: new Date().toISOString(),
    latencyMs,
    reachable,
  };
  logActivity({
    shipmentId: "",
    type: "fleetbase.health_check",
    message: reachable ? `${latencyMs}ms · ok` : "unreachable",
    timestamp: g.__tsmFleetbaseHealth.checkedAt,
  });
  return g.__tsmFleetbaseHealth;
}

export function getFleetbaseHealthCheck() {
  return g.__tsmFleetbaseHealth;
}

export function recordPasswordResetRequest(email: string) {
  if (!g.__tsmPasswordResetRequests) g.__tsmPasswordResetRequests = [];
  const row = { email: email.trim().toLowerCase(), requestedAt: new Date().toISOString() };
  g.__tsmPasswordResetRequests.unshift(row);
  logActivity({
    shipmentId: "",
    type: "auth.password_reset_requested",
    message: row.email,
    timestamp: row.requestedAt,
  });
  return row;
}

export function listStoredLedgerAccounts(): StoredLedgerAccount[] {
  if (!g.__tsmLedgerAccounts) g.__tsmLedgerAccounts = [];
  return [...g.__tsmLedgerAccounts];
}

export function createStoredLedgerAccount(input: {
  code: string;
  name: string;
  type: StoredLedgerAccount["type"];
  balanceInr?: number;
}): StoredLedgerAccount {
  if (!g.__tsmLedgerAccounts) g.__tsmLedgerAccounts = [];
  const balanceInr = input.balanceInr ?? 0;
  const row: StoredLedgerAccount = {
    id: `la-${Date.now().toString(36)}`,
    code: input.code.trim(),
    name: input.name.trim(),
    type: input.type,
    balanceInr,
    balance: balanceInr > 0 ? `₹${balanceInr.toLocaleString("en-IN")}` : "₹0",
  };
  g.__tsmLedgerAccounts.unshift(row);
  logActivity({
    shipmentId: "",
    type: "ledger_account.created",
    message: `${row.code} · ${row.name}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}
