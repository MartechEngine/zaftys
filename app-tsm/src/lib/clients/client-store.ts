import { logActivity } from "@/lib/dev-store";

export type StoredClient = {
  id: string;
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
  createdAt: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevClients?: StoredClient[];
};

function getClientStore(): StoredClient[] {
  if (!g.__tsmDevClients) g.__tsmDevClients = [];
  return g.__tsmDevClients;
}

export function listStoredClients(): StoredClient[] {
  return [...getClientStore()];
}

export function createStoredClient(input: {
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
}): StoredClient {
  const store = getClientStore();
  const id = `c-${Date.now().toString(36)}`;
  const client: StoredClient = {
    id,
    name: input.name.trim(),
    gstin: input.gstin?.trim() || undefined,
    city: input.city?.trim() || undefined,
    contact: input.contact?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  store.unshift(client);
  logActivity({
    shipmentId: "",
    type: "client.created",
    message: `${client.name} added to client registry`,
    timestamp: client.createdAt,
  });
  return client;
}

export function toClientRecord(c: StoredClient) {
  return {
    id: c.id,
    name: c.name,
    gstin: c.gstin,
    city: c.city,
    contact: c.contact,
    activeShipments: 0,
    totalShipments: 0,
  };
}
