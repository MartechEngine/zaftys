#!/usr/bin/env node
/**
 * Sync TranZfort reference catalogs into TSM local mirror files.
 *
 * - Materials: full `public.materials` via service_role (~839 rows)
 * - Places: deduped index from TZ offline `indian_cities.json` (~66MB → compact)
 *
 * Writes (gitignored):
 *   .data/tz-materials.json
 *   .data/tz-places.json
 *   .data/tz-catalog-meta.json
 *
 * Usage:
 *   node scripts/sync-tz-catalogs.mjs
 *   node scripts/sync-tz-catalogs.mjs --materials-only
 *   node scripts/sync-tz-catalogs.mjs --places-only
 *
 * Env:
 *   TRANZFORT_SUPABASE_URL + TRANZFORT_SERVICE_KEY  (materials)
 *   TRANZFORT_INDIAN_CITIES_PATH  (optional; defaults to sibling tranzfort-lab asset)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataDir = join(root, ".data");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const k = line.slice(0, i).trim();
    if (!process.env[k]) process.env[k] = line.slice(i + 1).trim();
  }
}
loadEnvLocal();

const materialsOnly = process.argv.includes("--materials-only");
const placesOnly = process.argv.includes("--places-only");

const DEFAULT_CITIES_CANDIDATES = [
  resolve(root, "..", "..", "tranzfort-lab", "app", "TranZfort", "assets", "data", "indian_cities.json"),
  resolve("C:/Users/Public/project/tranzfort-lab/app/TranZfort/assets/data/indian_cities.json"),
  resolve(root, "..", "tranzfort-lab", "app", "TranZfort", "assets", "data", "indian_cities.json"),
];

function citiesPath() {
  const env = process.env.TRANZFORT_INDIAN_CITIES_PATH?.trim();
  if (env && existsSync(env)) return env;
  for (const p of DEFAULT_CITIES_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  return "";
}

async function fetchAllMaterials() {
  const base = (process.env.TRANZFORT_SUPABASE_URL ?? "").replace(/\/$/, "");
  const key = (process.env.TRANZFORT_SERVICE_KEY ?? "").trim();
  if (!base || !key) {
    throw new Error("TRANZFORT_SUPABASE_URL and TRANZFORT_SERVICE_KEY required for materials sync.");
  }

  const out = [];
  const page = 500;
  for (let offset = 0; offset < 5000; offset += page) {
    const url =
      `${base}/rest/v1/materials` +
      `?select=code,name_en,name_hi,group_code,keywords,popularity_score,is_active` +
      `&is_active=eq.true&order=popularity_score.desc.nullslast,name_en.asc` +
      `&limit=${page}&offset=${offset}`;
    const res = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        Prefer: "count=exact",
      },
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`materials fetch ${res.status}: ${text.slice(0, 200)}`);
    const rows = JSON.parse(text);
    if (!Array.isArray(rows) || rows.length === 0) break;
    for (const r of rows) {
      out.push({
        code: String(r.code ?? "").trim(),
        nameEn: String(r.name_en ?? "").trim(),
        nameHi: r.name_hi != null ? String(r.name_hi) : null,
        groupCode: r.group_code != null ? String(r.group_code) : null,
        keywords: Array.isArray(r.keywords) ? r.keywords.map(String) : [],
        popularityScore: Number(r.popularity_score ?? 0) || 0,
      });
    }
    if (rows.length < page) break;
  }
  return out.filter((m) => m.code && m.nameEn);
}

/**
 * Build a compact searchable places index.
 * Index both `city` and `district` names (TZ searches city, displays district when set).
 * Rank: city/town place_type > others; higher rank wins per key.
 */
function buildPlacesIndex(raw) {
  if (!Array.isArray(raw)) throw new Error("indian_cities.json must be a JSON array");

  const typeRank = (t) => {
    const s = String(t ?? "").toLowerCase();
    if (s === "city" || s === "town" || s === "urban") return 3;
    if (s === "suburb" || s === "municipality") return 2;
    if (s === "village") return 1;
    return 0;
  };

  /** @type {Map<string, object>} */
  const map = new Map();

  function upsert(name, state, district, latInput, lngInput, placeType, exactCity) {
    const city = String(name ?? "").trim();
    const st = String(state ?? "").trim();
    if (!city || !st) return;
    let lat = Number(latInput);
    let lng = Number(lngInput);
    // Some source rows have GeoJSON-style lng/lat values in the lat/lng columns.
    if (lat >= 65 && lat <= 100 && lng >= 5 && lng <= 40) {
      [lat, lng] = [lng, lat];
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    // India catalog safety: reject coordinates outside the country envelope.
    if (lat < 5 || lat > 40 || lng < 65 || lng > 100) return;
    const key = `${city.toLowerCase()}|${st.toLowerCase()}`;
    const rank = typeRank(placeType);
    // An actual city-name row beats a district alias derived from another village.
    const score = (exactCity ? 100 : 10) + rank;
    const prev = map.get(key);
    if (prev && prev.score >= score) return;
    map.set(key, {
      id: `tz:${key.replace(/\s+/g, "_")}`,
      label: `${city}, ${st}`,
      city,
      state: st,
      district: district || null,
      lat,
      lng,
      placeType: placeType != null ? String(placeType) : null,
      score,
    });
  }

  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const state = String(row.state ?? "").trim();
    const district = String(row.district ?? "").trim();
    const cityRaw = String(row.city ?? "").trim();
    const lat = Number(row.lat);
    const lng = Number(row.lng);
    if (cityRaw) upsert(cityRaw, state, district, lat, lng, row.place_type, true);
    if (district && district.toLowerCase() !== cityRaw.toLowerCase()) {
      // District as its own searchable "city center" (matches TZ display preference).
      upsert(district, state, district, lat, lng, "city", false);
    }
  }

  return [...map.values()]
    .map((entry) => ({
      id: entry.id,
      label: entry.label,
      city: entry.city,
      state: entry.state,
      district: entry.district,
      lat: entry.lat,
      lng: entry.lng,
      placeType: entry.placeType,
    }))
    .sort((a, b) => a.city.localeCompare(b.city) || a.state.localeCompare(b.state));
}

mkdirSync(dataDir, { recursive: true });
const meta = {
  syncedAt: new Date().toISOString(),
  materialsCount: 0,
  placesCount: 0,
  citiesSource: null,
  materialsSource: null,
};

if (!placesOnly) {
  console.log("Syncing materials from TranZfort…");
  const materials = await fetchAllMaterials();
  writeFileSync(
    join(dataDir, "tz-materials.json"),
    JSON.stringify({ syncedAt: meta.syncedAt, items: materials }, null, 0),
  );
  meta.materialsCount = materials.length;
  meta.materialsSource = "tranzfort.materials";
  console.log(`  wrote ${materials.length} materials → .data/tz-materials.json`);
}

if (!materialsOnly) {
  const path = citiesPath();
  if (!path || !existsSync(path)) {
    console.error(
      "Places sync skipped: set TRANZFORT_INDIAN_CITIES_PATH to TZ indian_cities.json\n" +
        `  tried:\n${DEFAULT_CITIES_CANDIDATES.map((p) => `    - ${p}`).join("\n")}`,
    );
    if (placesOnly) process.exit(1);
  } else {
    console.log(`Indexing places from ${path}…`);
    const raw = JSON.parse(readFileSync(path, "utf8"));
    const places = buildPlacesIndex(raw);
    writeFileSync(
      join(dataDir, "tz-places.json"),
      JSON.stringify({ syncedAt: meta.syncedAt, sourcePath: path, items: places }, null, 0),
    );
    meta.placesCount = places.length;
    meta.citiesSource = path;
    console.log(`  wrote ${places.length} places → .data/tz-places.json`);
  }
}

writeFileSync(join(dataDir, "tz-catalog-meta.json"), JSON.stringify(meta, null, 2));
console.log("Done.", meta);
