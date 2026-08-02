/**
 * Server helpers to fetch TranZfort catalog/materials for the publish form.
 * Live RPCs when secrets exist; otherwise TSM stubs (frontend-first).
 * In TSM_TRANZFORT_BRIDGE_MODE=live, never substitute stub codes that could hit prod.
 */

import {
  stubSearchMaterials,
  stubVehicleCatalog,
} from "@/lib/tsm/catalog-stub";
import type {
  MaterialSuggestion,
  VehicleCatalog,
} from "@/lib/tsm/catalog-types";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import { searchMirroredMaterials, getCatalogMirrorMeta } from "@/lib/tsm/catalog-mirror";

function rpcBase(): string | null {
  const base = process.env.TRANZFORT_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/rest/v1/rpc`;
}

function rpcHeaders(): HeadersInit | null {
  const key = process.env.TRANZFORT_SERVICE_KEY ?? process.env.TRANZFORT_ANON_KEY ?? "";
  if (!key) return null;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function callRpc(name: string, body: Record<string, unknown> = {}): Promise<unknown> {
  const base = rpcBase();
  const headers = rpcHeaders();
  if (!base || !headers) throw new Error("tranzfort_rpc_not_configured");

  const res = await fetch(`${base}/${name}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${name} failed (${res.status}): ${text.slice(0, 300)}`);
  }
  if (!text) return null;
  return JSON.parse(text) as unknown;
}

function mapCatalog(raw: unknown): VehicleCatalog {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const categoriesRaw = Array.isArray(payload.categories) ? payload.categories : [];
  const bodyStylesRaw = Array.isArray(payload.body_styles) ? payload.body_styles : [];
  const configurationsRaw = Array.isArray(payload.configurations)
    ? payload.configurations
    : [];

  return {
    source: "live",
    fetchedAt: new Date().toISOString(),
    categories: categoriesRaw
      .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
      .map((row) => ({
        code: String(row.code ?? "").trim(),
        nameEn: String(row.name_en ?? "").trim(),
        nameHi: row.name_hi != null ? String(row.name_hi) : null,
        uiMode: row.ui_mode != null ? String(row.ui_mode) : undefined,
      }))
      .filter((c) => c.code && c.nameEn),
    bodyStyles: bodyStylesRaw
      .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
      .map((row) => ({
        categoryCode: String(row.category_code ?? "").trim(),
        code: String(row.code ?? "").trim(),
        nameEn: String(row.name_en ?? "").trim(),
        nameHi: row.name_hi != null ? String(row.name_hi) : null,
      }))
      .filter((c) => c.categoryCode && c.code),
    configurations: configurationsRaw
      .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
      .map((row) => ({
        code: String(row.code ?? "").trim(),
        categoryCode: String(row.category_code ?? "").trim(),
        bodyStyleCode: row.body_style_code != null ? String(row.body_style_code) : null,
        labelEn: String(row.label_en ?? row.code ?? "").trim(),
        labelHi: row.label_hi != null ? String(row.label_hi) : null,
        wheelsW: row.wheels_w != null ? Number(row.wheels_w) : null,
        lengthFt: row.length_ft != null ? String(row.length_ft) : null,
        loadingTonMin: row.loading_ton_min != null ? Number(row.loading_ton_min) : null,
        loadingTonMax: row.loading_ton_max != null ? Number(row.loading_ton_max) : null,
        isSpecial: row.is_special === true,
        postSelectable: row.post_selectable !== false,
        isPostEnvelope: row.is_post_envelope === true,
        matchGroupCode: row.match_group_code != null ? String(row.match_group_code) : null,
      }))
      .filter((c) => c.code && c.categoryCode),
  };
}

function mapMaterials(raw: unknown): MaterialSuggestion[] {
  const rows = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as { data?: unknown }).data)
      ? ((raw as { data: unknown[] }).data)
      : [];
  return rows
    .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
    .map((row) => ({
      code: String(row.code ?? "").trim(),
      nameEn: String(row.name_en ?? "").trim(),
      nameHi: row.name_hi != null ? String(row.name_hi) : null,
      groupCode: row.group_code != null ? String(row.group_code) : null,
    }))
    .filter((m) => m.code && m.nameEn);
}

function emptyStubCatalog(): VehicleCatalog {
  return {
    source: "stub",
    fetchedAt: new Date().toISOString(),
    categories: [],
    bodyStyles: [],
    configurations: [],
  };
}

export async function fetchVehicleCatalog(): Promise<VehicleCatalog> {
  const liveMode = getBridgeMode() === "live";

  if (!isBridgeLiveConfigured()) {
    return liveMode ? emptyStubCatalog() : stubVehicleCatalog();
  }

  try {
    const raw = await callRpc("get_vehicle_catalog");
    const catalog = mapCatalog(raw);
    if (catalog.configurations.length === 0) {
      // Live mode: do not substitute stub codes that could be published to prod.
      return liveMode ? emptyStubCatalog() : stubVehicleCatalog();
    }
    return catalog;
  } catch {
    return liveMode ? emptyStubCatalog() : stubVehicleCatalog();
  }
}

export async function fetchMaterials(query: string, limit = 12): Promise<{
  items: MaterialSuggestion[];
  source: "live" | "stub" | "mirror";
}> {
  const liveMode = getBridgeMode() === "live";

  // Local-first: full materials mirror from sync-tz-catalogs.
  const mirrored = searchMirroredMaterials(query, limit);
  if (mirrored.length > 0) {
    return { items: mirrored, source: "mirror" };
  }

  // Empty query with a loaded mirror → return popular subset already handled above.
  // If mirror exists but query missed, don't fall through to stub in live mode.
  const meta = getCatalogMirrorMeta();
  if (meta.materialsLoaded) {
    return { items: [], source: "mirror" };
  }

  if (!isBridgeLiveConfigured()) {
    if (liveMode) return { items: [], source: "stub" };
    return { items: stubSearchMaterials(query, limit), source: "stub" };
  }

  try {
    const raw = await callRpc("search_materials", {
      p_query: query.trim(),
      p_limit: limit,
    });
    const items = mapMaterials(raw);
    if (items.length === 0 && query.trim().length >= 2) {
      if (liveMode) return { items: [], source: "live" };
      return { items: stubSearchMaterials(query, limit), source: "stub" };
    }
    return { items, source: "live" };
  } catch {
    if (liveMode) return { items: [], source: "stub" };
    return { items: stubSearchMaterials(query, limit), source: "stub" };
  }
}
