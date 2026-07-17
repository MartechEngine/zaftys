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

  async listVehicles(limit = 50) {
    const data = await this.request<{ data?: unknown[] } | unknown[]>(
      `/vehicles?limit=${limit}`,
    );
    if (Array.isArray(data)) return data;
    return data.data ?? [];
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
}

export function getFleetbaseClient() {
  return new FleetbaseClient();
}
