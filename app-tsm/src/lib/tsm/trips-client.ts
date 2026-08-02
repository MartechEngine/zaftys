/**
 * Supplier Trips — TZ read-through when live; mock desk without keys.
 * Uses service_role table reads (get_supplier_trips requires auth.uid).
 */

import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import type {
  SupplierTripRow,
  SupplierTripTab,
  SupplierTripsListResult,
} from "@/lib/tsm/trips-types";

const ACTIVE_STAGES = new Set([
  "assigned",
  "pickup",
  "pickup_pending",
  "picked_up",
  "in_transit",
  "delivered",
  "proof_submitted",
  "disputed",
]);

function maskId(id: string | undefined | null): string | null {
  if (!id) return null;
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

function mockTrips(supplierId: string): SupplierTripRow[] {
  const day = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return d.toISOString();
  };
  const prefix = supplierId.slice(0, 8);
  return [
    {
      id: `tz-mock-trip-${prefix}-01`,
      loadId: `tz-hist-${prefix}-01`,
      stage: "in_transit",
      originLabel: "Amravati, MH",
      destinationLabel: "Mumbai, MH",
      material: "Cement",
      truckNumber: "MH-27-AB-1234",
      truckerName: "Mock Trucker",
      assignedAt: day(2),
      deliveredAt: null,
      completedAt: null,
    },
    {
      id: `tz-mock-trip-${prefix}-02`,
      loadId: `tz-hist-${prefix}-03`,
      stage: "completed",
      originLabel: "Indore, MP",
      destinationLabel: "Ahmedabad, GJ",
      material: "Aggregates",
      truckNumber: "MP-09-CD-5678",
      truckerName: "Mock Fleet",
      assignedAt: day(20),
      deliveredAt: day(18),
      completedAt: day(17),
    },
  ];
}

function snapshotLabel(
  snap: unknown,
  key: "origin_label" | "destination_label" | "material",
): string {
  if (!snap || typeof snap !== "object") return "";
  const v = (snap as Record<string, unknown>)[key];
  return v != null ? String(v) : "";
}

async function fetchLiveTrips(input: {
  supplierId: string;
  tab: SupplierTripTab;
  search?: string;
  limit: number;
  offset: number;
}): Promise<{ rows: SupplierTripRow[]; total: number }> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY?.trim() ?? "";
  if (!base || !key) {
    throw new Error("Live Trips needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.");
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    Prefer: "count=exact",
  };

  const params = new URLSearchParams();
  params.set(
    "select",
    [
      "id",
      "load_id",
      "trucker_id",
      "truck_id",
      "stage",
      "assigned_at",
      "delivered_at",
      "completed_at",
      "load_snapshot_summary",
    ].join(","),
  );
  params.set("supplier_id", `eq.${input.supplierId}`);
  params.set("order", "assigned_at.desc.nullslast");
  params.set("limit", String(input.limit));
  params.set("offset", String(input.offset));
  // PostgREST: stage=in.(a,b) or stage=eq.completed
  if (input.tab === "active") {
    params.set("stage", `in.(${[...ACTIVE_STAGES].join(",")})`);
  } else if (input.tab === "completed") {
    // Mirror Flutter TripStages.completed (completed + cancelled)
    params.set("stage", "in.(completed,cancelled)");
  }

  const res = await fetch(`${base}/rest/v1/trips?${params.toString()}`, {
    headers,
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`trips list failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const raw = JSON.parse(text) as Record<string, unknown>[];
  const contentRange = res.headers.get("content-range") ?? "";
  const totalFromHeader = Number(contentRange.split("/")[1]);

  const loadIds = [...new Set(raw.map((r) => String(r.load_id ?? "")).filter(Boolean))];
  const truckerIds = [...new Set(raw.map((r) => String(r.trucker_id ?? "")).filter(Boolean))];
  const truckIds = [...new Set(raw.map((r) => String(r.truck_id ?? "")).filter(Boolean))];

  const loads = new Map<string, Record<string, unknown>>();
  const profiles = new Map<string, Record<string, unknown>>();
  const trucks = new Map<string, Record<string, unknown>>();

  if (loadIds.length) {
    const p = new URLSearchParams({
      select: "id,origin_label,destination_label,material",
      id: `in.(${loadIds.join(",")})`,
    });
    const lr = await fetch(`${base}/rest/v1/loads?${p}`, { headers, cache: "no-store" });
    if (lr.ok) {
      for (const row of (await lr.json()) as Record<string, unknown>[]) {
        loads.set(String(row.id), row);
      }
    }
  }
  if (truckerIds.length) {
    const p = new URLSearchParams({
      select: "id,full_name",
      id: `in.(${truckerIds.join(",")})`,
    });
    const pr = await fetch(`${base}/rest/v1/profiles?${p}`, { headers, cache: "no-store" });
    if (pr.ok) {
      for (const row of (await pr.json()) as Record<string, unknown>[]) {
        profiles.set(String(row.id), row);
      }
    }
  }
  if (truckIds.length) {
    const p = new URLSearchParams({
      select: "id,truck_number",
      id: `in.(${truckIds.join(",")})`,
    });
    const tr = await fetch(`${base}/rest/v1/trucks?${p}`, { headers, cache: "no-store" });
    if (tr.ok) {
      for (const row of (await tr.json()) as Record<string, unknown>[]) {
        trucks.set(String(row.id), row);
      }
    }
  }

  let rows: SupplierTripRow[] = raw.map((r) => {
    const loadId = String(r.load_id ?? "");
    const load = loads.get(loadId);
    const snap = r.load_snapshot_summary;
    const origin =
      String(load?.origin_label ?? "") || snapshotLabel(snap, "origin_label") || "—";
    const dest =
      String(load?.destination_label ?? "") ||
      snapshotLabel(snap, "destination_label") ||
      "—";
    const material =
      String(load?.material ?? "") || snapshotLabel(snap, "material") || "—";
    const truckerId = String(r.trucker_id ?? "");
    const truckId = String(r.truck_id ?? "");
    return {
      id: String(r.id ?? ""),
      loadId,
      stage: String(r.stage ?? ""),
      originLabel: origin,
      destinationLabel: dest,
      material,
      truckNumber: trucks.get(truckId)?.truck_number
        ? String(trucks.get(truckId)!.truck_number)
        : null,
      truckerName: profiles.get(truckerId)?.full_name
        ? String(profiles.get(truckerId)!.full_name)
        : null,
      assignedAt: r.assigned_at != null ? String(r.assigned_at) : null,
      deliveredAt: r.delivered_at != null ? String(r.delivered_at) : null,
      completedAt: r.completed_at != null ? String(r.completed_at) : null,
    };
  });

  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.material.toLowerCase().includes(q) ||
        r.originLabel.toLowerCase().includes(q) ||
        r.destinationLabel.toLowerCase().includes(q) ||
        r.stage.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.loadId.toLowerCase().includes(q) ||
        (r.truckNumber ?? "").toLowerCase().includes(q) ||
        (r.truckerName ?? "").toLowerCase().includes(q),
    );
  }

  return {
    rows,
    total: Number.isFinite(totalFromHeader) ? totalFromHeader : rows.length,
  };
}

export async function listSupplierTrips(input: {
  supplierId?: string;
  statusTab?: SupplierTripTab;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<SupplierTripsListResult> {
  const supplierId = input.supplierId?.trim() || "";
  const tab = input.statusTab ?? "all";
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 100);
  const offset = Math.max(input.offset ?? 0, 0);
  const live = getBridgeMode() === "live" && isBridgeLiveConfigured();

  if (!supplierId) {
    return {
      items: [],
      total: 0,
      source: live ? "live" : "mock",
      honesty: "No linked TranZfort supplier on this session.",
      linked: false,
      supplierIdMasked: null,
    };
  }

  if (!live) {
    let items = mockTrips(supplierId);
    if (tab === "active") items = items.filter((t) => ACTIVE_STAGES.has(t.stage));
    if (tab === "completed") {
      items = items.filter((t) => t.stage === "completed" || t.stage === "cancelled");
    }
    if (input.search?.trim()) {
      const q = input.search.trim().toLowerCase();
      items = items.filter(
        (t) =>
          t.material.toLowerCase().includes(q) ||
          t.originLabel.toLowerCase().includes(q) ||
          t.destinationLabel.toLowerCase().includes(q),
      );
    }
    const sliced = items.slice(offset, offset + limit);
    return {
      items: sliced,
      total: items.length,
      source: "mock",
      honesty: "Mock trips desk — set bridge live + keys for TranZfort trips.",
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  }

  try {
    const { rows, total } = await fetchLiveTrips({
      supplierId,
      tab,
      search: input.search,
      limit,
      offset,
    });
    return {
      items: rows,
      total,
      source: "live",
      honesty: "Live trips for the linked supplier (read-only). Stage advances stay in TranZfort.",
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      items: [],
      total: 0,
      source: "live",
      honesty: `Live trips read failed: ${msg.slice(0, 180)}`,
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  }
}
