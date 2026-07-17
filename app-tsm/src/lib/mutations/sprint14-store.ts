import { logActivity } from "@/lib/dev-store";

const g = globalThis as typeof globalThis & {
  __tsmRevokedClientUsers?: Set<string>;
  __tsmContactPatches?: Record<
    string,
    { name?: string; role?: string; phone?: string; email?: string }
  >;
  __tsmDeletedContacts?: Set<string>;
  __tsmSchedulePatches?: Record<
    string,
    { vehicle?: string; trigger?: string; nextDue?: string; type?: string }
  >;
};

export function isClientUserRevoked(id: string) {
  return Boolean(g.__tsmRevokedClientUsers?.has(id));
}

export function revokeClientUser(id: string) {
  if (!g.__tsmRevokedClientUsers) g.__tsmRevokedClientUsers = new Set();
  g.__tsmRevokedClientUsers.add(id);
  logActivity({
    shipmentId: "",
    type: "client_user.revoked",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function getContactPatch(id: string) {
  return g.__tsmContactPatches?.[id];
}

export function patchContactFields(
  id: string,
  patch: { name?: string; role?: string; phone?: string; email?: string },
) {
  if (!g.__tsmContactPatches) g.__tsmContactPatches = {};
  g.__tsmContactPatches[id] = { ...g.__tsmContactPatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "contact.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmContactPatches[id];
}

export function isContactDeleted(id: string) {
  return Boolean(g.__tsmDeletedContacts?.has(id));
}

export function markContactDeleted(id: string) {
  if (!g.__tsmDeletedContacts) g.__tsmDeletedContacts = new Set();
  g.__tsmDeletedContacts.add(id);
  logActivity({
    shipmentId: "",
    type: "contact.deleted",
    message: id,
    timestamp: new Date().toISOString(),
  });
}

export function getSchedulePatch(id: string) {
  return g.__tsmSchedulePatches?.[id];
}

export function patchScheduleFields(
  id: string,
  patch: { vehicle?: string; trigger?: string; nextDue?: string; type?: string },
) {
  if (!g.__tsmSchedulePatches) g.__tsmSchedulePatches = {};
  g.__tsmSchedulePatches[id] = { ...g.__tsmSchedulePatches[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "schedule.updated",
    message: id,
    timestamp: new Date().toISOString(),
  });
  return g.__tsmSchedulePatches[id];
}
