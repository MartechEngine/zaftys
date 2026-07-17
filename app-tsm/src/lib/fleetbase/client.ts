import type { FleetbaseOrder } from "./mapper";

export class FleetbaseError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "FleetbaseError";
  }
}

export class FleetbaseClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = (baseUrl ?? process.env.FLEETBASE_API_URL ?? "http://localhost:8000/v1").replace(
      /\/$/,
      "",
    );
    this.apiKey = apiKey ?? process.env.FLEETBASE_API_KEY ?? "";
  }

  get isConfigured() {
    return Boolean(this.apiKey);
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    if (!this.apiKey) {
      throw new FleetbaseError("FLEETBASE_API_KEY not configured", 503);
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...init?.headers,
      },
      cache: "no-store",
    });

    const text = await res.text();
    let json: unknown = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { raw: text };
    }

    if (!res.ok) {
      const err = json as { errors?: string[]; message?: string };
      const msg =
        err.errors?.[0] ?? err.message ?? `Fleetbase request failed (${res.status})`;
      throw new FleetbaseError(msg, res.status);
    }

    return json as T;
  }

  async listOrders(limit = 50) {
    const data = await this.request<{ data?: FleetbaseOrder[] } | FleetbaseOrder[]>(
      `/orders?limit=${limit}`,
    );
    if (Array.isArray(data)) return data;
    return data.data ?? [];
  }

  async getOrder(id: string) {
    const data = await this.request<{ data?: FleetbaseOrder } | FleetbaseOrder>(
      `/orders/${id}`,
    );
    if (data && "data" in data && data.data) return data.data;
    return data as FleetbaseOrder;
  }

  async listDrivers(limit = 50) {
    const data = await this.request<{ data?: unknown[] } | unknown[]>(
      `/drivers?limit=${limit}`,
    );
    if (Array.isArray(data)) return data;
    return data.data ?? [];
  }

  async getDriver(id: string) {
    const data = await this.request<{ data?: unknown } | unknown>(`/drivers/${id}`);
    if (data && typeof data === "object" && "data" in data && data.data) {
      return data.data;
    }
    return data;
  }

  async listVehicles(limit = 50) {
    const data = await this.request<{ data?: unknown[] } | unknown[]>(
      `/vehicles?limit=${limit}`,
    );
    if (Array.isArray(data)) return data;
    return data.data ?? [];
  }

  async getVehicle(id: string) {
    const data = await this.request<{ data?: unknown } | unknown>(`/vehicles/${id}`);
    if (data && typeof data === "object" && "data" in data && data.data) {
      return data.data;
    }
    return data;
  }

  async healthCheck() {
    try {
      await this.listOrders(1);
      return true;
    } catch {
      return false;
    }
  }

  async createOrder(payload: Record<string, unknown>) {
    const data = await this.request<{ data?: FleetbaseOrder } | FleetbaseOrder>(
      "/orders",
      { method: "POST", body: JSON.stringify(payload) },
    );
    if (data && "data" in data && data.data) return data.data;
    return data as FleetbaseOrder;
  }

  async assignOrder(orderId: string, driverId: string, vehicleId: string) {
    const data = await this.request<{ data?: FleetbaseOrder } | FleetbaseOrder>(
      `/orders/${orderId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          driver: driverId,
          vehicle: vehicleId,
          status: "dispatched",
        }),
      },
    );
    if (data && "data" in data && data.data) return data.data;
    return data as FleetbaseOrder;
  }

  async updateOrderStatus(orderId: string, status: string) {
    const data = await this.request<{ data?: FleetbaseOrder } | FleetbaseOrder>(
      `/orders/${orderId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
    );
    if (data && "data" in data && data.data) return data.data;
    return data as FleetbaseOrder;
  }

  async updateOrder(orderId: string, patch: Record<string, unknown>) {
    const data = await this.request<{ data?: FleetbaseOrder } | FleetbaseOrder>(
      `/orders/${orderId}`,
      { method: "PATCH", body: JSON.stringify(patch) },
    );
    if (data && "data" in data && data.data) return data.data;
    return data as FleetbaseOrder;
  }

  async createDriver(payload: Record<string, unknown>) {
    const data = await this.request<{ data?: unknown } | unknown>("/drivers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (data && typeof data === "object" && "data" in data && (data as { data?: unknown }).data) {
      return (data as { data: unknown }).data;
    }
    return data;
  }

  async updateDriver(id: string, patch: Record<string, unknown>) {
    const data = await this.request<{ data?: unknown } | unknown>(`/drivers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    if (data && typeof data === "object" && "data" in data && (data as { data?: unknown }).data) {
      return (data as { data: unknown }).data;
    }
    return data;
  }

  async createVehicle(payload: Record<string, unknown>) {
    const data = await this.request<{ data?: unknown } | unknown>("/vehicles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (data && typeof data === "object" && "data" in data && (data as { data?: unknown }).data) {
      return (data as { data: unknown }).data;
    }
    return data;
  }

  async updateVehicle(id: string, patch: Record<string, unknown>) {
    const data = await this.request<{ data?: unknown } | unknown>(`/vehicles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    if (data && typeof data === "object" && "data" in data && (data as { data?: unknown }).data) {
      return (data as { data: unknown }).data;
    }
    return data;
  }

  /** Best-effort last known positions (Fleetbase /positions or embedded order coords). */
  async listPositions(limit = 50): Promise<
    Array<{ id?: string; orderId?: string; latitude?: number; longitude?: number }>
  > {
    try {
      const data = await this.request<{ data?: unknown[] } | unknown[]>(
        `/positions?limit=${limit}`,
      );
      const rows = Array.isArray(data) ? data : (data.data ?? []);
      return rows.map((row) => {
        const r = row as Record<string, unknown>;
        const lat = Number(r.latitude ?? r.lat ?? (r.location as { lat?: number })?.lat);
        const lng = Number(
          r.longitude ?? r.lng ?? r.lon ?? (r.location as { lng?: number })?.lng,
        );
        return {
          id: String(r.uuid ?? r.id ?? ""),
          orderId: String(r.order_uuid ?? r.order_id ?? r.order ?? ""),
          latitude: Number.isFinite(lat) ? lat : undefined,
          longitude: Number.isFinite(lng) ? lng : undefined,
        };
      });
    } catch {
      return [];
    }
  }
}

export function getFleetbaseClient() {
  return new FleetbaseClient();
}
