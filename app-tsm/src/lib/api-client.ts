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

  updateShipmentStatus: (id: string, status: string) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  cancelShipment: (id: string) =>
    fetchApi<ShipmentRecord>(`/api/shipments/${id}/cancel`, { method: "POST" }),

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

  getVehicles: () => fetchApi<Vehicle[]>("/api/fleet/vehicles"),

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
