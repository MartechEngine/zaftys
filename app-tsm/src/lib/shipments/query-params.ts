export type ShipmentListFilters = {
  tab?: string;
  q?: string;
  status?: string;
  client?: string;
  origin?: string;
  destination?: string;
  source?: string;
  page?: number;
  size?: number;
  sort?: string;
  dir?: "asc" | "desc";
  view?: "table" | "cards";
};

export const PAGE_SIZE_OPTIONS = [25, 50, 100] as const;

export function buildShipmentsQuery(filters: ShipmentListFilters): string {
  const sp = new URLSearchParams();
  if (filters.tab && filters.tab !== "all") sp.set("tab", filters.tab);
  if (filters.q) sp.set("q", filters.q);
  if (filters.status) sp.set("status", filters.status);
  if (filters.client) sp.set("client", filters.client);
  if (filters.origin) sp.set("origin", filters.origin);
  if (filters.destination) sp.set("destination", filters.destination);
  if (filters.source) sp.set("source", filters.source);
  if (filters.page && filters.page > 1) sp.set("page", String(filters.page));
  if (filters.size && filters.size !== 25) sp.set("size", String(filters.size));
  if (filters.sort && filters.sort !== "updatedAt") sp.set("sort", filters.sort);
  if (filters.dir && filters.dir !== "desc") sp.set("dir", filters.dir);
  if (filters.view && filters.view !== "table") sp.set("view", filters.view);
  return sp.toString();
}

export function shipmentsHref(filters: ShipmentListFilters) {
  const qs = buildShipmentsQuery(filters);
  return qs ? `/shipments?${qs}` : "/shipments";
}

export function parsePageSize(raw?: string) {
  const n = parseInt(raw ?? "25", 10);
  return PAGE_SIZE_OPTIONS.includes(n as (typeof PAGE_SIZE_OPTIONS)[number]) ? n : 25;
}

export function countActiveFilters(filters: ShipmentListFilters) {
  return [filters.client, filters.origin, filters.destination, filters.source, filters.status].filter(
    Boolean,
  ).length;
}
