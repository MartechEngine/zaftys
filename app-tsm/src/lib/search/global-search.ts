import { demoClients } from "@/lib/demo-data";
import { allowDemoSeeds } from "@/lib/data/demo-mode";
import { listDrivers, listShipments, listVehicles } from "@/lib/data/shipment-repository";

export type SearchResultKind = "shipment" | "driver" | "vehicle" | "client" | "page";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle?: string;
  href: string;
}

const STATIC_PAGES: SearchResult[] = [
  { id: "page-dispatch", kind: "page", title: "Dispatch board", href: "/dispatch" },
  { id: "page-map", kind: "page", title: "Live map", href: "/map" },
  { id: "page-documents", kind: "page", title: "Documents", href: "/documents" },
  { id: "page-network", kind: "page", title: "Network overflow", href: "/network/overflow" },
  { id: "page-fleet", kind: "page", title: "Fleet", href: "/fleet" },
  { id: "page-reports", kind: "page", title: "Reports", href: "/reports" },
];

function matchesNeedle(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle);
}

export async function runGlobalSearch(query: string, limit = 8): Promise<SearchResult[]> {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  const results: SearchResult[] = [];
  const perKind = Math.max(2, Math.ceil(limit / 4));

  const shipments = await listShipments({ q: needle });
  for (const s of shipments.slice(0, perKind)) {
    results.push({
      id: `shipment-${s.id}`,
      kind: "shipment",
      title: s.publicId,
      subtitle: `${s.client} · ${s.origin} → ${s.destination}`,
      href: `/shipments/${s.id}`,
    });
  }

  const drivers = await listDrivers();
  for (const d of drivers) {
    if (results.filter((r) => r.kind === "driver").length >= perKind) break;
    const haystack = [d.name, d.phone, d.license, d.vehicle].filter(Boolean).join(" ");
    if (!matchesNeedle(haystack, needle)) continue;
    results.push({
      id: `driver-${d.id}`,
      kind: "driver",
      title: d.name,
      subtitle: d.vehicle ?? d.phone,
      href: `/fleet/drivers/${d.id}`,
    });
  }

  const vehicles = await listVehicles();
  for (const v of vehicles) {
    if (results.filter((r) => r.kind === "vehicle").length >= perKind) break;
    const haystack = [v.registration, v.type, v.driver].filter(Boolean).join(" ");
    if (!matchesNeedle(haystack, needle)) continue;
    results.push({
      id: `vehicle-${v.id}`,
      kind: "vehicle",
      title: v.registration,
      subtitle: [v.type, v.driver].filter(Boolean).join(" · "),
      href: `/fleet/vehicles/${v.id}`,
    });
  }

  if (allowDemoSeeds()) {
    for (const c of demoClients) {
      if (results.filter((r) => r.kind === "client").length >= perKind) break;
      const haystack = [c.name, c.gstin, c.city, c.contact].join(" ");
      if (!matchesNeedle(haystack, needle)) continue;
      results.push({
        id: `client-${c.id}`,
        kind: "client",
        title: c.name,
        subtitle: `${c.city} · ${c.contact}`,
        href: `/clients/${c.id}`,
      });
    }
  }

  for (const page of STATIC_PAGES) {
    if (results.filter((r) => r.kind === "page").length >= 2) break;
    if (matchesNeedle(page.title, needle)) {
      results.push(page);
    }
  }

  return results.slice(0, limit);
}
