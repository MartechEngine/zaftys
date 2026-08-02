import { demoClients, demoClientUsers, demoContacts } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import {
  fetchAllShipmentsRaw,
  isLiveFleetbaseMode,
} from "@/lib/data/shipment-repository";
import {
  createStoredClient,
  listStoredClients,
  toClientRecord,
} from "@/lib/clients/client-store";
import {
  createStoredContact,
  createStoredClientUser,
  deleteStoredContact,
  getClientPatch,
  listStoredContacts,
  listStoredClientUsers,
  patchStoredClient,
  patchStoredContact,
  revokeStoredClientUser,
} from "@/lib/clients/client-mutations";
import {
  getContactPatch,
  isClientUserRevoked,
  isContactDeleted,
  markContactDeleted,
  patchContactFields,
  revokeClientUser as markClientUserRevoked,
} from "@/lib/mutations/sprint14-store";
import {
  ensureClientsHydrated,
  persistClient,
  persistClientContact,
  persistClientPatch,
  persistClientUser,
} from "@/lib/db/domain-persistence";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import {
  buildFleetbaseClientPayload,
  mapFleetbaseContact,
  type FleetbaseContact,
} from "@/lib/fleetbase/mapper";

/** Alias — Fleetbase customers share the contact field shape we map. */
const mapFleetbaseCustomer = mapFleetbaseContact;

export type ClientRecord = {
  id: string;
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
  activeShipments: number;
  totalShipments: number;
};

export type ClientContact = {
  id: string;
  clientId: string;
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type ClientPortalUser = {
  id: string;
  clientId: string;
  name: string;
  email: string;
  status: "active" | "pending";
  lastLogin: string;
};

export type CreateClientInput = {
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
};

const META_BY_NAME = Object.fromEntries(
  demoSeed(demoClients).map((c) => [
    c.name,
    { id: c.id, gstin: c.gstin, city: c.city, contact: c.contact },
  ]),
);

const ACTIVE_STATUSES = new Set([
  "pending",
  "dispatched",
  "at_plant",
  "in_transit",
  "at_weighbridge",
  "exception",
]);

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function validateCreateClientInput(body: unknown): CreateClientInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return { error: "Company name is required." };
  if (name.length < 2) return { error: "Company name is too short." };

  const gstin = String(data.gstin ?? "").trim().toUpperCase();
  if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) {
    return { error: "GSTIN must be 15 alphanumeric characters." };
  }

  return {
    name,
    gstin: gstin || undefined,
    city: String(data.city ?? "").trim() || undefined,
    contact: String(data.contact ?? "").trim() || undefined,
  };
}

function shipmentCountsByClientName(
  shipments: Awaited<ReturnType<typeof fetchAllShipmentsRaw>>,
) {
  const counts = new Map<string, { active: number; total: number }>();
  for (const s of shipments) {
    const entry = counts.get(s.client) ?? { active: 0, total: 0 };
    entry.total += 1;
    if (ACTIVE_STATUSES.has(s.status)) entry.active += 1;
    counts.set(s.client, entry);
  }
  return counts;
}

async function listClientsFromFleetbase(q?: string): Promise<ClientRecord[]> {
  let raw: unknown[] = [];
  try {
    const result = await getFleetbaseClient().listCustomersOrContacts(100);
    raw = result.rows;
  } catch (e) {
    // Both /customers and /contacts failed — fall back to unique names on live orders
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("[listClients] Fleetbase customers/contacts unavailable, deriving from orders:", msg);
    const shipments = await fetchAllShipmentsRaw();
    const counts = shipmentCountsByClientName(shipments);
    const derived: ClientRecord[] = [...counts.entries()].map(([name, c]) => ({
      id: slugify(name),
      name,
      activeShipments: c.active,
      totalShipments: c.total,
    }));
    derived.sort((a, b) => a.name.localeCompare(b.name));
    if (!q?.trim()) return derived;
    const needle = q.trim().toLowerCase();
    return derived.filter((c) => c.name.toLowerCase().includes(needle));
  }

  const shipments = await fetchAllShipmentsRaw();
  const counts = shipmentCountsByClientName(shipments);

  const clients: ClientRecord[] = raw
    .map((row) => mapFleetbaseCustomer(row as FleetbaseContact))
    .filter((c) => c.id)
    .map((c) => {
      const byName = counts.get(c.name) ?? { active: 0, total: 0 };
      const patch = getClientPatch(c.id);
      return {
        ...c,
        activeShipments: byName.active,
        totalShipments: byName.total,
        ...(patch ?? {}),
        id: c.id,
      };
    });

  // Include shipment-only clients not yet in Fleetbase registry
  for (const [name, c] of counts.entries()) {
    if (!clients.some((x) => x.name === name)) {
      clients.push({
        id: slugify(name),
        name,
        activeShipments: c.active,
        totalShipments: c.total,
      });
    }
  }

  clients.sort((a, b) => a.name.localeCompare(b.name));

  if (!q?.trim()) return clients;
  const needle = q.trim().toLowerCase();
  return clients.filter(
    (c) =>
      c.name.toLowerCase().includes(needle) ||
      c.gstin?.toLowerCase().includes(needle) ||
      c.city?.toLowerCase().includes(needle) ||
      c.contact?.toLowerCase().includes(needle),
  );
}

export async function listClients(q?: string): Promise<ClientRecord[]> {
  await ensureClientsHydrated();

  if (isLiveFleetbaseMode()) {
    return listClientsFromFleetbase(q);
  }

  const shipments = await fetchAllShipmentsRaw();
  const counts = shipmentCountsByClientName(shipments);

  const clients: ClientRecord[] = [...counts.entries()].map(([name, c]) => {
    const meta = META_BY_NAME[name];
    const stored = listStoredClients().find((x) => x.name === name);
    return {
      id: stored?.id ?? meta?.id ?? slugify(name),
      name,
      gstin: stored?.gstin ?? meta?.gstin,
      city: stored?.city ?? meta?.city,
      contact: stored?.contact ?? meta?.contact,
      activeShipments: c.active,
      totalShipments: c.total,
    };
  });

  for (const c of demoSeed(demoClients)) {
    if (!clients.some((x) => x.name === c.name)) {
      clients.push({
        id: c.id,
        name: c.name,
        gstin: c.gstin,
        city: c.city,
        contact: c.contact,
        activeShipments: c.activeShipments,
        totalShipments: 0,
      });
    }
  }

  for (const stored of listStoredClients()) {
    if (!clients.some((x) => x.id === stored.id || x.name === stored.name)) {
      clients.unshift(toClientRecord(stored));
    }
  }

  clients.sort((a, b) => a.name.localeCompare(b.name));

  const withPatches = clients.map((c) => {
    const patch = getClientPatch(c.id);
    return patch ? { ...c, ...patch, id: c.id } : c;
  });

  if (!q?.trim()) return withPatches;

  const needle = q.trim().toLowerCase();
  return withPatches.filter(
    (c) =>
      c.name.toLowerCase().includes(needle) ||
      c.gstin?.toLowerCase().includes(needle) ||
      c.city?.toLowerCase().includes(needle) ||
      c.contact?.toLowerCase().includes(needle),
  );
}

export async function createClient(input: CreateClientInput): Promise<ClientRecord> {
  if (isLiveFleetbaseMode()) {
    try {
      const { row } = await getFleetbaseClient().createCustomerOrContact(
        buildFleetbaseClientPayload(input),
      );
      const mapped = mapFleetbaseCustomer(row as FleetbaseContact);
      if (!mapped.id) {
        throw new Error("Fleetbase did not return a client id.");
      }
      return {
        ...mapped,
        activeShipments: 0,
        totalShipments: 0,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[createClient] Fleetbase live mode failed:", e);
      throw new Error(`Fleetbase unavailable (createClient): ${msg}`);
    }
  }
  await ensureClientsHydrated();
  const existing = (await listClients()).find(
    (c) => c.name.toLowerCase() === input.name.toLowerCase(),
  );
  if (existing) {
    throw new Error(`Client "${input.name}" already exists.`);
  }

  const stored = createStoredClient(input);
  await persistClient(stored);
  return toClientRecord(stored);
}

export async function getClient(id: string): Promise<ClientRecord | undefined> {
  await ensureClientsHydrated();

  if (isLiveFleetbaseMode()) {
    try {
      const raw = await getFleetbaseClient().getCustomerOrContact(id);
      const mapped = mapFleetbaseCustomer(raw as FleetbaseContact);
      if (!mapped.id) return undefined;
      const shipments = await fetchAllShipmentsRaw();
      const counts = shipmentCountsByClientName(shipments).get(mapped.name) ?? {
        active: 0,
        total: 0,
      };
      const patch = getClientPatch(mapped.id);
      return {
        ...mapped,
        activeShipments: counts.active,
        totalShipments: counts.total,
        ...(patch ?? {}),
        id: mapped.id,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) {
        const clients = await listClientsFromFleetbase();
        return clients.find((c) => c.id === id || slugify(c.name) === id);
      }
      console.error("[getClient] Fleetbase live mode failed:", e);
      throw new Error(`Fleetbase unavailable (getClient): ${msg}`);
    }
  }

  const clients = await listClients();
  const client = clients.find((c) => c.id === id || slugify(c.name) === id);
  if (!client) return undefined;
  const patch = getClientPatch(client.id);
  return patch ? { ...client, ...patch, id: client.id } : client;
}

export type PatchClientInput = {
  name?: string;
  gstin?: string;
  city?: string;
  contact?: string;
};

export function validatePatchClientInput(
  body: unknown,
): PatchClientInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const patch: PatchClientInput = {};

  if (data.name !== undefined) {
    const name = String(data.name).trim();
    if (name.length < 2) return { error: "Company name is too short." };
    patch.name = name;
  }
  if (data.gstin !== undefined) {
    const gstin = String(data.gstin).trim().toUpperCase();
    if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) {
      return { error: "GSTIN must be 15 alphanumeric characters." };
    }
    patch.gstin = gstin || undefined;
  }
  if (data.city !== undefined) patch.city = String(data.city).trim() || undefined;
  if (data.contact !== undefined) {
    patch.contact = String(data.contact).trim() || undefined;
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Provide at least one field to update." };
  }
  return patch;
}

export async function patchClient(
  id: string,
  input: PatchClientInput,
): Promise<ClientRecord | undefined> {
  await ensureClientsHydrated();
  const client = await getClient(id);
  if (!client) return undefined;

  if (isLiveFleetbaseMode()) {
    // Prefer Fleetbase write when id looks like a real UUID / public id; always keep local patch overlay.
    try {
      await getFleetbaseClient().updateCustomerOrContact(
        client.id,
        buildFleetbaseClientPayload(input),
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Slug-derived shipment-only clients won't exist in Fleetbase — fall through to local patch.
      if (!/404|not found/i.test(msg)) {
        console.error("[patchClient] Fleetbase live mode failed:", e);
        throw new Error(`Fleetbase unavailable (patchClient): ${msg}`);
      }
    }
  }

  patchStoredClient(client.id, input);
  await persistClientPatch(client.id, input);
  return getClient(client.id);
}

export type CreateContactInput = {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
};

export function validateCreateContactInput(
  body: unknown,
): CreateContactInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return { error: "Contact name is required." };
  return {
    name,
    role: String(data.role ?? "").trim() || undefined,
    phone: String(data.phone ?? "").trim() || undefined,
    email: String(data.email ?? "").trim() || undefined,
  };
}

export async function createClientContact(
  clientId: string,
  input: CreateContactInput,
): Promise<ClientContact | undefined> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return undefined;
  const contact = createStoredContact({ clientId: client.id, ...input });
  await persistClientContact(contact);
  return contact;
}

export type InviteClientUserInput = {
  name: string;
  email: string;
};

export function validateInviteClientUserInput(
  body: unknown,
): InviteClientUserInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim().toLowerCase();
  if (!name) return { error: "Name is required." };
  if (!email || !email.includes("@")) return { error: "Valid email is required." };
  return { name, email };
}

export async function inviteClientUser(
  clientId: string,
  input: InviteClientUserInput,
): Promise<(ClientPortalUser & { invitePath?: string }) | undefined> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return undefined;
  const user = createStoredClientUser({ clientId: client.id, ...input });
  await persistClientUser(user);
  const { createInviteToken } = await import("@/lib/auth/invite-tokens");
  const { invitePath } = await createInviteToken({
    kind: "client_user",
    email: user.email,
    subjectId: user.id,
    clientId: client.id,
  });
  return { ...user, invitePath };
}

export async function listClientShipments(clientName: string, limit = 10) {
  await ensureClientsHydrated();
  const shipments = await fetchAllShipmentsRaw();
  return shipments
    .filter((s) => s.client === clientName)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export async function listClientContacts(clientId: string): Promise<ClientContact[]> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return [];

  const stored = listStoredContacts(client.id);
  const demo = demoSeed(demoContacts).filter((c) => c.clientId === client.id);
  const base =
    demo.length > 0
      ? demo
      : client.contact
        ? [
            {
              id: `primary-${client.id}`,
              clientId: client.id,
              name: client.contact,
              role: "Primary contact",
              phone: "—",
              email: "—",
            } satisfies ClientContact,
          ]
        : [];

  return [...stored, ...base]
    .filter((c) => !isContactDeleted(c.id))
    .map((c) => {
      const patch = getContactPatch(c.id);
      return patch ? { ...c, ...patch } : c;
    });
}

export async function listClientUsers(clientId: string): Promise<ClientPortalUser[]> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return [];
  const stored = listStoredClientUsers(client.id);
  const demo = demoSeed(demoClientUsers).filter((u) => u.clientId === client.id);
  return [...stored, ...demo].map((u) =>
    isClientUserRevoked(u.id)
      ? { ...u, status: "pending" as const, lastLogin: "Revoked" }
      : u,
  );
}

export type PatchContactInput = {
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
};

export function validatePatchContactInput(
  body: unknown,
): ({ contactId: string } & PatchContactInput) | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const contactId = String(data.contactId ?? data.id ?? "").trim();
  if (!contactId) return { error: "contactId is required." };

  const patch: PatchContactInput = {};
  if (data.name !== undefined) {
    const name = String(data.name).trim();
    if (!name) return { error: "Contact name cannot be empty." };
    patch.name = name;
  }
  if (data.role !== undefined) patch.role = String(data.role).trim() || undefined;
  if (data.phone !== undefined) patch.phone = String(data.phone).trim() || undefined;
  if (data.email !== undefined) patch.email = String(data.email).trim() || undefined;

  if (Object.keys(patch).length === 0) {
    return { error: "Provide at least one field to update." };
  }
  return { contactId, ...patch };
}

export async function patchClientContact(
  clientId: string,
  contactId: string,
  input: PatchContactInput,
): Promise<ClientContact | undefined> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return undefined;

  const contacts = await listClientContacts(clientId);
  const existing = contacts.find((c) => c.id === contactId);
  if (!existing) return undefined;

  const stored = patchStoredContact(contactId, input);
  if (stored) {
    await persistClientContact(stored);
    return stored;
  }

  patchContactFields(contactId, input);
  const merged = { ...existing, ...input };
  await persistClientContact(merged);
  return merged;
}

export async function deleteClientContact(
  clientId: string,
  contactId: string,
): Promise<boolean> {
  const client = await getClient(clientId);
  if (!client) return false;

  const contacts = await listClientContacts(clientId);
  if (!contacts.some((c) => c.id === contactId)) return false;

  deleteStoredContact(contactId);
  markContactDeleted(contactId);
  return true;
}

export async function resendClientPortalUserInvite(
  clientId: string,
  userId: string,
): Promise<
  (ClientPortalUser & { lastResentAt?: string; resentCount?: number; invitePath?: string }) | undefined
> {
  const client = await getClient(clientId);
  if (!client) return undefined;

  const users = await listClientUsers(clientId);
  const existing = users.find((u) => u.id === userId);
  if (!existing) return undefined;
  if (existing.status !== "pending" || isClientUserRevoked(userId)) return undefined;

  const { resendClientUserInvite } = await import("@/lib/mutations/sprint19-store");
  const { lastResentAt, count } = resendClientUserInvite(userId);
  const { createInviteToken } = await import("@/lib/auth/invite-tokens");
  const { invitePath } = await createInviteToken({
    kind: "client_user",
    email: existing.email,
    subjectId: existing.id,
    clientId: client.id,
  });
  return { ...existing, lastResentAt, resentCount: count, invitePath };
}

export async function getClientPortalUserResendMeta(userId: string) {
  const { getClientUserInviteResend } = await import("@/lib/mutations/sprint19-store");
  return getClientUserInviteResend(userId);
}

export async function revokeClientPortalUser(
  clientId: string,
  userId: string,
): Promise<ClientPortalUser | undefined> {
  await ensureClientsHydrated();
  const client = await getClient(clientId);
  if (!client) return undefined;

  const users = await listClientUsers(clientId);
  const existing = users.find((u) => u.id === userId);
  if (!existing) return undefined;
  if (isClientUserRevoked(userId)) return existing;

  const stored = revokeStoredClientUser(userId);
  markClientUserRevoked(userId);
  const result = stored ?? { ...existing, status: "pending" as const, lastLogin: "Revoked" };
  await persistClientUser(result);
  return result;
}
