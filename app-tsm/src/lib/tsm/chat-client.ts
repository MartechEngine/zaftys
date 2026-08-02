/**
 * Marketplace chat inbox — read-only conversations for linked supplier.
 * Full reply UX stays in TranZfort (explicit non-goal: chat clone).
 */

import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import type { MarketplaceChatListResult, MarketplaceChatRow } from "@/lib/tsm/chat-types";

function maskId(id: string | undefined | null): string | null {
  if (!id) return null;
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

function mockChats(supplierId: string): MarketplaceChatRow[] {
  return [
    {
      id: `tz-mock-chat-${supplierId.slice(0, 8)}-01`,
      truckerName: "Mock Trucker",
      routeLabel: "Amravati → Mumbai",
      material: "Cement",
      loadId: `tz-hist-${supplierId.slice(0, 8)}-01`,
      tripId: null,
      latestMessageText: "On the way to pickup.",
      lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
      isArchived: false,
    },
  ];
}

async function fetchLiveChats(input: {
  supplierId: string;
  search?: string;
  limit: number;
  offset: number;
  includeArchived: boolean;
}): Promise<{ rows: MarketplaceChatRow[]; total: number }> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY?.trim() ?? "";
  if (!base || !key) {
    throw new Error("Live chat inbox needs TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY.");
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    Prefer: "count=exact",
  };

  const params = new URLSearchParams();
  params.set("select", "id,supplier_id,trucker_id,load_id,trip_id,last_message_at,is_archived,created_at");
  params.set("supplier_id", `eq.${input.supplierId}`);
  params.set("order", "last_message_at.desc.nullslast");
  params.set("limit", String(input.limit));
  params.set("offset", String(input.offset));
  if (!input.includeArchived) params.set("is_archived", "eq.false");

  const res = await fetch(`${base}/rest/v1/conversations?${params}`, {
    headers,
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`conversations list failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const raw = JSON.parse(text) as Record<string, unknown>[];
  const contentRange = res.headers.get("content-range") ?? "";
  const totalFromHeader = Number(contentRange.split("/")[1]);

  const truckerIds = [...new Set(raw.map((r) => String(r.trucker_id ?? "")).filter(Boolean))];
  const loadIds = [...new Set(raw.map((r) => String(r.load_id ?? "")).filter(Boolean))];
  const convIds = raw.map((r) => String(r.id)).filter(Boolean);

  const profiles = new Map<string, Record<string, unknown>>();
  const loads = new Map<string, Record<string, unknown>>();
  const latestByConv = new Map<string, { text: string | null; at: string | null }>();

  if (truckerIds.length) {
    const p = new URLSearchParams({
      select: "id,full_name",
      id: `in.(${truckerIds.join(",")})`,
    });
    const pr = await fetch(`${base}/rest/v1/profiles?${p}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (pr.ok) {
      for (const row of (await pr.json()) as Record<string, unknown>[]) {
        profiles.set(String(row.id), row);
      }
    }
  }

  if (loadIds.length) {
    const p = new URLSearchParams({
      select: "id,origin_label,destination_label,material",
      id: `in.(${loadIds.join(",")})`,
    });
    const lr = await fetch(`${base}/rest/v1/loads?${p}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (lr.ok) {
      for (const row of (await lr.json()) as Record<string, unknown>[]) {
        loads.set(String(row.id), row);
      }
    }
  }

  if (convIds.length) {
    const p = new URLSearchParams({
      select: "conversation_id,text_body,created_at",
      conversation_id: `in.(${convIds.join(",")})`,
      order: "created_at.desc",
      limit: String(Math.min(convIds.length * 3, 200)),
    });
    const mr = await fetch(`${base}/rest/v1/messages?${p}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (mr.ok) {
      for (const row of (await mr.json()) as Record<string, unknown>[]) {
        const cid = String(row.conversation_id ?? "");
        if (!cid || latestByConv.has(cid)) continue;
        latestByConv.set(cid, {
          text: row.text_body != null ? String(row.text_body) : null,
          at: row.created_at != null ? String(row.created_at) : null,
        });
      }
    }
  }

  let rows: MarketplaceChatRow[] = raw.map((r) => {
    const id = String(r.id);
    const loadId = r.load_id != null ? String(r.load_id) : null;
    const load = loadId ? loads.get(loadId) : undefined;
    const origin = load?.origin_label != null ? String(load.origin_label) : "";
    const dest = load?.destination_label != null ? String(load.destination_label) : "";
    const route =
      origin && dest ? `${origin} → ${dest}` : origin || dest || (loadId ? "Load" : "General");
    const truckerId = String(r.trucker_id ?? "");
    const latest = latestByConv.get(id);
    return {
      id,
      truckerName: profiles.get(truckerId)?.full_name
        ? String(profiles.get(truckerId)!.full_name)
        : "Trucker",
      routeLabel: route,
      material: load?.material != null ? String(load.material) : null,
      loadId,
      tripId: r.trip_id != null ? String(r.trip_id) : null,
      latestMessageText: latest?.text ?? null,
      lastMessageAt:
        (r.last_message_at != null ? String(r.last_message_at) : null) ?? latest?.at ?? null,
      isArchived: Boolean(r.is_archived),
    };
  });

  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.truckerName.toLowerCase().includes(q) ||
        r.routeLabel.toLowerCase().includes(q) ||
        (r.material ?? "").toLowerCase().includes(q) ||
        (r.latestMessageText ?? "").toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q),
    );
  }

  return {
    rows,
    total: Number.isFinite(totalFromHeader) ? totalFromHeader : rows.length,
  };
}

export async function listMarketplaceChats(input: {
  supplierId?: string;
  search?: string;
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
}): Promise<MarketplaceChatListResult> {
  const supplierId = input.supplierId?.trim() || "";
  const limit = Math.min(Math.max(input.limit ?? 25, 1), 100);
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
    const items = mockChats(supplierId);
    return {
      items,
      total: items.length,
      source: "mock",
      honesty: "Mock chat inbox — replies stay in TranZfort. Set bridge live for real threads.",
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  }

  try {
    const { rows, total } = await fetchLiveChats({
      supplierId,
      search: input.search,
      limit,
      offset,
      includeArchived: Boolean(input.includeArchived),
    });
    return {
      items: rows,
      total,
      source: "live",
      honesty:
        "Live conversation list (read-only). Reply / send messages in the TranZfort app — TSM does not clone chat.",
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      items: [],
      total: 0,
      source: "live",
      honesty: `Live chat inbox failed: ${msg.slice(0, 180)}`,
      linked: true,
      supplierIdMasked: maskId(supplierId),
    };
  }
}
