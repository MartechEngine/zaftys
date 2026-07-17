import { logActivity } from "@/lib/dev-store";
import type { ClientContact, ClientPortalUser, ClientRecord } from "@/lib/clients/client-repository";

const g = globalThis as typeof globalThis & {
  __tsmClientContacts?: ClientContact[];
  __tsmClientUsers?: ClientPortalUser[];
  __tsmClientPatches?: Record<string, Partial<ClientRecord>>;
};

function contactsStore(): ClientContact[] {
  if (!g.__tsmClientContacts) g.__tsmClientContacts = [];
  return g.__tsmClientContacts;
}

function usersStore(): ClientPortalUser[] {
  if (!g.__tsmClientUsers) g.__tsmClientUsers = [];
  return g.__tsmClientUsers;
}

function patches(): Record<string, Partial<ClientRecord>> {
  if (!g.__tsmClientPatches) g.__tsmClientPatches = {};
  return g.__tsmClientPatches;
}

export function listStoredContacts(clientId: string): ClientContact[] {
  return contactsStore().filter((c) => c.clientId === clientId);
}

export function createStoredContact(input: {
  clientId: string;
  name: string;
  role?: string;
  phone?: string;
  email?: string;
}): ClientContact {
  const contact: ClientContact = {
    id: `ct-${Date.now().toString(36)}`,
    clientId: input.clientId,
    name: input.name.trim(),
    role: input.role?.trim() || "Contact",
    phone: input.phone?.trim() || "—",
    email: input.email?.trim() || "—",
  };
  contactsStore().unshift(contact);
  logActivity({
    shipmentId: "",
    type: "contact.created",
    message: `${contact.name} added for client ${input.clientId}`,
    timestamp: new Date().toISOString(),
  });
  return contact;
}

export function listStoredClientUsers(clientId: string): ClientPortalUser[] {
  return usersStore().filter((u) => u.clientId === clientId);
}

export function createStoredClientUser(input: {
  clientId: string;
  name: string;
  email: string;
}): ClientPortalUser {
  const user: ClientPortalUser = {
    id: `cu-${Date.now().toString(36)}`,
    clientId: input.clientId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    status: "pending",
    lastLogin: "—",
  };
  usersStore().unshift(user);
  logActivity({
    shipmentId: "",
    type: "client_user.invited",
    message: `Invite sent to ${user.email}`,
    timestamp: new Date().toISOString(),
  });
  return user;
}

export function getClientPatch(id: string): Partial<ClientRecord> | undefined {
  return patches()[id];
}

export function patchStoredClient(id: string, patch: Partial<ClientRecord>) {
  patches()[id] = { ...patches()[id], ...patch };
  logActivity({
    shipmentId: "",
    type: "client.updated",
    message: `Client ${id} updated`,
    timestamp: new Date().toISOString(),
  });
  return patches()[id];
}
