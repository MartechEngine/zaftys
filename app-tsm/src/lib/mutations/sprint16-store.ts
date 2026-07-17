import { logActivity } from "@/lib/dev-store";

export const ROLE_PERMISSION_MODULES = [
  "dispatch",
  "fleet",
  "billing",
  "settings",
  "reports",
  "documents",
] as const;

export type RolePermissionModule = (typeof ROLE_PERMISSION_MODULES)[number];

export type RolePermissionMap = Record<RolePermissionModule, boolean>;

export const DEFAULT_ROLE_PERMISSIONS: Record<string, RolePermissionMap> = {
  r1: {
    dispatch: true,
    fleet: true,
    billing: true,
    settings: true,
    reports: true,
    documents: true,
  },
  r2: {
    dispatch: true,
    fleet: true,
    billing: false,
    settings: false,
    reports: true,
    documents: true,
  },
  r3: {
    dispatch: false,
    fleet: true,
    billing: false,
    settings: false,
    reports: true,
    documents: true,
  },
  r4: {
    dispatch: false,
    fleet: false,
    billing: false,
    settings: false,
    reports: true,
    documents: true,
  },
};

const g = globalThis as typeof globalThis & {
  __tsmPasswordResets?: Array<{ email: string; completedAt: string }>;
  __tsmRemovedFleetGroupMembers?: Record<string, Array<{ driver: string; vehicle: string }>>;
  __tsmSettingsGroupMemberOps?: Record<string, { added: string[]; removed: string[] }>;
  __tsmRolePermissionPatches?: Record<string, Partial<RolePermissionMap>>;
  __tsmNotificationRecipientPatches?: Record<string, string>;
};

export function recordPasswordResetComplete(email: string) {
  if (!g.__tsmPasswordResets) g.__tsmPasswordResets = [];
  const row = { email: email.trim().toLowerCase(), completedAt: new Date().toISOString() };
  g.__tsmPasswordResets.unshift(row);
  logActivity({
    shipmentId: "",
    type: "auth.password_reset_completed",
    message: row.email,
    timestamp: row.completedAt,
  });
  return row;
}

export function removeFleetGroupMember(
  groupId: string,
  member: { driver: string; vehicle: string },
) {
  if (!g.__tsmRemovedFleetGroupMembers) g.__tsmRemovedFleetGroupMembers = {};
  if (!g.__tsmRemovedFleetGroupMembers[groupId]) {
    g.__tsmRemovedFleetGroupMembers[groupId] = [];
  }
  g.__tsmRemovedFleetGroupMembers[groupId].push({
    driver: member.driver.trim(),
    vehicle: member.vehicle.trim(),
  });
  logActivity({
    shipmentId: "",
    type: "fleet_group.member_removed",
    message: `${groupId} · ${member.driver}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmRemovedFleetGroupMembers[groupId];
}

export function listRemovedFleetGroupMembers(groupId: string) {
  return [...(g.__tsmRemovedFleetGroupMembers?.[groupId] ?? [])];
}

function ensureGroupMemberOps(groupId: string) {
  if (!g.__tsmSettingsGroupMemberOps) g.__tsmSettingsGroupMemberOps = {};
  if (!g.__tsmSettingsGroupMemberOps[groupId]) {
    g.__tsmSettingsGroupMemberOps[groupId] = { added: [], removed: [] };
  }
  return g.__tsmSettingsGroupMemberOps[groupId];
}

export function getSettingsGroupMemberOps(groupId: string) {
  return ensureGroupMemberOps(groupId);
}

export function addSettingsGroupMember(groupId: string, userId: string) {
  const ops = ensureGroupMemberOps(groupId);
  const id = userId.trim();
  if (!ops.added.includes(id)) ops.added.push(id);
  ops.removed = ops.removed.filter((x) => x !== id);
  logActivity({
    shipmentId: "",
    type: "settings_group.member_added",
    message: `${groupId} · ${id}`,
    timestamp: new Date().toISOString(),
  });
  return ops;
}

export function removeSettingsGroupMember(groupId: string, userId: string) {
  const ops = ensureGroupMemberOps(groupId);
  const id = userId.trim();
  if (!ops.removed.includes(id)) ops.removed.push(id);
  ops.added = ops.added.filter((x) => x !== id);
  logActivity({
    shipmentId: "",
    type: "settings_group.member_removed",
    message: `${groupId} · ${id}`,
    timestamp: new Date().toISOString(),
  });
  return ops;
}

export function getRolePermissions(roleId: string): RolePermissionMap {
  const base = DEFAULT_ROLE_PERMISSIONS[roleId] ?? {
    dispatch: false,
    fleet: false,
    billing: false,
    settings: false,
    reports: true,
    documents: true,
  };
  const patch = g.__tsmRolePermissionPatches?.[roleId] ?? {};
  return { ...base, ...patch };
}

export function patchRolePermission(
  roleId: string,
  module: RolePermissionModule,
  enabled: boolean,
) {
  if (!g.__tsmRolePermissionPatches) g.__tsmRolePermissionPatches = {};
  if (!g.__tsmRolePermissionPatches[roleId]) g.__tsmRolePermissionPatches[roleId] = {};
  g.__tsmRolePermissionPatches[roleId][module] = enabled;
  logActivity({
    shipmentId: "",
    type: "role.permission_updated",
    message: `${roleId} · ${module}=${enabled}`,
    timestamp: new Date().toISOString(),
  });
  return getRolePermissions(roleId);
}

export function patchNotificationRecipients(channelId: string, recipients: string) {
  if (!g.__tsmNotificationRecipientPatches) g.__tsmNotificationRecipientPatches = {};
  g.__tsmNotificationRecipientPatches[channelId] = recipients.trim();
  logActivity({
    shipmentId: "",
    type: "notification.recipients_updated",
    message: `${channelId} · ${recipients.trim()}`,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmNotificationRecipientPatches[channelId];
}

export function getNotificationRecipientPatch(channelId: string) {
  return g.__tsmNotificationRecipientPatches?.[channelId];
}
