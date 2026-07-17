import { demoClients, demoClientUsers, demoContacts } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import {
  createStoredClient,
  listStoredClients,
  toClientRecord,
} from "@/lib/clients/client-store";
import {
  createStoredContact,
  createStoredClientUser,
  getClientPatch,
  listStoredContacts,
  listStoredClientUsers,
  patchStoredClient,
} from "@/lib/clients/client-mutations";

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
  demoClients.map((c) => [
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

export async function listClients(q?: string): Promise<ClientRecord[]> {
  const shipments = await fetchAllShipmentsRaw();
  const counts = new Map<string, { active: number; total: number }>();

  for (const s of shipments) {
    const entry = counts.get(s.client) ?? { active: 0, total: 0 };
    entry.total += 1;
    if (ACTIVE_STATUSES.has(s.status)) entry.active += 1;
    counts.set(s.client, entry);
  }

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

  for (const c of demoClients) {
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
  const existing = (await listClients()).find(
    (c) => c.name.toLowerCase() === input.name.toLowerCase(),
  );
  if (existing) {
    throw new Error(`Client "${input.name}" already exists.`);
  }

  return toClientRecord(createStoredClient(input));
}

export async function getClient(id: string): Promise<ClientRecord | undefined> {
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
  const client = await getClient(id);
  if (!client) return undefined;
  patchStoredClient(client.id, input);
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
  const client = await getClient(clientId);
  if (!client) return undefined;
  return createStoredContact({ clientId: client.id, ...input });
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
): Promise<ClientPortalUser | undefined> {
  const client = await getClient(clientId);
  if (!client) return undefined;
  return createStoredClientUser({ clientId: client.id, ...input });
}

export async function listClientShipments(clientName: string, limit = 10) {
  const shipments = await fetchAllShipmentsRaw();
  return shipments
    .filter((s) => s.client === clientName)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export async function listClientContacts(clientId: string): Promise<ClientContact[]> {
  const client = await getClient(clientId);
  if (!client) return [];

  const stored = listStoredContacts(client.id);
  const demo = demoContacts.filter((c) => c.clientId === client.id);
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

  return [...stored, ...base];
}

export async function listClientUsers(clientId: string): Promise<ClientPortalUser[]> {
  const client = await getClient(clientId);
  if (!client) return [];
  const stored = listStoredClientUsers(client.id);
  const demo = demoClientUsers.filter((u) => u.clientId === client.id);
  return [...stored, ...demo];
}
