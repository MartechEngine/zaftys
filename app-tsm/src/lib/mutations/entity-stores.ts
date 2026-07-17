import { logActivity } from "@/lib/dev-store";

export type StoredSchedule = {
  id: string;
  vehicle: string;
  trigger: string;
  nextDue: string;
  type: string;
};

export type StoredFleetGroup = {
  id: string;
  name: string;
  drivers: number;
  vehicles: number;
  zone: string;
};

export type StoredOrgUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending";
};

export type StoredRole = {
  id: string;
  name: string;
  users: number;
  type: "org" | "system";
};

export type StoredSettingsGroup = {
  id: string;
  name: string;
  members: number;
  policy: string;
};

export type StoredPartner = {
  id: string;
  name: string;
  verified: boolean;
  trips: number;
  onTime: string;
  rating: number;
  activeAssignments: number;
};

export type StoredConfigPatch = Record<string, Record<string, unknown>>;

const g = globalThis as typeof globalThis & {
  __tsmSchedules?: StoredSchedule[];
  __tsmFleetGroups?: StoredFleetGroup[];
  __tsmOrgUsers?: StoredOrgUser[];
  __tsmRoles?: StoredRole[];
  __tsmSettingsGroups?: StoredSettingsGroup[];
  __tsmPartners?: StoredPartner[];
  __tsmConfigPatches?: StoredConfigPatch;
  __tsmOrchestratorRuns?: Array<{ id: string; at: string; status: string }>;
  __tsmInviteResends?: Record<string, number>;
};

export function listStoredSchedules(): StoredSchedule[] {
  if (!g.__tsmSchedules) g.__tsmSchedules = [];
  return [...g.__tsmSchedules];
}

export function replaceStoredSchedules(items: StoredSchedule[]) {
  g.__tsmSchedules = [...items];
}

export function createStoredSchedule(input: {
  vehicle: string;
  trigger: string;
  nextDue?: string;
  type?: string;
}): StoredSchedule {
  if (!g.__tsmSchedules) g.__tsmSchedules = [];
  const row: StoredSchedule = {
    id: `ms-${Date.now().toString(36)}`,
    vehicle: input.vehicle.trim(),
    trigger: input.trigger.trim(),
    nextDue: input.nextDue?.trim() || "Next 30 days",
    type: input.type?.trim() || "Service",
  };
  g.__tsmSchedules.unshift(row);
  logActivity({
    shipmentId: "",
    type: "schedule.created",
    message: `${row.type} · ${row.vehicle}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function patchStoredSchedule(
  id: string,
  patch: Partial<Pick<StoredSchedule, "vehicle" | "trigger" | "nextDue" | "type">>,
): StoredSchedule | undefined {
  if (!g.__tsmSchedules) return undefined;
  const row = g.__tsmSchedules.find((s) => s.id === id);
  if (!row) return undefined;
  Object.assign(row, patch);
  logActivity({
    shipmentId: "",
    type: "schedule.updated",
    message: `${row.type} · ${row.vehicle}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listStoredFleetGroups(): StoredFleetGroup[] {
  if (!g.__tsmFleetGroups) g.__tsmFleetGroups = [];
  return [...g.__tsmFleetGroups];
}

export function createStoredFleetGroup(input: {
  name: string;
  zone?: string;
}): StoredFleetGroup {
  if (!g.__tsmFleetGroups) g.__tsmFleetGroups = [];
  const row: StoredFleetGroup = {
    id: `fg-${Date.now().toString(36)}`,
    name: input.name.trim(),
    drivers: 0,
    vehicles: 0,
    zone: input.zone?.trim() || "All India",
  };
  g.__tsmFleetGroups.unshift(row);
  logActivity({
    shipmentId: "",
    type: "fleet_group.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function patchStoredFleetGroup(
  id: string,
  patch: { name?: string; zone?: string },
): StoredFleetGroup | null {
  if (!g.__tsmFleetGroups) return null;
  const row = g.__tsmFleetGroups.find((item) => item.id === id);
  if (!row) return null;
  if (patch.name !== undefined) row.name = patch.name.trim();
  if (patch.zone !== undefined) row.zone = patch.zone.trim();
  logActivity({
    shipmentId: "",
    type: "fleet_group.updated",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listStoredOrgUsers(): StoredOrgUser[] {
  if (!g.__tsmOrgUsers) g.__tsmOrgUsers = [];
  return [...g.__tsmOrgUsers];
}

export function replaceStoredOrgUsers(items: StoredOrgUser[]) {
  g.__tsmOrgUsers = [...items];
}

export function inviteStoredOrgUser(input: {
  name: string;
  email: string;
  role?: string;
}): StoredOrgUser {
  if (!g.__tsmOrgUsers) g.__tsmOrgUsers = [];
  const row: StoredOrgUser = {
    id: `ou-${Date.now().toString(36)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    role: input.role?.trim() || "Dispatcher",
    status: "pending",
  };
  g.__tsmOrgUsers.unshift(row);
  logActivity({
    shipmentId: "",
    type: "user.invited",
    message: `${row.email} · ${row.role}`,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listStoredRoles(): StoredRole[] {
  if (!g.__tsmRoles) g.__tsmRoles = [];
  return [...g.__tsmRoles];
}

export function replaceStoredRoles(items: StoredRole[]) {
  g.__tsmRoles = [...items];
}

export function createStoredRole(input: {
  name: string;
}): StoredRole {
  if (!g.__tsmRoles) g.__tsmRoles = [];
  const row: StoredRole = {
    id: `role-${Date.now().toString(36)}`,
    name: input.name.trim(),
    users: 0,
    type: "org",
  };
  g.__tsmRoles.unshift(row);
  logActivity({
    shipmentId: "",
    type: "role.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function patchStoredRole(id: string, patch: { name?: string }): StoredRole | null {
  if (!g.__tsmRoles) return null;
  const row = g.__tsmRoles.find((r) => r.id === id);
  if (!row) return null;
  if (patch.name !== undefined) row.name = patch.name.trim();
  logActivity({
    shipmentId: "",
    type: "role.updated",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listStoredSettingsGroups(): StoredSettingsGroup[] {
  if (!g.__tsmSettingsGroups) g.__tsmSettingsGroups = [];
  return [...g.__tsmSettingsGroups];
}

export function replaceStoredSettingsGroups(items: StoredSettingsGroup[]) {
  g.__tsmSettingsGroups = [...items];
}

export function createStoredSettingsGroup(input: {
  name: string;
  policy?: string;
}): StoredSettingsGroup {
  if (!g.__tsmSettingsGroups) g.__tsmSettingsGroups = [];
  const row: StoredSettingsGroup = {
    id: `sg-${Date.now().toString(36)}`,
    name: input.name.trim(),
    members: 0,
    policy: input.policy?.trim() || "Dispatcher",
  };
  g.__tsmSettingsGroups.unshift(row);
  logActivity({
    shipmentId: "",
    type: "settings_group.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function patchStoredSettingsGroup(
  id: string,
  patch: { name?: string; policy?: string },
): StoredSettingsGroup | null {
  if (!g.__tsmSettingsGroups) return null;
  const row = g.__tsmSettingsGroups.find((item) => item.id === id);
  if (!row) return null;
  if (patch.name !== undefined) row.name = patch.name.trim();
  if (patch.policy !== undefined) row.policy = patch.policy.trim();
  logActivity({
    shipmentId: "",
    type: "settings_group.updated",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function listStoredPartners(): StoredPartner[] {
  if (!g.__tsmPartners) g.__tsmPartners = [];
  return [...g.__tsmPartners];
}

export function createStoredPartner(input: {
  name: string;
}): StoredPartner {
  if (!g.__tsmPartners) g.__tsmPartners = [];
  const row: StoredPartner = {
    id: `pt-${Date.now().toString(36)}`,
    name: input.name.trim(),
    verified: false,
    trips: 0,
    onTime: "—",
    rating: 0,
    activeAssignments: 0,
  };
  g.__tsmPartners.unshift(row);
  logActivity({
    shipmentId: "",
    type: "partner.created",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function verifyStoredPartner(id: string): StoredPartner | null {
  if (!g.__tsmPartners) return null;
  const row = g.__tsmPartners.find((p) => p.id === id);
  if (!row) return null;
  row.verified = true;
  logActivity({
    shipmentId: "",
    type: "partner.verified",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}

export function getConfigPatches(): StoredConfigPatch {
  if (!g.__tsmConfigPatches) g.__tsmConfigPatches = {};
  return g.__tsmConfigPatches;
}

export function getConfigPatchesSnapshot(): StoredConfigPatch {
  return { ...(g.__tsmConfigPatches ?? {}) };
}

export function replaceConfigPatches(next: StoredConfigPatch) {
  g.__tsmConfigPatches = { ...next };
}

export function patchConfigSection(
  section: string,
  values: Record<string, unknown>,
): Record<string, unknown> {
  const store = getConfigPatches();
  store[section] = { ...store[section], ...values };
  logActivity({
    shipmentId: "",
    type: "config.updated",
    message: `Settings · ${section}`,
    timestamp: new Date().toISOString(),
  });
  return store[section];
}

export function recordOrchestratorRun(): {
  id: string;
  at: string;
  status: string;
} {
  if (!g.__tsmOrchestratorRuns) g.__tsmOrchestratorRuns = [];
  const run = {
    id: `run-${Date.now().toString(36)}`,
    at: new Date().toISOString(),
    status: "completed",
  };
  g.__tsmOrchestratorRuns.unshift(run);
  logActivity({
    shipmentId: "",
    type: "orchestrator.run",
    message: `Pipeline run ${run.id}`,
    timestamp: new Date().toISOString(),
  });
  return run;
}

export function listOrchestratorRuns() {
  if (!g.__tsmOrchestratorRuns) g.__tsmOrchestratorRuns = [];
  return [...g.__tsmOrchestratorRuns];
}

export function resendDriverInvite(driverId: string): { resentAt: string; count: number } {
  if (!g.__tsmInviteResends) g.__tsmInviteResends = {};
  g.__tsmInviteResends[driverId] = (g.__tsmInviteResends[driverId] ?? 0) + 1;
  const resentAt = new Date().toISOString();
  logActivity({
    shipmentId: "",
    type: "navigator.invite_resent",
    message: `Resent invite to driver ${driverId}`,
    timestamp: resentAt,
  });
  return { resentAt, count: g.__tsmInviteResends[driverId] };
}
