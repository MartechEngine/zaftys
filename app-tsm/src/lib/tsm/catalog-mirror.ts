/**
 * Local mirror of TranZfort materials + offline places.
 * Populated by `scripts/sync-tz-catalogs.mjs` into `.data/tz-*.json`.
 */

import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import type { MaterialSuggestion, PlaceSuggestion } from "@/lib/tsm/catalog-types";

export type MirroredMaterial = MaterialSuggestion & {
  keywords?: string[];
  popularityScore?: number;
};

export type MirroredPlace = {
  id: string;
  label: string;
  city: string;
  state: string;
  district?: string | null;
  lat: number;
  lng: number;
  placeType?: string | null;
};

export type CatalogMirrorMeta = {
  syncedAt: string | null;
  materialsCount: number;
  placesCount: number;
  materialsPath: string | null;
  placesPath: string | null;
  materialsLoaded: boolean;
  placesLoaded: boolean;
};

const DATA_DIR = join(process.cwd(), ".data");

let materialsCache: MirroredMaterial[] | null = null;
let placesCache: MirroredPlace[] | null = null;
let materialsMtime = 0;
let placesMtime = 0;

function readJsonFile<T>(path: string): T | null {
  try {
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return null;
  }
}

function loadMaterials(): MirroredMaterial[] {
  const path = join(DATA_DIR, "tz-materials.json");
  const mtime = existsSync(path) ? statSync(path).mtimeMs : 0;
  if (materialsCache && mtime === materialsMtime) return materialsCache;

  const raw = readJsonFile<{ items?: unknown[] }>(path);
  const items = Array.isArray(raw?.items) ? raw.items : [];
  materialsCache = items
    .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
    .map((row) => ({
      code: String(row.code ?? "").trim(),
      nameEn: String(row.nameEn ?? row.name_en ?? "").trim(),
      nameHi: row.nameHi != null || row.name_hi != null ? String(row.nameHi ?? row.name_hi) : null,
      groupCode:
        row.groupCode != null || row.group_code != null
          ? String(row.groupCode ?? row.group_code)
          : null,
      keywords: Array.isArray(row.keywords) ? row.keywords.map(String) : [],
      popularityScore: Number(row.popularityScore ?? row.popularity_score ?? 0) || 0,
    }))
    .filter((m) => m.code && m.nameEn);
  materialsMtime = mtime;
  return materialsCache;
}

function loadPlaces(): MirroredPlace[] {
  const path = join(DATA_DIR, "tz-places.json");
  const mtime = existsSync(path) ? statSync(path).mtimeMs : 0;
  if (placesCache && mtime === placesMtime) return placesCache;

  const raw = readJsonFile<{ items?: unknown[] }>(path);
  const items = Array.isArray(raw?.items) ? raw.items : [];
  placesCache = items
    .filter((row): row is Record<string, unknown> => !!row && typeof row === "object")
    .map((row) => ({
      id: String(row.id ?? "").trim(),
      label: String(row.label ?? "").trim(),
      city: String(row.city ?? "").trim(),
      state: String(row.state ?? "").trim(),
      district: row.district != null ? String(row.district) : null,
      lat: Number(row.lat),
      lng: Number(row.lng),
      placeType: row.placeType != null ? String(row.placeType) : null,
    }))
    .filter(
      (p) =>
        p.city &&
        p.state &&
        Number.isFinite(p.lat) &&
        Number.isFinite(p.lng),
    );
  placesMtime = mtime;
  return placesCache;
}

export function getCatalogMirrorMeta(): CatalogMirrorMeta {
  const materialsPath = join(DATA_DIR, "tz-materials.json");
  const placesPath = join(DATA_DIR, "tz-places.json");
  const metaFile = readJsonFile<{ syncedAt?: string }>(join(DATA_DIR, "tz-catalog-meta.json"));
  const materials = existsSync(materialsPath) ? loadMaterials() : [];
  const places = existsSync(placesPath) ? loadPlaces() : [];
  return {
    syncedAt: metaFile?.syncedAt ?? null,
    materialsCount: materials.length,
    placesCount: places.length,
    materialsPath: existsSync(materialsPath) ? materialsPath : null,
    placesPath: existsSync(placesPath) ? placesPath : null,
    materialsLoaded: materials.length > 0,
    placesLoaded: places.length > 0,
  };
}

export function searchMirroredMaterials(query: string, limit = 12): MaterialSuggestion[] {
  const q = query.trim().toLowerCase();
  const all = loadMaterials();
  if (!all.length) return [];

  const scored = all
    .map((m) => {
      const name = m.nameEn.toLowerCase();
      const code = m.code.toLowerCase();
      const keywords = (m.keywords ?? []).map((k) => k.toLowerCase());
      let score = 0;
      if (!q) {
        score = m.popularityScore ?? 0;
      } else if (name === q || code === q) {
        score = 1000 + (m.popularityScore ?? 0);
      } else if (name.startsWith(q) || code.startsWith(q)) {
        score = 500 + (m.popularityScore ?? 0);
      } else if (name.includes(q) || code.includes(q)) {
        score = 200 + (m.popularityScore ?? 0);
      } else if (keywords.some((k) => k.includes(q))) {
        score = 100 + (m.popularityScore ?? 0);
      } else {
        return null;
      }
      return { m, score };
    })
    .filter((x): x is { m: MirroredMaterial; score: number } => x != null)
    .sort((a, b) => b.score - a.score || a.m.nameEn.localeCompare(b.m.nameEn))
    .slice(0, limit);

  return scored.map(({ m }) => ({
    code: m.code,
    nameEn: m.nameEn,
    nameHi: m.nameHi,
    groupCode: m.groupCode,
  }));
}

export function searchMirroredPlaces(query: string, limit = 10): PlaceSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const all = loadPlaces();
  if (!all.length) return [];

  const scored = all
    .map((p) => {
      const city = p.city.toLowerCase();
      const state = p.state.toLowerCase();
      const label = p.label.toLowerCase();
      let score = 0;
      if (city === q) score = 1000;
      else if (city.startsWith(q)) score = 500;
      else if (city.includes(q)) score = 200;
      else if (state.startsWith(q) || label.includes(q)) score = 50;
      else return null;
      return { p, score };
    })
    .filter((x): x is { p: MirroredPlace; score: number } => x != null)
    .sort((a, b) => b.score - a.score || a.p.city.localeCompare(b.p.city))
    .slice(0, limit);

  return scored.map(({ p }) => ({
    id: p.id,
    label: p.label,
    city: p.city,
    state: p.state,
    lat: p.lat,
    lng: p.lng,
    source: "tz-offline" as const,
  }));
}

export function resolveMirroredPlace(input: {
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
  label?: string;
}): PlaceSuggestion | null {
  const city = (input.city ?? "").trim();
  if (!city) return null;

  const all = loadPlaces();
  const state = (input.state ?? "").trim().toLowerCase();
  const hit = all.find((p) => {
    if (p.city.toLowerCase() !== city.toLowerCase()) return false;
    if (state && p.state.toLowerCase() !== state) return false;
    return true;
  });

  if (hit) {
    return {
      id: hit.id,
      label: input.label?.trim() || hit.label,
      city: hit.city,
      state: hit.state,
      lat: Number.isFinite(input.lat) ? Number(input.lat) : hit.lat,
      lng: Number.isFinite(input.lng) ? Number(input.lng) : hit.lng,
      source: "tz-offline",
    };
  }

  if (Number.isFinite(input.lat) && Number.isFinite(input.lng)) {
    return {
      id: `resolved:${city.toLowerCase()}`,
      label: input.label?.trim() || `${city}${input.state ? `, ${input.state}` : ""}`,
      city,
      state: input.state?.trim() || "",
      lat: Number(input.lat),
      lng: Number(input.lng),
      source: "resolved",
    };
  }

  return null;
}
