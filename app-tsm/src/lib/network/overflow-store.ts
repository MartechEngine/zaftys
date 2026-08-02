/** TranZfort overflow queue — shared in-memory store (globalThis for API route parity). */

import { allowDemoSeeds } from "@/lib/data/demo-mode";

export type OverflowStatus = "open" | "review" | "accepted" | "rejected";

export interface OverflowLoad {
  id: string;
  bookingId: string;
  route: string;
  commodity: string;
  tonnage: number;
  posted: string;
  status: OverflowStatus;
  shipmentId?: string;
  sourcePublicId?: string;
  updatedAt: string;
}

export interface OverflowShipmentInput {
  id: string;
  publicId: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnageMt: number;
  client: string;
}

const g = globalThis as typeof globalThis & {
  __tsmOverflowLoads?: OverflowLoad[];
};

const INITIAL_LOADS: OverflowLoad[] = [
  {
    id: "tz1",
    bookingId: "TZ-8842",
    route: "Amravati → Mumbai",
    commodity: "Cement",
    tonnage: 32,
    posted: "2h ago",
    status: "open",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tz2",
    bookingId: "TZ-8845",
    route: "Nagpur → Hyderabad",
    commodity: "Steel",
    tonnage: 28,
    posted: "5h ago",
    status: "open",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tz3",
    bookingId: "TZ-8839",
    route: "Wardha → Pune",
    commodity: "FMCG",
    tonnage: 15,
    posted: "1d ago",
    status: "review",
    updatedAt: new Date().toISOString(),
  },
];

function getLoadsStore() {
  if (!g.__tsmOverflowLoads) {
    g.__tsmOverflowLoads = allowDemoSeeds()
      ? INITIAL_LOADS.map((l) => ({ ...l }))
      : [];
  }
  return g.__tsmOverflowLoads;
}

export function replaceOverflowLoads(rows: OverflowLoad[]) {
  g.__tsmOverflowLoads = [...rows];
}

function now() {
  return new Date().toISOString();
}

export function parseRoute(route: string): { origin: string; destination: string } {
  const parts = route.split(/\s*→\s*|\s*->\s*|\s*-\s*/);
  if (parts.length >= 2) {
    return { origin: parts[0].trim(), destination: parts.slice(1).join(" ").trim() };
  }
  return { origin: route.trim(), destination: route.trim() };
}

export function listOverflowLoads(status?: OverflowStatus | "active") {
  const loads = getLoadsStore();
  let result = [...loads];
  if (status === "active") {
    result = result.filter((l) => l.status === "open" || l.status === "review");
  } else if (status) {
    result = result.filter((l) => l.status === status);
  }
  return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getOverflowLoad(id: string) {
  return getLoadsStore().find((l) => l.id === id);
}

export function markOverflowReview(id: string) {
  const loads = getLoadsStore();
  const load = loads.find((l) => l.id === id);
  if (!load || load.status === "accepted" || load.status === "rejected") return null;
  load.status = "review";
  load.updatedAt = now();
  return load;
}

export function rejectOverflow(id: string) {
  const loads = getLoadsStore();
  const load = loads.find((l) => l.id === id);
  if (!load || load.status === "accepted" || load.status === "rejected") return null;
  load.status = "rejected";
  load.updatedAt = now();
  return load;
}

export function acceptOverflow(id: string, shipmentId: string) {
  const loads = getLoadsStore();
  const load = loads.find((l) => l.id === id);
  if (!load || load.status === "accepted" || load.status === "rejected") return null;
  load.status = "accepted";
  load.shipmentId = shipmentId;
  load.updatedAt = now();
  return load;
}

export function createOverflowFromShipment(input: OverflowShipmentInput) {
  const loads = getLoadsStore();
  const existing = loads.find(
    (l) => l.sourcePublicId === input.publicId && l.status !== "rejected",
  );
  if (existing) return { error: "Already posted to overflow queue." as const, load: existing };

  const suffix = String(Date.now()).slice(-4);
  const load: OverflowLoad = {
    id: `tz-${suffix}`,
    bookingId: `TZ-${suffix}`,
    route: `${input.origin} → ${input.destination}`,
    commodity: input.commodity,
    tonnage: input.tonnageMt,
    posted: "Just now",
    status: "open",
    sourcePublicId: input.publicId,
    updatedAt: now(),
  };
  loads.unshift(load);
  return { load };
}

export function filterOverflowByQuery(items: OverflowLoad[], q?: string) {
  const needle = q?.trim().toLowerCase();
  if (!needle) return items;
  return items.filter((l) =>
    [l.bookingId, l.route, l.commodity, l.status, l.sourcePublicId]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
}
