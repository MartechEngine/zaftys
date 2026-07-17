import type { OriginType } from "@/lib/constants";
import type { ShipmentRecord } from "@/lib/dev-store";

const ACTIVE_STATUSES = [
  "pending",
  "dispatched",
  "at_plant",
  "in_transit",
  "at_weighbridge",
  "exception",
] as const;

export function isActiveShipment(s: ShipmentRecord) {
  return ACTIVE_STATUSES.includes(s.status as (typeof ACTIVE_STATUSES)[number]);
}

export function isExceptionShipment(s: ShipmentRecord) {
  return s.status === "exception" || (!s.driver && s.status === "pending");
}

export function filterShipmentsByTab(shipments: ShipmentRecord[], tab?: string) {
  if (!tab || tab === "all") return shipments;
  if (tab === "active") return shipments.filter(isActiveShipment);
  if (tab === "completed") return shipments.filter((s) => s.status === "delivered");
  if (tab === "exceptions") return shipments.filter(isExceptionShipment);
  return shipments;
}

export function filterShipmentsByQuery(shipments: ShipmentRecord[], q?: string) {
  const needle = q?.trim().toLowerCase();
  if (!needle) return shipments;

  return shipments.filter((s) => {
    const haystack = [
      s.publicId,
      s.client,
      s.origin,
      s.destination,
      s.commodity,
      s.lrNumber,
      s.driver,
      s.vehicle,
      s.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function filterShipmentsAdvanced(
  shipments: ShipmentRecord[],
  filters?: {
    client?: string;
    origin?: string;
    destination?: string;
    source?: string;
  },
) {
  let result = shipments;
  if (filters?.client) {
    result = result.filter((s) => s.client === filters.client);
  }
  if (filters?.origin) {
    result = result.filter((s) => s.origin === filters.origin);
  }
  if (filters?.destination) {
    result = result.filter((s) => s.destination === filters.destination);
  }
  if (filters?.source) {
    result = result.filter((s) => s.originType === (filters.source as OriginType));
  }
  return result;
}

export function shipmentFilterOptions(shipments: ShipmentRecord[]) {
  const uniq = (values: string[]) =>
    [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

  return {
    clients: uniq(shipments.map((s) => s.client)),
    origins: uniq(shipments.map((s) => s.origin)),
    destinations: uniq(shipments.map((s) => s.destination)),
    sources: uniq(shipments.map((s) => s.originType)),
  };
}

export function shipmentTabCounts(shipments: ShipmentRecord[]) {
  return {
    all: shipments.length,
    active: shipments.filter(isActiveShipment).length,
    completed: shipments.filter((s) => s.status === "delivered").length,
    exceptions: shipments.filter(isExceptionShipment).length,
  };
}

export type ShipmentSortKey =
  | "updatedAt"
  | "publicId"
  | "client"
  | "status"
  | "tonnageMt"
  | "eta";

export function sortShipments(
  shipments: ShipmentRecord[],
  sortBy?: string,
  sortDir: "asc" | "desc" = "desc",
) {
  const key = (sortBy ?? "updatedAt") as ShipmentSortKey;
  const valid: ShipmentSortKey[] = [
    "updatedAt",
    "publicId",
    "client",
    "status",
    "tonnageMt",
    "eta",
  ];
  const field = valid.includes(key) ? key : "updatedAt";
  const dir = sortDir === "asc" ? 1 : -1;

  return [...shipments].sort((a, b) => {
    const av = a[field] ?? "";
    const bv = b[field] ?? "";
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}
