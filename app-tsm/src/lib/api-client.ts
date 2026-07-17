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

  revokeClientUser: (clientId: string, userId: string) =>
    fetchApi<{ id: string; status: string }>(`/api/clients/${clientId}/users`, {
      method: "PATCH",
      body: JSON.stringify({ userId, revoke: true }),
    }),

  patchClientContact: (
    clientId: string,
    contactId: string,
    input: { name?: string; role?: string; phone?: string; email?: string },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/clients/${clientId}/contacts`, {
      method: "PATCH",
      body: JSON.stringify({ contactId, ...input }),
    }),

  deleteClientContact: (clientId: string, contactId: string) =>
    fetchApi<{ contactId: string; deleted: boolean }>(`/api/clients/${clientId}/contacts`, {
      method: "DELETE",
      body: JSON.stringify({ contactId }),
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

  patchMaintenanceSchedule: (
    id: string,
    input: { vehicle?: string; trigger?: string; nextDue?: string; type?: string },
  ) =>
    fetchApi<{ id: string; vehicle: string }>("/api/maintenance/schedules", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
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

  updateQuoteStatus: (id: string, status: "sent" | "draft" | "accepted" | "declined") =>
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

  updateShipmentFields: (
    id: string,
    input: {
      client?: string;
      origin?: string;
      destination?: string;
      commodity?: string;
      tonnageMt?: number;
      lrNumber?: string;
    },
  ) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  patchServiceRate: (
    id: string,
    input: { name: string; basis: string; rate: string; minCharge?: string },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/billing/rates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  createReportSchedule: (input: {
    name: string;
    cadence: string;
    recipients: string;
  }) =>
    fetchApi<{ id: string; name: string }>("/api/settings/report-schedules", {
      method: "POST",
      body: JSON.stringify(input),
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

  configureTally: () =>
    fetchApi<{ status: string }>("/api/integrations/tally", { method: "POST" }),

  exportTallyNow: () =>
    fetchApi<{ status: string; lastExport: string; invoiceCount: number; exportCount?: number }>(
      "/api/integrations/tally",
      { method: "POST", body: JSON.stringify({ action: "export" }) },
    ),

  createCustomReport: (input: { name: string; description?: string }) =>
    fetchApi<{ id: string; name: string }>("/api/reports/custom", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  patchVendor: (
    id: string,
    input: { name?: string; type?: string; city?: string; contact?: string },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/vendors/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  patchDriver: (
    id: string,
    input: { name?: string; phone?: string; license?: string },
  ) =>
    fetchApi<{ id: string; name: string }>(`/api/fleet/drivers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  createDriver: (input: { name: string; phone: string; license?: string }) =>
    fetchApi<{ id: string; name: string }>("/api/fleet/drivers", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  patchVehicle: (
    id: string,
    input: { registration?: string; type?: string; capacityMt?: number },
  ) =>
    fetchApi<{ id: string; registration: string }>(`/api/fleet/vehicles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  createVehicle: (input: { registration: string; type?: string }) =>
    fetchApi<{ id: string; registration: string }>("/api/fleet/vehicles", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  markNotificationsRead: (input: { ids?: string[]; all?: boolean }) =>
    fetchApi<{ marked: number; unread: number }>("/api/notifications", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  bulkUpdateShipmentStatus: (ids: string[], status: string) =>
    fetchApi<{
      status: string;
      updated: string[];
      skipped: { id: string; reason: string }[];
      updatedCount: number;
      skippedCount: number;
    }>("/api/shipments/bulk", {
      method: "POST",
      body: JSON.stringify({ ids, status }),
    }),

  acceptQuote: (id: string) =>
    fetchApi<{
      quote: { id: string; status: string; shipmentId?: string };
      shipment: ShipmentRecord;
    }>(`/api/shipments/quotes/${id}/accept`, { method: "POST" }),

  createFleetIssue: (input: {
    vehicle: string;
    driver: string;
    issue: string;
    severity?: "high" | "medium" | "low";
  }) =>
    fetchApi<{ id: string }>("/api/fleet/issues", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  resolveFleetIssue: (id: string) =>
    fetchApi<{ id: string; resolved?: boolean }>("/api/fleet/issues", {
      method: "PATCH",
      body: JSON.stringify({ id, action: "resolve" }),
    }),

  updateComplianceDoc: (id: string, status: "valid" | "expiring" | "expired") =>
    fetchApi<{ id: string; status: string }>("/api/fleet/compliance", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    }),

  verifyPartner: (id: string) =>
    fetchApi<{ id: string; verified: boolean }>(`/api/network/partners/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ verify: true }),
    }),

  activateOrgUser: (id: string) =>
    fetchApi<{ id: string; status: string }>(`/api/settings/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ activate: true }),
    }),

  patchOrgUser: (
    id: string,
    input: { role?: string; status?: "active" | "pending"; activate?: boolean },
  ) =>
    fetchApi<{ id: string; role: string; status: string }>(`/api/settings/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  runCustomReport: (id: string) =>
    fetchApi<{
      report: { id: string; name: string };
      run: { id: string; metric: string; ranAt: string };
    }>(`/api/reports/custom/${id}/run`, { method: "POST" }),

  testTraccarConnection: () =>
    fetchApi<{ status: string; lastSync: string; testedAt?: string }>(
      "/api/integrations/traccar",
      { method: "POST" },
    ),

  patchOrgRole: (id: string, name: string) =>
    fetchApi<{ id: string; name: string }>(`/api/settings/roles/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),

  patchSettingsGroup: (id: string, input: { name?: string; policy?: string }) =>
    fetchApi<{ id: string }>(`/api/settings/groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  patchEquipment: (
    id: string,
    input: { location?: string; status?: "active" | "stored" | "maintenance" },
  ) =>
    fetchApi<{ id: string; status: string }>("/api/fleet/equipment", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
    }),

  patchGeofence: (
    id: string,
    input: { name?: string; radius?: string; triggers?: string },
  ) =>
    fetchApi<{ id: string }>("/api/settings/geofences", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
    }),

  patchPlace: (
    id: string,
    input: { name?: string; type?: string; city?: string; geofence?: string },
  ) =>
    fetchApi<{ id: string }>(`/api/fleet/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  patchOrderTypeFlow: (id: string, statusFlow: string) =>
    fetchApi<{ steps: string[] }>(`/api/settings/order-types/${id}/flow`, {
      method: "PATCH",
      body: JSON.stringify({ statusFlow }),
    }),

  uploadOrgLogo: (filename?: string) =>
    fetchApi<{ name: string; logoFilename?: string }>("/api/settings/organization/logo", {
      method: "POST",
      body: JSON.stringify({ filename: filename ?? "zaftys-logo.png" }),
    }),

  rotateFleetbaseKey: () =>
    fetchApi<{ apiKeyMasked: string; connection: string }>("/api/integrations/fleetbase", {
      method: "POST",
    }),

  changePassword: (input: { currentPassword?: string; newPassword: string }) =>
    fetchApi<{ ok: boolean; changedAt: string }>("/api/profile/password", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  patchFleetGroup: (id: string, input: { name?: string; zone?: string }) =>
    fetchApi<{ id: string; name: string; zone: string }>(`/api/fleet/groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  setFuelProviderStatus: (id: string, status: "connected" | "disconnected") =>
    fetchApi<{ id: string; status: string }>("/api/integrations/fuel-providers", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    }),

  testTelematicsProvider: (id: string) =>
    fetchApi<{ id: string; lastPing: string; status: string }>(
      "/api/integrations/telematics",
      { method: "POST", body: JSON.stringify({ id }) },
    ),

  createAutomationRule: (input: { trigger: string; action: string }) =>
    fetchApi<{ id: string; trigger: string; action: string }>("/api/settings/automation", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  renameOrderType: (id: string, name: string) =>
    fetchApi<{ id: string; name: string }>(`/api/settings/order-types/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),

  deleteWebhook: (id: string) =>
    fetchApi<{ id: string; deleted: boolean }>("/api/integrations/webhooks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }),

  patchDevice: (id: string, input: { vehicle?: string; vehicleId?: string }) =>
    fetchApi<{ id: string; vehicle: string }>("/api/integrations/devices", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
    }),

  deleteAutomationRule: (id: string) =>
    fetchApi<{ id: string; deleted: boolean }>("/api/settings/automation", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }),

  deleteReportSchedule: (id: string) =>
    fetchApi<{ id: string; deleted: boolean }>("/api/settings/report-schedules", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }),

  patchOrderTypeField: (orderTypeId: string, fieldId: string, input: { required: boolean }) =>
    fetchApi<{ id: string; required: boolean }>(
      `/api/settings/order-types/${orderTypeId}/fields`,
      {
        method: "PATCH",
        body: JSON.stringify({ fieldId, ...input }),
      },
    ),

  deleteOrderTypeField: (orderTypeId: string, fieldId: string) =>
    fetchApi<{ fieldId: string; deleted: boolean }>(
      `/api/settings/order-types/${orderTypeId}/fields`,
      {
        method: "DELETE",
        body: JSON.stringify({ fieldId }),
      },
    ),

  patchDriverVehicle: (id: string, vehicleId: string | null) =>
    fetchApi<{ id: string; vehicle?: string; vehicleId?: string }>(
      `/api/fleet/drivers/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ vehicleId: vehicleId ?? "" }),
      },
    ),

  patchVehicleDriver: (vehicleId: string, driverId: string | null) =>
    fetchApi<{ id: string; driver?: string }>(`/api/fleet/vehicles/${vehicleId}`, {
      method: "PATCH",
      body: JSON.stringify({ driverId: driverId ?? "" }),
    }),

  patchReportSchedule: (id: string, input: { cadence?: string; recipients?: string }) =>
    fetchApi<{ id: string; cadence: string }>("/api/settings/report-schedules", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
    }),

  deleteGeofence: (id: string) =>
    fetchApi<{ id: string; deleted: boolean }>("/api/settings/geofences", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }),

  addFleetGroupMember: (groupId: string, input: { driver: string; vehicle: string }) =>
    fetchApi<{ group: { id: string; name: string }; members: unknown[] }>(
      `/api/fleet/groups/${groupId}`,
      {
        method: "POST",
        body: JSON.stringify(input),
      },
    ),

  checkFleetbaseHealth: () =>
    fetchApi<{ reachable: boolean; latencyMs: number | null; lastHealthCheck: string }>(
      "/api/integrations/fleetbase",
      { method: "POST", body: JSON.stringify({ action: "health" }) },
    ),

  requestPasswordReset: (email: string) =>
    fetchApi<{ email: string; requestedAt: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  createLedgerAccount: (input: {
    code: string;
    name: string;
    type: "Income" | "Expense" | "Asset" | "Liability";
  }) =>
    fetchApi<{ id: string; code: string; name: string }>("/api/billing/accounts", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  completePasswordReset: (input: {
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    fetchApi<{ email: string; completedAt: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  addSettingsGroupMember: (groupId: string, userId: string) =>
    fetchApi<{ id: string; members: number }>(`/api/settings/groups/${groupId}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),

  removeSettingsGroupMember: (groupId: string, userId: string) =>
    fetchApi<{ id: string; members: number }>(`/api/settings/groups/${groupId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
    }),

  removeFleetGroupMember: (
    groupId: string,
    input: { driver: string; vehicle: string },
  ) =>
    fetchApi<{ group: { id: string; name: string }; members: unknown[] }>(
      `/api/fleet/groups/${groupId}`,
      {
        method: "DELETE",
        body: JSON.stringify(input),
      },
    ),

  patchRolePermissions: (
    id: string,
    permissions: Partial<Record<string, boolean>>,
  ) =>
    fetchApi<{ id: string; permissions: Record<string, boolean> }>(
      `/api/settings/roles/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ permissions }),
      },
    ),

  patchNotificationRecipients: (id: string, recipients: string) =>
    fetchApi<{ id: string; recipients: string }>("/api/settings/notifications", {
      method: "PATCH",
      body: JSON.stringify({ id, recipients }),
    }),

  importShipmentsCsv: (csv: string) =>
    fetchApi<{ created: number; skipped: number; errors: string[]; ids: string[] }>(
      "/api/shipments/import",
      { method: "POST", body: JSON.stringify({ csv }) },
    ),

  rescheduleShipment: (id: string, input: { eta?: string; scheduledAt?: string }) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  syncPlaceGeofence: (id: string) =>
    fetchApi<{ id: string; syncedAt?: string }>(`/api/fleet/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ syncGeofence: true }),
    }),

  linkFaultWorkOrder: (id: string) =>
    fetchApi<{ fault: { id: string; workOrderId?: string }; workOrder: { id: string } }>(
      `/api/maintenance/faults/${id}/work-order`,
      { method: "POST" },
    ),

  deleteOrgRole: (id: string) =>
    fetchApi<{ id: string; deleted: boolean }>(`/api/settings/roles/${id}`, {
      method: "DELETE",
    }),

  resendOrgUserInvite: (id: string) =>
    fetchApi<{ id: string; lastResentAt: string }>(`/api/settings/users/${id}/invite`, {
      method: "POST",
    }),

  createPart: (input: {
    sku: string;
    name: string;
    stock?: number;
    reorder?: number;
    location?: string;
  }) =>
    fetchApi<{ id: string; sku: string; name: string }>("/api/maintenance/parts", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  patchPartMeta: (id: string, input: { reorder?: number; location?: string }) =>
    fetchApi<{ id: string; reorder: number; location: string }>("/api/maintenance/parts", {
      method: "PATCH",
      body: JSON.stringify({ id, ...input }),
    }),

  applyOrchestratorPlan: () =>
    fetchApi<{
      applied: { shipmentId: string; publicId: string; action: string; appliedAt: string };
      shipment: ShipmentRecord;
      proposal: { publicId: string; shipmentId: string; action: string };
    }>("/api/dispatch/orchestrator", {
      method: "POST",
      body: JSON.stringify({ action: "apply" }),
    }),

  reviseQuote: (id: string, input: { tonnage?: number; rateInr?: number }) =>
    fetchApi<{ id: string; tonnage: number; rate: string; rateInr: number }>(
      `/api/shipments/quotes/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
    ),

  createFault: (input: { vehicle: string; driver: string; issue: string }) =>
    fetchApi<{ id: string; vehicle: string; issue: string }>("/api/maintenance/faults", {
      method: "POST",
      body: JSON.stringify(input),
    }),
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
