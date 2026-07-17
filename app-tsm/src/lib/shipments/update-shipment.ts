import type { ShipmentStatus } from "@/lib/constants";

export type ShipmentStatusPatch = {
  status: ShipmentStatus;
};

const TERMINAL: ShipmentStatus[] = ["delivered", "cancelled"];

const ALLOWED: Record<ShipmentStatus, ShipmentStatus[]> = {
  pending: ["cancelled", "dispatched"],
  dispatched: ["in_transit", "at_plant", "cancelled"],
  at_plant: ["in_transit", "cancelled"],
  in_transit: ["delivered", "at_weighbridge", "exception", "cancelled"],
  at_weighbridge: ["delivered", "in_transit", "cancelled"],
  exception: ["in_transit", "cancelled", "delivered"],
  delivered: [],
  cancelled: [],
};

export function validateStatusTransition(
  current: ShipmentStatus,
  next: ShipmentStatus,
): string | null {
  if (current === next) return null;
  if (TERMINAL.includes(current)) {
    return `Cannot change status from ${current}.`;
  }
  if (!ALLOWED[current]?.includes(next)) {
    return `Cannot transition from ${current} to ${next}.`;
  }
  return null;
}

/** Shortest allowed transition path (excluding no-op). Returns null if unreachable. */
export function pathToStatus(
  from: ShipmentStatus,
  to: ShipmentStatus,
): ShipmentStatus[] | null {
  if (from === to) return [];
  if (TERMINAL.includes(from)) return null;
  if (validateStatusTransition(from, to) === null) return [to];

  const queue: { status: ShipmentStatus; path: ShipmentStatus[] }[] = [
    { status: from, path: [] },
  ];
  const seen = new Set<ShipmentStatus>([from]);

  while (queue.length > 0) {
    const { status, path } = queue.shift()!;
    for (const next of ALLOWED[status] ?? []) {
      if (seen.has(next)) continue;
      seen.add(next);
      const nextPath = [...path, next];
      if (next === to) return nextPath;
      if (!TERMINAL.includes(next)) {
        queue.push({ status: next, path: nextPath });
      }
    }
  }

  return null;
}

export function parseStatusPatch(body: unknown): ShipmentStatusPatch | null {
  if (!body || typeof body !== "object") return null;
  const status = (body as { status?: unknown }).status;
  if (typeof status !== "string") return null;
  const allowed: ShipmentStatus[] = [
    "pending",
    "dispatched",
    "at_plant",
    "in_transit",
    "at_weighbridge",
    "delivered",
    "cancelled",
    "exception",
  ];
  if (!allowed.includes(status as ShipmentStatus)) return null;
  return { status: status as ShipmentStatus };
}

export type ShipmentFieldsInput = {
  client?: string;
  origin?: string;
  destination?: string;
  commodity?: string;
  tonnageMt?: number;
  lrNumber?: string;
};

export function parseFieldsPatch(body: unknown): ShipmentFieldsInput | { error: string } | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  if (typeof data.status === "string") return null; // status-only path

  const patch: ShipmentFieldsInput = {};
  if (data.client !== undefined) {
    const client = String(data.client).trim();
    if (!client) return { error: "Client cannot be empty." };
    patch.client = client;
  }
  if (data.origin !== undefined) {
    const origin = String(data.origin).trim();
    if (!origin) return { error: "Origin cannot be empty." };
    patch.origin = origin;
  }
  if (data.destination !== undefined) {
    const destination = String(data.destination).trim();
    if (!destination) return { error: "Destination cannot be empty." };
    patch.destination = destination;
  }
  if (data.commodity !== undefined) {
    const commodity = String(data.commodity).trim();
    if (!commodity) return { error: "Commodity cannot be empty." };
    patch.commodity = commodity;
  }
  if (data.tonnageMt !== undefined) {
    const tonnageMt = Number(data.tonnageMt);
    if (!Number.isFinite(tonnageMt) || tonnageMt <= 0) {
      return { error: "Tonnage must be a positive number." };
    }
    patch.tonnageMt = tonnageMt;
  }
  if (data.lrNumber !== undefined) {
    patch.lrNumber = String(data.lrNumber).trim() || undefined;
  }

  if (Object.keys(patch).length === 0) {
    return { error: "Provide at least one field to update." };
  }
  return patch;
}
