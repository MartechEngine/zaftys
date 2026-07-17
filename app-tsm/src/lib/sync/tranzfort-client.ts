import type { ShipmentStatus } from "@/lib/constants";

export interface TranZfortTrip {
  id: string;
  origin?: string;
  destination?: string;
  commodity?: string;
  weight?: number;
  status?: string;
  lr_number?: string;
  client_id?: string;
}

export interface SyncRunResult {
  scanned: number;
  created: number;
  skipped: number;
  errors: string[];
}

export function isTranZfortConfigured() {
  return Boolean(process.env.TRANZFORT_SUPABASE_URL && process.env.TRANZFORT_SERVICE_KEY);
}

function tranzfortHeaders() {
  const key = process.env.TRANZFORT_SERVICE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}

/** Map TSM portal status → TranZfort trip status column. */
export function toTranZfortStatus(status: ShipmentStatus): string {
  const map: Partial<Record<ShipmentStatus, string>> = {
    pending: "pending",
    dispatched: "assigned",
    at_plant: "loading",
    in_transit: "in_transit",
    at_weighbridge: "in_transit",
    delivered: "delivered",
    cancelled: "cancelled",
    exception: "exception",
  };
  return map[status] ?? status;
}

/** Push status update back to TranZfort (two-way sync). Best-effort; logs on failure. */
export async function pushTranZfortStatus(tripId: string, status: ShipmentStatus) {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY;
  if (!base || !key) return { ok: false as const, reason: "not_configured" as const };

  const url = `${base}/rest/v1/trips?id=eq.${encodeURIComponent(tripId)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: tranzfortHeaders(),
    body: JSON.stringify({ status: toTranZfortStatus(status), updated_at: new Date().toISOString() }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TranZfort status push failed (${res.status}): ${text.slice(0, 200)}`);
  }

  return { ok: true as const };
}

/** Fetch recent trips from TranZfort Supabase REST (service role). */
export async function fetchTranZfortTrips(limit = 20): Promise<TranZfortTrip[]> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY;
  if (!base || !key) return [];

  const url = `${base}/rest/v1/trips?select=id,origin,destination,commodity,weight,status,lr_number,client_id&order=created_at.desc&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TranZfort fetch failed (${res.status}): ${text.slice(0, 200)}`);
  }

  return res.json() as Promise<TranZfortTrip[]>;
}
