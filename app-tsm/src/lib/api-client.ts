import type { ShipmentRecord, Driver, Vehicle } from "./dev-store";
import type { CreateShipmentInput } from "./shipments/create-shipment";
import type { OverflowLoad } from "./network/overflow-store";

const base = "";

async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? "Request failed");
  return json.data as T;
}

export type ShipmentTabCounts = {
  all: number;
  active: number;
  completed: number;
  exceptions: number;
};

export type ActivityEvent = {
  id: string;
  shipmentId: string;
  type: string;
  message: string;
  timestamp: string;
};

export type ShipmentNote = {
  id: string;
  shipmentId: string;
  author: string;
  body: string;
  createdAt: string;
};

export type ClientRecord = {
  id: string;
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
  activeShipments: number;
  totalShipments: number;
};

async function fetchApiWithMeta<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T; meta?: { counts?: ShipmentTabCounts; total?: number } }> {
  const res = await fetch(`${base}${path}`, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? "Request failed");
  return json;
}

export const api = {
  getShipments: (params?: { tab?: string; q?: string }) => {
    const sp = new URLSearchParams();
    if (params?.tab && params.tab !== "all") sp.set("tab", params.tab);
    if (params?.q?.trim()) sp.set("q", params.q.trim());
    const qs = sp.toString();
    return fetchApiWithMeta<ShipmentRecord[]>(`/api/shipments${qs ? `?${qs}` : ""}`).then(
      (r) => r.data,
    );
  },

  getShipmentsWithMeta: (params?: { tab?: string; q?: string }) => {
    const sp = new URLSearchParams();
    if (params?.tab && params.tab !== "all") sp.set("tab", params.tab);
    if (params?.q?.trim()) sp.set("q", params.q.trim());
    const qs = sp.toString();
    return fetchApiWithMeta<ShipmentRecord[]>(`/api/shipments${qs ? `?${qs}` : ""}`);
  },

  createShipment: (input: CreateShipmentInput) =>
    fetchApi<ShipmentRecord>("/api/shipments", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getShipment: (id: string) => fetchApi<ShipmentRecord>(`/api/shipments/${id}`),

  getShipmentActivity: (id: string) =>
    fetchApi<ActivityEvent[]>(`/api/shipments/${id}/activity`),

  getShipmentNotes: (id: string) =>
    fetchApi<ShipmentNote[]>(`/api/shipments/${id}/notes`),

  addShipmentNote: (id: string, body: string) =>
    fetchApi<ShipmentNote>(`/api/shipments/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),

  getClients: (q?: string) => {
    const sp = new URLSearchParams();
    if (q?.trim()) sp.set("q", q.trim());
    const qs = sp.toString();
    return fetchApi<ClientRecord[]>(`/api/clients${qs ? `?${qs}` : ""}`);
  },

  getClient: (id: string) =>
    fetchApi<{ client: ClientRecord; recentShipments: ShipmentRecord[] }>(
      `/api/clients/${id}`,
    ),

  getClientContacts: (id: string) =>
    fetchApi<
      {
        id: string;
        clientId: string;
        name: string;
        role: string;
        phone: string;
        email: string;
      }[]
    >(`/api/clients/${id}/contacts`),

  getClientUsers: (id: string) =>
    fetchApi<
      {
        id: string;
        clientId: string;
        name: string;
        email: string;
        status: "active" | "pending";
        lastLogin: string;
      }[]
    >(`/api/clients/${id}/users`),

  createClient: (input: {
    name: string;
    gstin?: string;
    city?: string;
    contact?: string;
  }) =>
    fetchApi<ClientRecord>("/api/clients", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  patchClient: (
    id: string,
    input: { name?: string; gstin?: string; city?: string; contact?: string },
  ) =>
    fetchApi<ClientRecord>(`/api/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  createClientContact: (
    id: string,
    input: { name: string; role?: string; phone?: string; email?: string },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/clients/${id}/contacts`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  inviteClientUser: (id: string, input: { name: string; email: string }) =>
    fetchApi<{ id: string; email: string }>(`/api/clients/${id}/users`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createInvoice: (input: {
    client: string;
    description: string;
    subtotalInr: number;
    dueDays?: number;
  }) =>
    fetchApi<{ id: string; number: string }>("/api/billing/invoices", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createOrderType: (name: string) =>
    fetchApi<{ id: string; name: string }>("/api/settings/order-types", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  createOrderTypeField: (
    id: string,
    input: {
      name: string;
      type: "text" | "number" | "file" | "signature" | "currency" | "percent";
      required?: boolean;
    },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/settings/order-types/${id}/fields`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createWebhook: (input: { url: string; events?: string }) =>
    fetchApi<{ id: string; url: string }>("/api/integrations/webhooks", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createDevice: (input: { imei: string; vehicle: string; provider?: string }) =>
    fetchApi<{ id: string; imei: string }>("/api/integrations/devices", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createTelematicsProvider: (name: string) =>
    fetchApi<{ id: string; name: string }>("/api/integrations/telematics", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  createMaintenanceSchedule: (input: {
    vehicle: string;
    trigger: string;
    nextDue?: string;
    type?: string;
  }) =>
    fetchApi<{ id: string; vehicle: string }>("/api/maintenance/schedules", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createFleetGroup: (input: { name: string; zone?: string }) =>
    fetchApi<{ id: string; name: string }>("/api/fleet/groups", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createPartner: (name: string) =>
    fetchApi<{ id: string; name: string }>("/api/network/partners", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  inviteOrgUser: (input: { name: string; email: string; role?: string }) =>
    fetchApi<{ id: string; email: string }>("/api/settings/users", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createRole: (name: string) =>
    fetchApi<{ id: string; name: string }>("/api/settings/roles", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  createSettingsGroup: (input: { name: string; policy?: string }) =>
    fetchApi<{ id: string; name: string }>("/api/settings/groups", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  runOrchestrator: () =>
    fetchApi<{
      run: { id: string; at: string; status: string };
      proposal: unknown;
    }>("/api/dispatch/orchestrator", { method: "POST" }),

  patchSettingsConfig: (section: string, values: Record<string, unknown>) =>
    fetchApi<{ section: string; values: Record<string, unknown> }>(
      "/api/settings/config",
      {
        method: "PATCH",
        body: JSON.stringify({ section, values }),
      },
    ),

  resendDriverInvite: (id: string) =>
    fetchApi<{ driverId: string; lastResentAt?: string }>(
      `/api/fleet/drivers/${id}/invite`,
      { method: "POST" },
    ),

  createQuote: (input: {
    client: string;
    origin: string;
    destination: string;
    tonnage: number;
    rateInr?: number;
    status?: "sent" | "draft";
  }) =>
    fetchApi<{
      id: string;
      client: string;
      route: string;
      tonnage: number;
      rate: string;
      status: string;
    }>("/api/shipments/quotes", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateQuoteStatus: (id: string, status: "sent" | "draft" | "accepted") =>
    fetchApi<{ id: string; status: string }>(`/api/shipments/quotes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  setAutomationRuleEnabled: (id: string, enabled: boolean) =>
    fetchApi<{ id: string; enabled: boolean }>("/api/settings/automation", {
      method: "PATCH",
      body: JSON.stringify({ id, enabled }),
    }),

  createServiceRate: (input: {
    name: string;
    basis: string;
    rate: string;
    minCharge?: string;
  }) =>
    fetchApi<{ id: string; name: string }>("/api/billing/rates", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createVendor: (input: {
    name: string;
    type: string;
    city: string;
    contact: string;
  }) =>
    fetchApi<{ id: string; name: string }>("/api/vendors", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createWorkOrder: (input: {
    vehicle: string;
    title: string;
    vendor: string;
    due?: string;
    cost?: string;
    notes?: string;
  }) =>
    fetchApi<{ id: string; title: string }>("/api/maintenance/work-orders", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateWorkOrderStatus: (
    id: string,
    status: "open" | "in_progress" | "resolved",
  ) =>
    fetchApi<{ id: string; status: string }>(`/api/maintenance/work-orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  updateFaultStatus: (id: string, status: "open" | "linked" | "resolved") =>
    fetchApi<{ id: string; status: string }>("/api/maintenance/faults", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    }),

  createPlace: (input: {
    name: string;
    type: string;
    city: string;
    geofence?: string;
  }) =>
    fetchApi<{ id: string; name: string }>("/api/fleet/places", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createGeofence: (input: {
    name: string;
    radius: string;
    triggers: string;
    placeId?: string;
  }) =>
    fetchApi<{ id: string; name: string }>("/api/settings/geofences", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  adjustPartStock: (id: string, delta: number) =>
    fetchApi<{ id: string; sku: string; stock: number; lowStock: boolean }>(
      "/api/maintenance/parts",
      {
        method: "PATCH",
        body: JSON.stringify({ id, delta }),
      },
    ),

  updateInvoiceStatus: (id: string, status: "pending" | "paid") =>
    fetchApi<{ id: string; status: string }>(`/api/billing/invoices/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  createFuelTransaction: (input: {
    vehicle: string;
    station: string;
    liters: number;
    amountInr?: number;
    date?: string;
  }) =>
    fetchApi<{ id: string; vehicle: string }>("/api/fleet/fuel/transactions", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createEquipment: (input: {
    name: string;
    type: string;
    location: string;
    status?: "active" | "stored" | "maintenance";
  }) =>
    fetchApi<{ id: string; name: string }>("/api/fleet/equipment", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateOrgProfile: (input: {
    name?: string;
    gstin?: string;
    address?: string;
    phone?: string;
    email?: string;
  }) =>
    fetchApi<{ name: string; gstin: string }>("/api/settings/organization", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  updateShipmentStatus: (id: string, status: string) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  cancelShipment: (id: string) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}/cancel`, { method: "POST" }),

  postShipmentToOverflow: (id: string) =>
    fetchApi<{ load: OverflowLoad; cancelled: boolean }>(`/api/shipments/${id}/overflow`, {
      method: "POST",
    }),

  getMapVehicles: () =>
    fetchApi<
      {
        id: string;
        shipmentId: string;
        publicId: string;
        lat: number;
        lng: number;
        vehicle?: string;
        driver?: string;
        status: string;
        stale?: boolean;
      }[]
    >("/api/map/vehicles"),

  assignShipment: (id: string, driverId: string, vehicleId: string) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}/assign`, {
      method: "POST",
      body: JSON.stringify({ driverId, vehicleId }),
    }),

  getKpis: () =>
    fetchApi<{
      activeTrips: number;
      exceptions: number;
      atPlant: number;
      networkOverflow: number;
    }>("/api/dashboard/kpis"),

  getExceptions: () =>
    fetchApi<{ id: string; publicId: string; reason: string; shipmentId: string }[]>(
      "/api/dashboard/exceptions",
    ),

  getActivities: () =>
    fetchApi<{ id: string; message: string; timestamp: string; shipmentId: string }[]>(
      "/api/dashboard/activity",
    ),

  getDrivers: () => fetchApi<Driver[]>("/api/fleet/drivers"),

  getDriver: (id: string) =>
    fetchApi<Driver & { recentShipments: ShipmentRecord[] }>(`/api/fleet/drivers/${id}`),

  getVehicles: () => fetchApi<Vehicle[]>("/api/fleet/vehicles"),

  getVehicle: (id: string) =>
    fetchApi<Vehicle & { recentShipments: ShipmentRecord[] }>(`/api/fleet/vehicles/${id}`),

  getAssignOptions: (shipmentId: string) =>
    fetchApi<{ drivers: Driver[]; vehicles: Vehicle[] }>(
      `/api/shipments/${shipmentId}/assign-options`,
    ),

  generateTrackLink: (id: string) =>
    fetchApi<{ token: string; url: string }>(`/api/shipments/${id}/track-link`, {
      method: "POST",
    }),

  uploadShipmentDocument: (
    id: string,
    input: { type: string; name: string },
  ) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}/documents`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getSyncStatus: () =>
    fetchApi<{
      lastSyncAt: string;
      healthy: boolean;
      tranzfortConfigured?: boolean;
      tranzfortSource?: string;
      dataSource?: string;
      fleetbaseReachable?: boolean;
      lastRun?: { scanned: number; created: number; skipped: number; errors: string[] };
    }>("/api/sync/status"),

  runTranZfortSync: () =>
    fetchApi<{ scanned: number; created: number; skipped: number; errors: string[] }>(
      "/api/sync/run",
      { method: "POST" },
    ),

  getDocuments: (params?: { q?: string; type?: string }) => {
    const sp = new URLSearchParams();
    if (params?.q?.trim()) sp.set("q", params.q.trim());
    if (params?.type && params.type !== "all") sp.set("type", params.type);
    const qs = sp.toString();
    return fetchApi<
      {
        id: string;
        name: string;
        type: string;
        typeLabel: string;
        shipmentId: string;
        shipmentPublicId: string;
        client: string;
        uploadedLabel: string;
      }[]
    >(`/api/documents${qs ? `?${qs}` : ""}`);
  },

  getNetworkOverflow: (params?: { q?: string; status?: string }) => {
    const sp = new URLSearchParams();
    if (params?.q?.trim()) sp.set("q", params.q.trim());
    if (params?.status) sp.set("status", params.status);
    const qs = sp.toString();
    return fetchApi<OverflowLoad[]>(`/api/network/overflow${qs ? `?${qs}` : ""}`);
  },

  acceptNetworkOverflow: (id: string) =>
    fetchApi<{ load: OverflowLoad; shipment: ShipmentRecord }>(
      `/api/network/overflow/${id}/accept`,
      { method: "POST" },
    ),

  reviewNetworkOverflow: (id: string) =>
    fetchApi<{ load: OverflowLoad }>(`/api/network/overflow/${id}/review`, {
      method: "POST",
    }),

  rejectNetworkOverflow: (id: string) =>
    fetchApi<{ load: OverflowLoad }>(`/api/network/overflow/${id}/reject`, {
      method: "POST",
    }),

  getNetworkAssignments: () => fetchApi<NetworkAssignmentRow[]>("/api/network/assignments"),
};

export type NetworkAssignmentRow = {
  id: string;
  bookingId: string;
  route: string;
  commodity: string;
  tonnage: number;
  shipmentId?: string;
  publicId?: string;
  status?: string;
  driver?: string;
};
