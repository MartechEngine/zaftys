/**
 * Marketplace analytics — TZ dashboard KPIs via service_role counts.
 * Flutter RPCs (get_supplier_dashboard_stats / get_supplier_load_analytics) need auth.uid.
 */

import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import type {
  MarketplaceAnalyticsKpis,
  MarketplaceAnalyticsResult,
  MarketplaceLoadFunnelRow,
} from "@/lib/tsm/analytics-types";

function maskId(id: string | undefined | null): string | null {
  if (!id) return null;
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

function tzHeaders(key: string): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    Prefer: "count=exact",
  };
}

async function countRows(
  base: string,
  key: string,
  path: string,
  query: URLSearchParams,
): Promise<number> {
  query.set("select", "id");
  query.set("limit", "1");
  const res = await fetch(`${base}/rest/v1/${path}?${query}`, {
    headers: {
      ...tzHeaders(key),
      Range: "0-0",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path} count failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const contentRange = res.headers.get("content-range") ?? "";
  const total = Number(contentRange.split("/")[1]);
  return Number.isFinite(total) ? total : 0;
}

function mockResult(supplierId: string): MarketplaceAnalyticsResult {
  return {
    kpis: {
      activeLoads: 2,
      pendingBookings: 1,
      activeTrips: 1,
      inTransitTrips: 1,
      completedTrips: 1,
      loadsPostedToday: 0,
    },
    topLoads: [
      {
        loadId: `tz-hist-${supplierId.slice(0, 8)}-01`,
        originLabel: "Amravati, MH",
        destinationLabel: "Mumbai, MH",
        material: "Cement",
        status: "active",
        trucksNeeded: 2,
        trucksBooked: 1,
        impressions: 48,
        detailViews: 12,
        publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
    source: "mock",
    honesty: "Mock marketplace analytics — set bridge live + keys for TranZfort KPIs.",
    linked: true,
    supplierIdMasked: maskId(supplierId),
  };
}

async function fetchLiveAnalytics(supplierId: string): Promise<{
  kpis: MarketplaceAnalyticsKpis;
  topLoads: MarketplaceLoadFunnelRow[];
}> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY?.trim() ?? "";
  if (!base || !key) {
    throw new Error("Live analytics needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.");
  }

  const startOfDayIst = (() => {
    // Approximate IST day boundary for loads_posted_today (UTC+5:30)
    const now = new Date();
    const istMs = now.getTime() + (5 * 60 + 30) * 60 * 1000;
    const ist = new Date(istMs);
    ist.setUTCHours(0, 0, 0, 0);
    return new Date(ist.getTime() - (5 * 60 + 30) * 60 * 1000).toISOString();
  })();

  const activeLoadsQ = new URLSearchParams({
    supplier_id: `eq.${supplierId}`,
    parent_load_id: "is.null",
    status: "in.(active,assigned_partial,assigned_full,in_transit)",
  });
  const loadsListParams = new URLSearchParams({
    select: "id,origin_label,destination_label,material,status,trucks_needed,trucks_booked,published_at",
    supplier_id: `eq.${supplierId}`,
    parent_load_id: "is.null",
    order: "published_at.desc.nullslast",
    limit: "40",
  });

  const [activeLoads, inTransitTrips, completedTrips, activeTrips, loadsPostedToday, loadsRes] =
    await Promise.all([
      countRows(base, key, "loads", activeLoadsQ),
      countRows(
        base,
        key,
        "trips",
        new URLSearchParams({
          supplier_id: `eq.${supplierId}`,
          stage: "eq.in_transit",
        }),
      ),
      countRows(
        base,
        key,
        "trips",
        new URLSearchParams({
          supplier_id: `eq.${supplierId}`,
          stage: "eq.completed",
        }),
      ),
      countRows(
        base,
        key,
        "trips",
        new URLSearchParams({
          supplier_id: `eq.${supplierId}`,
          stage: "in.(assigned,pickup,pickup_pending,picked_up,in_transit,delivered,proof_submitted,disputed)",
        }),
      ),
      countRows(
        base,
        key,
        "loads",
        new URLSearchParams({
          supplier_id: `eq.${supplierId}`,
          parent_load_id: "is.null",
          published_at: `gte.${startOfDayIst}`,
        }),
      ),
      fetch(`${base}/rest/v1/loads?${loadsListParams}`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }),
    ]);

  if (!loadsRes.ok) {
    const text = await loadsRes.text();
    throw new Error(`loads list failed (${loadsRes.status}): ${text.slice(0, 200)}`);
  }
  const loads = (await loadsRes.json()) as Record<string, unknown>[];
  const loadIds = loads.map((l) => String(l.id));

  let pendingBookings = 0;
  const impressionsByLoad = new Map<string, { impressions: number; detailViews: number }>();

  if (loadIds.length) {
    const bookQ = new URLSearchParams({
      load_id: `in.(${loadIds.join(",")})`,
      status: "eq.submitted",
    });
    pendingBookings = await countRows(base, key, "booking_requests", bookQ);

    // Aggregate daily analytics for these loads (cap query size)
    const idChunk = loadIds.slice(0, 40);
    const analyticsParams = new URLSearchParams({
      select: "load_id,impressions,detail_views",
      load_id: `in.(${idChunk.join(",")})`,
      limit: "5000",
    });
    const ar = await fetch(`${base}/rest/v1/load_analytics_daily?${analyticsParams}`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (ar.ok) {
      const rows = (await ar.json()) as Record<string, unknown>[];
      for (const row of rows) {
        const lid = String(row.load_id ?? "");
        const cur = impressionsByLoad.get(lid) ?? { impressions: 0, detailViews: 0 };
        cur.impressions += Number(row.impressions ?? 0);
        cur.detailViews += Number(row.detail_views ?? 0);
        impressionsByLoad.set(lid, cur);
      }
    }
  }

  const topLoads: MarketplaceLoadFunnelRow[] = loads.slice(0, 15).map((l) => {
    const id = String(l.id);
    const funnel = impressionsByLoad.get(id) ?? { impressions: 0, detailViews: 0 };
    return {
      loadId: id,
      originLabel: String(l.origin_label ?? "—"),
      destinationLabel: String(l.destination_label ?? "—"),
      material: String(l.material ?? "—"),
      status: String(l.status ?? ""),
      trucksNeeded: Number(l.trucks_needed ?? 0),
      trucksBooked: Number(l.trucks_booked ?? 0),
      impressions: funnel.impressions,
      detailViews: funnel.detailViews,
      publishedAt: l.published_at != null ? String(l.published_at) : null,
    };
  });

  // Prefer loads with any funnel activity first
  topLoads.sort((a, b) => b.impressions + b.detailViews - (a.impressions + a.detailViews));

  return {
    kpis: {
      activeLoads,
      pendingBookings,
      activeTrips,
      inTransitTrips,
      completedTrips,
      loadsPostedToday,
    },
    topLoads: topLoads.slice(0, 12),
  };
}

export async function getMarketplaceAnalytics(input: {
  supplierId?: string;
}): Promise<MarketplaceAnalyticsResult> {
  const supplierId = input.supplierId?.trim() || "";
  const live = getBridgeMode() === "live" && isBridgeLiveConfigured();

  if (!supplierId) {
    return {
      kpis: {
        activeLoads: 0,
        pendingBookings: 0,
        activeTrips: 0,
        inTransitTrips: 0,
        completedTrips: 0,
        loadsPostedToday: 0,
      },
      topLoads: [],
      source: live ? "live" : "mock",
      honesty: "No linked TranZfort supplier on this session.",
      linked: false,
      supplierIdMasked: null,
    };
  }

  if (!live) return mockResult(supplierId);

  try {
    const { kpis, topLoads } = await fetchLiveAnalytics(supplierId);
    return {
      kpis,
      topLoads,
      source: "live",
      honesty:
        "Live supplier KPIs from TranZfort (read-only). Mirrors Flutter dashboard stats; per-load funnel from load_analytics_daily.",
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      kpis: {
        activeLoads: 0,
        pendingBookings: 0,
        activeTrips: 0,
        inTransitTrips: 0,
        completedTrips: 0,
        loadsPostedToday: 0,
      },
      topLoads: [],
      source: "live",
      honesty: `Live analytics read failed: ${msg.slice(0, 180)}`,
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  }
}
