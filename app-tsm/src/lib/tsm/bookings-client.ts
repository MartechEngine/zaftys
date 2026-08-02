/**
 * Supplier booking inbox — TZ read-through when live; mock desk without keys.
 */

import {
  getBridgeMode,
  isBridgeLiveConfigured,
  rpcApproveTsmBooking,
  rpcRejectTsmBooking,
} from "@/lib/tsm/bridge-rpc";
import { listPublishAudit } from "@/lib/tsm/publish-audit-store";
import { isMockTranzfortLoadId } from "@/lib/tsm/live-honesty";
import type {
  BookingActionResult,
  BookingInboxListResult,
  BookingInboxRow,
  BookingInboxStatus,
  BookingInboxTab,
} from "@/lib/tsm/bookings-types";

type MockStore = {
  rows: BookingInboxRow[];
};

const g = globalThis as unknown as { __tsmBookingInbox?: MockStore };

function mockStore(): MockStore {
  if (!g.__tsmBookingInbox) {
    g.__tsmBookingInbox = { rows: [] };
  }
  return g.__tsmBookingInbox;
}

function maskId(id: string | undefined | null): string | null {
  if (!id) return null;
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

function asStatus(raw: unknown): BookingInboxStatus {
  const s = String(raw ?? "submitted");
  if (
    s === "submitted" ||
    s === "approved" ||
    s === "rejected" ||
    s === "cancelled" ||
    s === "withdrawn" ||
    s === "superseded" ||
    s === "expired"
  ) {
    return s;
  }
  return "submitted";
}

function seedMockBookings(supplierId: string): BookingInboxRow[] {
  const day = (offsetHours: number) => {
    const d = new Date();
    d.setHours(d.getHours() - offsetHours);
    return d.toISOString();
  };
  const prefix = supplierId.slice(0, 8);
  return [
    {
      id: `tz-book-${prefix}-01`,
      loadId: `tz-hist-${prefix}-01`,
      status: "submitted",
      createdAt: day(2),
      decidedAt: null,
      decisionReason: null,
      truckerId: `tz-trucker-${prefix}-1`,
      truckerName: "Rajesh K.",
      truckerVerification: "verified",
      truckerRating: 4.8,
      truckId: `tz-truck-${prefix}-1`,
      truckNumber: "MH-12 AB ****",
      truckBodyType: "Open",
      truckTyres: 10,
      originLabel: "Amravati, MH",
      destinationLabel: "Mumbai, MH",
      material: "Cement",
      isSuperLoad: true,
      trucksNeeded: 2,
      trucksBooked: 1,
      postedFromTsm: false,
      tripId: null,
    },
    {
      id: `tz-book-${prefix}-02`,
      loadId: `tz-hist-${prefix}-01`,
      status: "submitted",
      createdAt: day(5),
      decidedAt: null,
      decisionReason: null,
      truckerId: `tz-trucker-${prefix}-2`,
      truckerName: "Suresh M.",
      truckerVerification: "verified",
      truckerRating: 4.6,
      truckId: `tz-truck-${prefix}-2`,
      truckNumber: "GJ-06 CD ****",
      truckBodyType: "Open",
      truckTyres: 12,
      originLabel: "Amravati, MH",
      destinationLabel: "Mumbai, MH",
      material: "Cement",
      isSuperLoad: true,
      trucksNeeded: 2,
      trucksBooked: 1,
      postedFromTsm: false,
      tripId: null,
    },
    {
      id: `tz-book-${prefix}-03`,
      loadId: `tz-hist-${prefix}-03`,
      status: "approved",
      createdAt: day(48),
      decidedAt: day(46),
      decisionReason: null,
      truckerId: `tz-trucker-${prefix}-3`,
      truckerName: "Manjeet S.",
      truckerVerification: "verified",
      truckerRating: 4.9,
      truckId: `tz-truck-${prefix}-3`,
      truckNumber: "PB-03 EF ****",
      truckBodyType: "Container",
      truckTyres: 10,
      originLabel: "Indore, MP",
      destinationLabel: "Ahmedabad, GJ",
      material: "Aggregates",
      isSuperLoad: true,
      trucksNeeded: 3,
      trucksBooked: 3,
      postedFromTsm: false,
      tripId: `tz-trip-${prefix}-03`,
    },
  ];
}

function ensureMockRows(supplierId: string): BookingInboxRow[] {
  const store = mockStore();
  if (store.rows.length === 0) {
    store.rows = seedMockBookings(supplierId);
  }
  return store.rows;
}

function mapLiveRow(
  raw: Record<string, unknown>,
  tsmLoadIds: Set<string>,
): BookingInboxRow {
  const load = (raw.loads ?? {}) as Record<string, unknown>;
  const profile = (raw.profiles ?? {}) as Record<string, unknown>;
  const truck = (raw.trucks ?? {}) as Record<string, unknown>;
  const loadId = String(raw.load_id ?? load.id ?? "");
  return {
    id: String(raw.id ?? ""),
    loadId,
    status: asStatus(raw.status),
    createdAt: String(raw.created_at ?? ""),
    decidedAt: raw.decided_at != null ? String(raw.decided_at) : null,
    decisionReason: raw.decision_reason != null ? String(raw.decision_reason) : null,
    truckerId: raw.trucker_id != null ? String(raw.trucker_id) : null,
    truckerName: String(profile.full_name ?? "Trucker"),
    truckerVerification:
      profile.verification_status != null ? String(profile.verification_status) : null,
    truckerRating: null,
    truckId: raw.truck_id != null ? String(raw.truck_id) : null,
    truckNumber: truck.truck_number != null ? String(truck.truck_number) : null,
    truckBodyType: truck.body_type != null ? String(truck.body_type) : null,
    truckTyres: truck.tyres != null ? Number(truck.tyres) : null,
    originLabel: String(load.origin_label ?? "—"),
    destinationLabel: String(load.destination_label ?? "—"),
    material: String(load.material ?? "—"),
    isSuperLoad: Boolean(load.is_super_load),
    trucksNeeded: Number(load.trucks_needed ?? 1),
    trucksBooked: Number(load.trucks_booked ?? 0),
    postedFromTsm: tsmLoadIds.has(loadId) || isMockTranzfortLoadId(loadId),
    tripId: null,
  };
}

async function fetchLiveBookings(input: {
  supplierId: string;
  tab: BookingInboxTab;
  search?: string;
  limit: number;
  offset: number;
}): Promise<{ rows: BookingInboxRow[]; total: number }> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY ?? "";
  if (!base || !key) throw new Error("TranZfort keys missing");

  const params = new URLSearchParams();
  params.set(
    "select",
    [
      "id",
      "load_id",
      "trucker_id",
      "truck_id",
      "status",
      "decision_reason",
      "created_at",
      "decided_at",
      "loads!inner(id,supplier_id,origin_label,destination_label,material,is_super_load,trucks_needed,trucks_booked,parent_load_id)",
      "profiles!booking_requests_trucker_id_fkey(full_name,verification_status)",
      "trucks!booking_requests_truck_id_fkey(truck_number,body_type,tyres)",
    ].join(","),
  );
  params.set("loads.supplier_id", `eq.${input.supplierId}`);
  params.set("loads.parent_load_id", "is.null");
  params.set("order", "created_at.desc");
  params.set("limit", String(input.limit));
  params.set("offset", String(input.offset));

  if (input.tab === "pending") {
    params.set("status", "eq.submitted");
  } else if (input.tab === "decided") {
    params.set("status", "in.(approved,rejected,superseded,withdrawn,cancelled,expired)");
  }

  const res = await fetch(`${base}/rest/v1/booking_requests?${params.toString()}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      Prefer: "count=exact",
    },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    // Fallback without FK hint names if relationship names differ.
    if (res.status === 400 || res.status === 300) {
      return fetchLiveBookingsSimple(input);
    }
    throw new Error(`booking_requests list failed (${res.status}): ${text.slice(0, 300)}`);
  }

  const raw = JSON.parse(text) as Record<string, unknown>[];
  const tsmIds = new Set(
    listPublishAudit(200)
      .map((r) => r.loadId)
      .filter((id): id is string => Boolean(id)),
  );
  const contentRange = res.headers.get("content-range") ?? "";
  const totalFromHeader = Number(contentRange.split("/")[1]);
  let rows = raw.map((r) => mapLiveRow(r, tsmIds));

  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.truckerName.toLowerCase().includes(q) ||
        r.material.toLowerCase().includes(q) ||
        r.originLabel.toLowerCase().includes(q) ||
        r.destinationLabel.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.loadId.toLowerCase().includes(q),
    );
  }

  return {
    rows,
    total: Number.isFinite(totalFromHeader) ? totalFromHeader : rows.length,
  };
}

/** Simpler select when embedded FK names are ambiguous. */
async function fetchLiveBookingsSimple(input: {
  supplierId: string;
  tab: BookingInboxTab;
  search?: string;
  limit: number;
  offset: number;
}): Promise<{ rows: BookingInboxRow[]; total: number }> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.TRANZFORT_SERVICE_KEY ?? "";
  if (!base || !key) throw new Error("TranZfort keys missing");

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    Prefer: "count=exact",
  };

  const loadParams = new URLSearchParams({
    select: "id,origin_label,destination_label,material,is_super_load,trucks_needed,trucks_booked",
    supplier_id: `eq.${input.supplierId}`,
    parent_load_id: "is.null",
    limit: "500",
  });
  const loadsRes = await fetch(`${base}/rest/v1/loads?${loadParams}`, {
    headers,
    cache: "no-store",
  });
  const loadsText = await loadsRes.text();
  if (!loadsRes.ok) {
    throw new Error(`loads for bookings failed (${loadsRes.status}): ${loadsText.slice(0, 300)}`);
  }
  const loads = JSON.parse(loadsText) as Record<string, unknown>[];
  if (loads.length === 0) return { rows: [], total: 0 };
  const loadMap = new Map(loads.map((l) => [String(l.id), l]));
  const loadIds = [...loadMap.keys()];

  const bookParams = new URLSearchParams();
  bookParams.set(
    "select",
    "id,load_id,trucker_id,truck_id,status,decision_reason,created_at,decided_at",
  );
  bookParams.set("load_id", `in.(${loadIds.join(",")})`);
  bookParams.set("order", "created_at.desc");
  bookParams.set("limit", String(input.limit));
  bookParams.set("offset", String(input.offset));
  if (input.tab === "pending") bookParams.set("status", "eq.submitted");
  else if (input.tab === "decided") {
    bookParams.set("status", "in.(approved,rejected,superseded,withdrawn,cancelled,expired)");
  }

  const bookRes = await fetch(`${base}/rest/v1/booking_requests?${bookParams}`, {
    headers,
    cache: "no-store",
  });
  const bookText = await bookRes.text();
  if (!bookRes.ok) {
    throw new Error(`booking_requests list failed (${bookRes.status}): ${bookText.slice(0, 300)}`);
  }
  const raw = JSON.parse(bookText) as Record<string, unknown>[];
  const contentRange = bookRes.headers.get("content-range") ?? "";
  const totalFromHeader = Number(contentRange.split("/")[1]);

  const truckerIds = [...new Set(raw.map((r) => String(r.trucker_id ?? "")).filter(Boolean))];
  const truckIds = [...new Set(raw.map((r) => String(r.truck_id ?? "")).filter(Boolean))];
  const profiles = new Map<string, Record<string, unknown>>();
  const trucks = new Map<string, Record<string, unknown>>();

  if (truckerIds.length) {
    const p = new URLSearchParams({
      select: "id,full_name,verification_status",
      id: `in.(${truckerIds.join(",")})`,
    });
    const pr = await fetch(`${base}/rest/v1/profiles?${p}`, { headers, cache: "no-store" });
    if (pr.ok) {
      const rows = (await pr.json()) as Record<string, unknown>[];
      for (const row of rows) profiles.set(String(row.id), row);
    }
  }
  if (truckIds.length) {
    const p = new URLSearchParams({
      select: "id,truck_number,body_type,tyres",
      id: `in.(${truckIds.join(",")})`,
    });
    const tr = await fetch(`${base}/rest/v1/trucks?${p}`, { headers, cache: "no-store" });
    if (tr.ok) {
      const rows = (await tr.json()) as Record<string, unknown>[];
      for (const row of rows) trucks.set(String(row.id), row);
    }
  }

  const tsmIds = new Set(
    listPublishAudit(200)
      .map((r) => r.loadId)
      .filter((id): id is string => Boolean(id)),
  );

  let rows = raw.map((r) => {
    const loadId = String(r.load_id ?? "");
    const load = loadMap.get(loadId) ?? {};
    const profile = profiles.get(String(r.trucker_id ?? "")) ?? {};
    const truck = trucks.get(String(r.truck_id ?? "")) ?? {};
    return mapLiveRow(
      {
        ...r,
        loads: load,
        profiles: profile,
        trucks: truck,
      },
      tsmIds,
    );
  });

  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.truckerName.toLowerCase().includes(q) ||
        r.material.toLowerCase().includes(q) ||
        r.originLabel.toLowerCase().includes(q) ||
        r.destinationLabel.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.loadId.toLowerCase().includes(q),
    );
  }

  return {
    rows,
    total: Number.isFinite(totalFromHeader) ? totalFromHeader : rows.length,
  };
}

export async function listSupplierBookings(input: {
  supplierId?: string;
  statusTab?: BookingInboxTab;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<BookingInboxListResult> {
  const limit = Math.min(Math.max(input.limit ?? 25, 1), 100);
  const offset = Math.max(input.offset ?? 0, 0);
  const supplierId = input.supplierId?.trim();
  const linked = Boolean(supplierId);
  const masked = maskId(supplierId);
  const tab: BookingInboxTab = input.statusTab ?? "pending";

  if (!linked) {
    return {
      items: [],
      source: "mock",
      linked: false,
      supplierIdMasked: null,
      honesty: "Link a TranZfort supplier to see marketplace bookings.",
      total: 0,
      actionsAvailable: false,
    };
  }

  const mode = getBridgeMode();
  if (mode === "live" && isBridgeLiveConfigured()) {
    try {
      const { rows, total } = await fetchLiveBookings({
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
        honesty:
          "Live booking_requests for the linked supplier. Approve/Reject via TSM bridge (service_*).",
        total,
        limit,
        offset,
        actionsAvailable: true,
      };
    } catch (e) {
      return {
        items: [],
        source: "live",
        linked: true,
        supplierIdMasked: masked,
        honesty: e instanceof Error ? e.message : "Failed to load bookings.",
        total: 0,
        actionsAvailable: false,
      };
    }
  }

  let rows = ensureMockRows(supplierId!);
  if (tab === "pending") rows = rows.filter((r) => r.status === "submitted");
  else if (tab === "decided") rows = rows.filter((r) => r.status !== "submitted");
  if (input.search?.trim()) {
    const q = input.search.trim().toLowerCase();
    rows = rows.filter(
      (r) =>
        r.truckerName.toLowerCase().includes(q) ||
        r.material.toLowerCase().includes(q) ||
        r.originLabel.toLowerCase().includes(q) ||
        r.destinationLabel.toLowerCase().includes(q),
    );
  }
  const total = rows.length;
  const page = rows.slice(offset, offset + limit);
  return {
    items: page,
    source: "mock",
    linked: true,
    supplierIdMasked: masked,
    honesty: "Mock booking inbox — approve/reject update local desk only until bridge is live.",
    total,
    limit,
    offset,
    actionsAvailable: true,
  };
}

export async function approveSupplierBooking(input: {
  tsmOrgId: string;
  supplierId?: string;
  bookingId: string;
}): Promise<BookingActionResult> {
  const bookingId = input.bookingId.trim();
  if (!bookingId) {
    return {
      ok: false,
      bookingId,
      status: "submitted",
      source: "mock",
      message: "booking_id_required",
    };
  }

  const mode = getBridgeMode();
  if (mode === "live" && isBridgeLiveConfigured()) {
    try {
      const tripId = await rpcApproveTsmBooking(input.tsmOrgId, bookingId);
      return {
        ok: true,
        bookingId,
        status: "approved",
        tripId,
        source: "live",
        message: "Booking approved on TranZfort.",
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "approve_failed";
      const missingRpc =
        /service_approve_tsm_booking|PGRST202|404|Could not find the function/i.test(msg);
      return {
        ok: false,
        bookingId,
        status: "submitted",
        source: "live",
        message: missingRpc
          ? "Approve bridge RPC missing on TranZfort — apply service_approve_tsm_booking migration."
          : msg,
      };
    }
  }

  const rows = ensureMockRows(input.supplierId ?? "mock");
  const row = rows.find((r) => r.id === bookingId);
  if (!row) {
    return {
      ok: false,
      bookingId,
      status: "submitted",
      source: "mock",
      message: "Booking not found.",
    };
  }
  if (row.status !== "submitted") {
    return {
      ok: false,
      bookingId,
      status: row.status,
      source: "mock",
      message: "Booking not in submitted state.",
    };
  }
  row.status = "approved";
  row.decidedAt = new Date().toISOString();
  row.tripId = `tz-mock-trip-${bookingId.slice(-6)}`;
  row.trucksBooked = Math.min(row.trucksNeeded, row.trucksBooked + 1);
  return {
    ok: true,
    bookingId,
    status: "approved",
    tripId: row.tripId,
    source: "mock",
    message: "Mock approve — not written to TranZfort.",
  };
}

export async function rejectSupplierBooking(input: {
  tsmOrgId: string;
  supplierId?: string;
  bookingId: string;
  reason?: string;
}): Promise<BookingActionResult> {
  const bookingId = input.bookingId.trim();
  if (!bookingId) {
    return {
      ok: false,
      bookingId,
      status: "submitted",
      source: "mock",
      message: "booking_id_required",
    };
  }

  const mode = getBridgeMode();
  if (mode === "live" && isBridgeLiveConfigured()) {
    try {
      await rpcRejectTsmBooking(input.tsmOrgId, bookingId, input.reason);
      return {
        ok: true,
        bookingId,
        status: "rejected",
        source: "live",
        message: "Booking rejected on TranZfort.",
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "reject_failed";
      const missingRpc =
        /service_reject_tsm_booking|PGRST202|404|Could not find the function/i.test(msg);
      return {
        ok: false,
        bookingId,
        status: "submitted",
        source: "live",
        message: missingRpc
          ? "Reject bridge RPC missing on TranZfort — apply service_reject_tsm_booking migration."
          : msg,
      };
    }
  }

  const rows = ensureMockRows(input.supplierId ?? "mock");
  const row = rows.find((r) => r.id === bookingId);
  if (!row) {
    return {
      ok: false,
      bookingId,
      status: "submitted",
      source: "mock",
      message: "Booking not found.",
    };
  }
  if (row.status !== "submitted") {
    return {
      ok: false,
      bookingId,
      status: row.status,
      source: "mock",
      message: "Booking not in submitted state.",
    };
  }
  row.status = "rejected";
  row.decidedAt = new Date().toISOString();
  row.decisionReason = input.reason?.trim() || null;
  return {
    ok: true,
    bookingId,
    status: "rejected",
    source: "mock",
    message: "Mock reject — not written to TranZfort.",
  };
}
