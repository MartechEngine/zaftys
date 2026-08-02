/**
 * Supplier My Loads — TZ read-through when live; mock desk without keys.
 */

import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import { listPublishAudit } from "@/lib/tsm/publish-audit-store";
import type {
  SupplierLoadRow,
  SupplierLoadTab,
  SupplierLoadsListResult,
} from "@/lib/tsm/loads-types";
import { isMockTranzfortLoadId } from "@/lib/tsm/live-honesty";

function maskId(id: string | undefined | null): string | null {
  if (!id) return null;
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

function mockHistoricalLoads(supplierId: string): SupplierLoadRow[] {
  // Stable pilot rows so the desk is non-empty before live keys.
  const day = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return d.toISOString();
  };
  return [
    {
      id: `tz-hist-${supplierId.slice(0, 8)}-01`,
      originLabel: "Amravati, MH",
      destinationLabel: "Mumbai, MH",
      material: "Cement",
      materialCode: "CEMENT",
      weightTonnes: 30,
      trucksNeeded: 2,
      trucksBooked: 1,
      priceAmount: 45000,
      priceType: "fixed",
      pickupDate: day(3).slice(0, 10),
      status: "active",
      isSuperLoad: true,
      superStatus: "active",
      publishedAt: day(5),
      listingDuration: "7_days",
      isOnMarketplace: true,
      postedFromTsm: false,
    },
    {
      id: `tz-hist-${supplierId.slice(0, 8)}-02`,
      originLabel: "Nagpur, MH",
      destinationLabel: "Pune, MH",
      material: "Steel",
      materialCode: "STEEL",
      weightTonnes: 25,
      trucksNeeded: 1,
      trucksBooked: 0,
      priceAmount: 1800,
      priceType: "per_ton",
      pickupDate: day(10).slice(0, 10),
      status: "expired",
      isSuperLoad: false,
      superStatus: null,
      publishedAt: day(20),
      listingDuration: "7_days",
      isOnMarketplace: false,
      postedFromTsm: false,
    },
    {
      id: `tz-hist-${supplierId.slice(0, 8)}-03`,
      originLabel: "Indore, MP",
      destinationLabel: "Ahmedabad, GJ",
      material: "Aggregates",
      weightTonnes: 40,
      trucksNeeded: 3,
      trucksBooked: 3,
      priceAmount: 62000,
      priceType: "fixed",
      pickupDate: day(25).slice(0, 10),
      status: "completed",
      isSuperLoad: true,
      superStatus: "completed",
      publishedAt: day(30),
      listingDuration: "30_days",
      isOnMarketplace: false,
      postedFromTsm: false,
    },
  ];
}

function loadsFromPublishAudit(): SupplierLoadRow[] {
  return listPublishAudit(50)
    .filter((r) => r.loadId && (r.status === "success" || r.status === "mock"))
    .map((r) => {
      const mock = isMockTranzfortLoadId(r.loadId);
      return {
        id: r.loadId!,
        originLabel: "Posted from TSM",
        destinationLabel: "—",
        material: "TSM Super Load",
        trucksNeeded: 1,
        trucksBooked: 0,
        priceAmount: 0,
        priceType: "fixed",
        status: mock ? "active" : "active",
        isSuperLoad: true,
        superStatus: mock ? "mock" : "active",
        publishedAt: r.createdAt,
        isOnMarketplace: !mock,
        postedFromTsm: true,
      } satisfies SupplierLoadRow;
    });
}

function mapLiveRow(raw: Record<string, unknown>, tsmLoadIds: Set<string>): SupplierLoadRow {
  const id = String(raw.id ?? "");
  const visibleUntil =
    raw.marketplace_visible_until != null ? String(raw.marketplace_visible_until) : null;
  const status = String(raw.status ?? "active");
  // TZ keeps status `active` after the listing window closes; expiry is time-based.
  const expired =
    status === "active" && visibleUntil != null && Date.parse(visibleUntil) <= Date.now();
  return {
    id,
    originLabel: String(raw.origin_label ?? ""),
    destinationLabel: String(raw.destination_label ?? ""),
    material: String(raw.material ?? ""),
    materialCode: raw.material_code != null ? String(raw.material_code) : null,
    weightTonnes: raw.weight_tonnes != null ? Number(raw.weight_tonnes) : null,
    trucksNeeded: Number(raw.trucks_needed ?? 1),
    trucksBooked: Number(raw.trucks_booked ?? 0),
    priceAmount: Number(raw.price_amount ?? 0),
    priceType: String(raw.price_type ?? "fixed"),
    pickupDate: raw.pickup_date != null ? String(raw.pickup_date).slice(0, 10) : null,
    status: expired ? "expired" : status,
    isSuperLoad: Boolean(raw.is_super_load),
    superStatus: raw.super_status != null ? String(raw.super_status) : null,
    publishedAt: raw.published_at != null ? String(raw.published_at) : null,
    listingDuration: raw.listing_duration != null ? String(raw.listing_duration) : null,
    marketplaceVisibleUntil: visibleUntil,
    isExpired: expired,
    isOnMarketplace: status === "active" && !expired,
    postedFromTsm: tsmLoadIds.has(id),
  };
}

/**
 * TZ statuses are `active | cancelled | completed | assigned_full` — there is no
 * `expired` row state. A listing is expired when `marketplace_visible_until` has
 * passed while the row is still `active`.
 */
function statusFilterFor(tab: SupplierLoadTab, nowIso: string): string | null {
  const notExpired = `or(marketplace_visible_until.gte."${nowIso}",marketplace_visible_until.is.null)`;
  switch (tab) {
    case "active":
      return `(status.eq.active,${notExpired})`;
    case "expired":
      return `(status.eq.active,marketplace_visible_until.lt."${nowIso}")`;
    case "cancelled":
      return `(status.eq.cancelled)`;
    case "completed":
      return `(status.in.(completed,assigned_full))`;
    default:
      return null;
  }
}

async function fetchLiveLoads(input: {
  supplierId: string;
  tab: SupplierLoadTab;
  search?: string;
  limit: number;
  offset: number;
}): Promise<{ rows: SupplierLoadRow[]; total: number }> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY?.trim() ?? "";
  if (!base || !key) {
    throw new Error("Live My Loads needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.");
  }

  // Prefer direct table read with service_role (get_supplier_loads_list requires auth.uid).
  const params = new URLSearchParams();
  params.set("select", [
    "id",
    "origin_label",
    "destination_label",
    "material",
    "material_code",
    "weight_tonnes",
    "trucks_needed",
    "trucks_booked",
    "price_amount",
    "price_type",
    "pickup_date",
    "status",
    "is_super_load",
    "super_status",
    "published_at",
    "listing_duration",
    "marketplace_visible_until",
  ].join(","));
  params.set("supplier_id", `eq.${input.supplierId}`);
  params.set("parent_load_id", "is.null");
  params.set("order", "published_at.desc.nullslast");
  params.set("limit", String(input.limit));
  params.set("offset", String(input.offset));
  const statusFilter = statusFilterFor(input.tab, new Date().toISOString());
  if (statusFilter) {
    params.set("and", statusFilter);
  }
  if (input.search?.trim()) {
    const q = input.search.trim().replace(/[%(),]/g, "");
    params.set(
      "or",
      `(material.ilike.*${q}*,origin_label.ilike.*${q}*,destination_label.ilike.*${q}*)`,
    );
  }

  const res = await fetch(`${base}/rest/v1/loads?${params.toString()}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      // Content-Range gives the true match count, not just the page size.
      Prefer: "count=exact",
    },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`loads list failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const raw = JSON.parse(text) as Record<string, unknown>[];
  const tsmIds = new Set(
    listPublishAudit(200)
      .map((r) => r.loadId)
      .filter((id): id is string => Boolean(id)),
  );
  const contentRange = res.headers.get("content-range") ?? "";
  const totalFromHeader = Number(contentRange.split("/")[1]);
  return {
    rows: raw.map((r) => mapLiveRow(r, tsmIds)),
    total: Number.isFinite(totalFromHeader) ? totalFromHeader : raw.length,
  };
}

export type CancelLoadResult = {
  ok: boolean;
  loadId: string;
  status: string;
  source: "live" | "mock";
  message: string;
};

/**
 * Cancel an active/draft parent load for the linked supplier.
 * Prefers service_cancel_tsm_load; falls back to service_role table updates.
 */
export async function cancelSupplierLoad(input: {
  tsmOrgId: string;
  supplierId?: string;
  loadId: string;
}): Promise<CancelLoadResult> {
  const loadId = input.loadId.trim();
  const supplierId = input.supplierId?.trim() || "";
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  if (!loadId) {
    return { ok: false, loadId, status: "unknown", source: live ? "live" : "mock", message: "loadId required" };
  }

  if (!live) {
    return {
      ok: true,
      loadId,
      status: "cancelled",
      source: "mock",
      message: "Mock cancel — set bridge live to cancel on TranZfort.",
    };
  }

  if (!supplierId) {
    return {
      ok: false,
      loadId,
      status: "unknown",
      source: "live",
      message: "No linked TranZfort supplier.",
    };
  }

  try {
    const { rpcCancelTsmLoad } = await import("@/lib/tsm/bridge-rpc");
    await rpcCancelTsmLoad(input.tsmOrgId, loadId);
    return {
      ok: true,
      loadId,
      status: "cancelled",
      source: "live",
      message: "Cancelled via service_cancel_tsm_load.",
    };
  } catch (rpcErr) {
    // Fallback until TZ migration 20260802140000 is applied on prod.
    const rpcMsg = rpcErr instanceof Error ? rpcErr.message : String(rpcErr);
    if (!/404|PGRST202|does not exist|Could not find/i.test(rpcMsg)) {
      // Ownership / state errors from RPC — surface as-is when RPC exists
      if (/not your load|cannot be cancelled|not found|tsm_org_not_linked/i.test(rpcMsg)) {
        return { ok: false, loadId, status: "unknown", source: "live", message: rpcMsg.slice(0, 240) };
      }
    }

    try {
      await cancelLoadViaTable(supplierId, loadId);
      return {
        ok: true,
        loadId,
        status: "cancelled",
        source: "live",
        message: "Cancelled via service_role table update (RPC not applied yet).",
      };
    } catch (tableErr) {
      const msg = tableErr instanceof Error ? tableErr.message : String(tableErr);
      return {
        ok: false,
        loadId,
        status: "unknown",
        source: "live",
        message: `${msg.slice(0, 180)} (RPC: ${rpcMsg.slice(0, 120)})`,
      };
    }
  }
}

async function cancelLoadViaTable(supplierId: string, loadId: string): Promise<void> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY?.trim() ?? "";
  if (!base || !key) throw new Error("TranZfort keys missing");

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const getParams = new URLSearchParams({
    select: "id,supplier_id,status,parent_load_id",
    id: `eq.${loadId}`,
    limit: "1",
  });
  const getRes = await fetch(`${base}/rest/v1/loads?${getParams}`, {
    headers,
    cache: "no-store",
  });
  const getText = await getRes.text();
  if (!getRes.ok) throw new Error(`load lookup failed (${getRes.status}): ${getText.slice(0, 200)}`);
  const rows = JSON.parse(getText) as Record<string, unknown>[];
  const load = rows[0];
  if (!load) throw new Error("Load not found");
  if (String(load.supplier_id) !== supplierId) throw new Error("Not your load");
  if (load.parent_load_id != null) {
    throw new Error("Cancel the parent listing, not a child assigned load.");
  }
  const status = String(load.status ?? "");
  if (status !== "active" && status !== "draft") {
    throw new Error(`Load cannot be cancelled in current state (${status})`);
  }

  const patchRes = await fetch(`${base}/rest/v1/loads?id=eq.${loadId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status: "cancelled" }),
    cache: "no-store",
  });
  if (!patchRes.ok) {
    const t = await patchRes.text();
    throw new Error(`cancel patch failed (${patchRes.status}): ${t.slice(0, 200)}`);
  }

  await fetch(
    `${base}/rest/v1/booking_requests?load_id=eq.${loadId}&status=eq.submitted`,
    {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ status: "superseded" }),
      cache: "no-store",
    },
  );
}

export async function listSupplierLoads(input: {
  supplierId?: string;
  statusTab?: SupplierLoadTab;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<SupplierLoadsListResult> {
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 100);
  const offset = Math.max(input.offset ?? 0, 0);
  const supplierId = input.supplierId?.trim();
  const linked = Boolean(supplierId);
  const masked = maskId(supplierId);

  if (!linked) {
    return {
      items: [],
      source: "mock",
      linked: false,
      supplierIdMasked: null,
      honesty: "Link a TranZfort supplier (Sign in with TranZfort or Settings) to see My Loads.",
      total: 0,
    };
  }

  const tab: SupplierLoadTab = input.statusTab ?? "all";

  const mode = getBridgeMode();
  if (mode === "live" && isBridgeLiveConfigured()) {
    try {
      const { rows, total } = await fetchLiveLoads({
        supplierId: supplierId!,
        tab,
        search: input.search,
        limit,
        offset,
      });
      return {
        items: rows,
        source: "live",
        linked: true,
        supplierIdMasked: masked,
        honesty: "Live read-through from TranZfort loads (service). TZ remains source of truth.",
        total,
        limit,
        offset,
      };
    } catch (e) {
      return {
        items: [],
        source: "live",
        linked: true,
        supplierIdMasked: masked,
        honesty: e instanceof Error ? e.message : "Failed to load TranZfort My Loads.",
        total: 0,
      };
    }
  }

  // Mock desk: historical samples + TSM publish audit rows for this org.
  const hist = mockHistoricalLoads(supplierId!);
  const fromAudit = loadsFromPublishAudit().filter((r) =>
    r.id.startsWith("tz-mock-") || r.postedFromTsm,
  );
  let items = [...fromAudit, ...hist];
  if (tab !== "all") {
    items = items.filter((r) =>
      tab === "completed"
        ? r.status === "completed" || r.status === "assigned_full"
        : r.status === tab,
    );
  }
  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    items = items.filter(
      (r) =>
        r.material.toLowerCase().includes(q) ||
        r.originLabel.toLowerCase().includes(q) ||
        r.destinationLabel.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q),
    );
  }
  const total = items.length;
  items = items.slice(offset, offset + limit);

  return {
    items,
    source: "mock",
    linked: true,
    supplierIdMasked: masked,
    honesty:
      "Mock My Loads desk — sample history + TSM mock publishes. Add Supabase keys for live read-through.",
    total,
    limit,
    offset,
  };
}
