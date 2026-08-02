/**
 * Server-only TranZfort bridge RPC client (service_role).
 * Contract: tranzfort-lab/docs/tsm-bridge-rpc-contract.md
 */

import type { TsmOrgAccount } from "@/lib/tsm/org";
import type { TsmPostDraft } from "@/lib/tsm/post-draft";
import { draftReadyForPublish } from "@/lib/tsm/post-draft";

export type BridgeMode = "mock" | "live";

export function getBridgeMode(): BridgeMode {
  return process.env.TSM_TRANZFORT_BRIDGE_MODE === "live" ? "live" : "mock";
}

export function isBridgeLiveConfigured(): boolean {
  return Boolean(
    process.env.TRANZFORT_SUPABASE_URL?.trim() &&
      process.env.TRANZFORT_SERVICE_KEY?.trim(),
  );
}

function rpcBase(): string {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("TRANZFORT_SUPABASE_URL is not set");
  return `${base}/rest/v1/rpc`;
}

function rpcHeaders(): HeadersInit {
  const key = process.env.TRANZFORT_SERVICE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function callRpc<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${rpcBase()}/${name}`, {
    method: "POST",
    headers: rpcHeaders(),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${name} failed (${res.status}): ${text.slice(0, 400)}`);
  }
  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export type LinkSupplierInput = {
  tsmOrgId: string;
  supplierId: string;
  companyName: string;
  mainContactName: string;
  autoPolicy?: "paid_tsm_auto_activate" | "manual";
  dailyPostLimit?: number;
  notes?: string;
};

export type RemoteTsmOrgSupplierLink = {
  tsmOrgId: string;
  supplierId: string;
  companyName: string;
  mainContactName: string;
  autoPolicy: string;
  dailyPostLimit: number;
};

/** Read the authoritative TZ org→supplier map. Local `tsm_org` is not proof of a live link. */
export async function getRemoteTsmOrgSupplierLink(
  tsmOrgId: string,
): Promise<RemoteTsmOrgSupplierLink | null> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("TRANZFORT_SUPABASE_URL is not set");
  const orgId = tsmOrgId.toLowerCase().trim();
  const params = new URLSearchParams({
    select:
      "tsm_org_id,supplier_id,company_name,main_contact_name,super_load_auto_policy,daily_post_limit",
    tsm_org_id: `eq.${orgId}`,
    limit: "1",
  });
  const res = await fetch(`${base}/rest/v1/tsm_org_supplier_map?${params}`, {
    headers: rpcHeaders(),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`tsm_org_supplier_map lookup failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const rows = JSON.parse(text) as Array<Record<string, unknown>>;
  const row = rows[0];
  if (!row) return null;
  return {
    tsmOrgId: String(row.tsm_org_id ?? ""),
    supplierId: String(row.supplier_id ?? ""),
    companyName: String(row.company_name ?? ""),
    mainContactName: String(row.main_contact_name ?? ""),
    autoPolicy: String(row.super_load_auto_policy ?? ""),
    dailyPostLimit: Number(row.daily_post_limit ?? 0),
  };
}

/** Lookup by supplier — map is 1:1 unique on supplier_id. */
export async function getRemoteTsmOrgSupplierLinkBySupplier(
  supplierId: string,
): Promise<RemoteTsmOrgSupplierLink | null> {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("TRANZFORT_SUPABASE_URL is not set");
  const id = supplierId.toLowerCase().trim();
  const params = new URLSearchParams({
    select:
      "tsm_org_id,supplier_id,company_name,main_contact_name,super_load_auto_policy,daily_post_limit",
    supplier_id: `eq.${id}`,
    limit: "1",
  });
  const res = await fetch(`${base}/rest/v1/tsm_org_supplier_map?${params}`, {
    headers: rpcHeaders(),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(
      `tsm_org_supplier_map by supplier failed (${res.status}): ${text.slice(0, 300)}`,
    );
  }
  const rows = JSON.parse(text) as Array<Record<string, unknown>>;
  const row = rows[0];
  if (!row) return null;
  return {
    tsmOrgId: String(row.tsm_org_id ?? ""),
    supplierId: String(row.supplier_id ?? ""),
    companyName: String(row.company_name ?? ""),
    mainContactName: String(row.main_contact_name ?? ""),
    autoPolicy: String(row.super_load_auto_policy ?? ""),
    dailyPostLimit: Number(row.daily_post_limit ?? 0),
  };
}

export async function rpcUpsertTsmOrgSupplierLink(
  input: LinkSupplierInput,
): Promise<string> {
  const supplierId = await callRpc<string>("service_upsert_tsm_org_supplier_link", {
    p_tsm_org_id: input.tsmOrgId.toLowerCase().trim(),
    p_supplier_id: input.supplierId,
    p_company_name: input.companyName,
    p_main_contact_name: input.mainContactName,
    p_auto_policy: input.autoPolicy ?? "paid_tsm_auto_activate",
    p_daily_post_limit: input.dailyPostLimit ?? 100,
    p_notes: input.notes ?? null,
  });
  return String(supplierId);
}

/**
 * Ensure TZ has the authoritative map row and that it matches TSM's intended supplier.
 * Safe to call before publish: the upsert RPC is idempotent for the same org/supplier.
 *
 * If this supplier is already mapped to a *different* org id, returns that existing link
 * without attempting a conflicting upsert (supplier_id UNIQUE).
 */
export async function ensureRemoteTsmOrgSupplierLink(
  input: LinkSupplierInput,
): Promise<RemoteTsmOrgSupplierLink> {
  const expectedOrg = input.tsmOrgId.toLowerCase().trim();
  const expectedSupplier = input.supplierId.toLowerCase().trim();

  const bySupplier = await getRemoteTsmOrgSupplierLinkBySupplier(expectedSupplier);
  if (bySupplier) {
    if (bySupplier.tsmOrgId.toLowerCase() !== expectedOrg) {
      // Already linked elsewhere (e.g. pilot org_zaftys_local) — reuse, do not 409.
      return bySupplier;
    }
    // Same org: refresh company fields via upsert (idempotent).
    await rpcUpsertTsmOrgSupplierLink(input);
    const refreshed = await getRemoteTsmOrgSupplierLink(expectedOrg);
    if (!refreshed) throw new Error(`live_link_missing_after_upsert: ${expectedOrg}`);
    return refreshed;
  }

  let remote = await getRemoteTsmOrgSupplierLink(expectedOrg);
  if (!remote || remote.supplierId.toLowerCase() !== expectedSupplier) {
    await rpcUpsertTsmOrgSupplierLink(input);
    remote = await getRemoteTsmOrgSupplierLink(expectedOrg);
  }
  if (!remote) {
    throw new Error(`live_link_missing_after_upsert: ${expectedOrg}`);
  }
  if (remote.supplierId.toLowerCase() !== expectedSupplier) {
    throw new Error(
      `live_link_supplier_mismatch: expected ${expectedSupplier}, got ${remote.supplierId}`,
    );
  }
  return remote;
}

export async function rpcPublishTsmLoadAsSuper(
  org: TsmOrgAccount,
  draft: TsmPostDraft,
): Promise<string> {
  const gate = draftReadyForPublish(draft);
  if (!gate.ok) throw new Error(gate.reason ?? "draft_invalid");

  const loadId = await callRpc<string>("service_publish_tsm_load_as_super", {
    p_tsm_org_id: org.id.toLowerCase().trim(),
    p_idempotency_key: draft.idempotencyKey,
    p_origin_label: draft.originLabel,
    p_origin_city: draft.originCity,
    p_origin_state: draft.originState,
    p_origin_lat: draft.originLat,
    p_origin_lng: draft.originLng,
    p_destination_label: draft.destinationLabel,
    p_destination_city: draft.destinationCity,
    p_destination_state: draft.destinationState,
    p_destination_lat: draft.destinationLat,
    p_destination_lng: draft.destinationLng,
    p_route_distance_km: draft.routeDistanceKm,
    p_route_duration_minutes: draft.routeDurationMinutes,
    p_route_polyline: draft.routePolyline || "",
    p_route_snapshot_source: draft.routeSnapshotSource || "tsm",
    p_material: draft.material,
    p_weight_tonnes: draft.weightTonnes,
    p_required_body_type: draft.requiredBodyType,
    p_required_tyres: draft.requiredTyres,
    p_trucks_needed: draft.trucksNeeded,
    p_price_amount: draft.priceAmount,
    p_price_type: draft.priceType,
    p_advance_percentage: draft.advancePercentage,
    p_pickup_date: draft.pickupDate,
    p_listing_duration: draft.listingDuration,
    p_material_code: draft.materialCode,
    p_required_vehicle_category_code: draft.requiredVehicleCategoryCode,
    p_required_body_style_codes: draft.requiredBodyStyleCodes,
    p_required_configuration_codes: draft.requiredConfigurationCodes,
    p_required_vehicle_category_codes: draft.requiredVehicleCategoryCodes,
  });
  return String(loadId);
}

/** Approve a marketplace booking for the linked org supplier (creates TZ trip). */
export async function rpcApproveTsmBooking(
  tsmOrgId: string,
  bookingId: string,
): Promise<string> {
  const tripId = await callRpc<string>("service_approve_tsm_booking", {
    p_tsm_org_id: tsmOrgId.toLowerCase().trim(),
    p_booking_id: bookingId,
  });
  return String(tripId);
}

/** Reject a marketplace booking for the linked org supplier. */
export async function rpcRejectTsmBooking(
  tsmOrgId: string,
  bookingId: string,
  reason?: string | null,
): Promise<void> {
  await callRpc<null>("service_reject_tsm_booking", {
    p_tsm_org_id: tsmOrgId.toLowerCase().trim(),
    p_booking_id: bookingId,
    p_reason: reason?.trim() || null,
  });
}

/** Cancel a marketplace load for the linked org supplier. */
export async function rpcCancelTsmLoad(
  tsmOrgId: string,
  loadId: string,
): Promise<void> {
  await callRpc<null>("service_cancel_tsm_load", {
    p_tsm_org_id: tsmOrgId.toLowerCase().trim(),
    p_load_id: loadId,
  });
}
