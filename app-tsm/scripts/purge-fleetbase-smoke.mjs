#!/usr/bin/env node
/**
 * Purge smoke/QA records from the LOCAL Fleetbase instance.
 *
 * The TSM clients/shipments lists read from Fleetbase, so repeated smoke runs
 * leave "Live Client mrryidjv", "Smoke Client …", "Probe customer" style rows
 * that make a pilot login look full of dummy data.
 *
 * TranZfort is never touched. Point FLEETBASE_API_URL at a local instance only.
 *
 * Usage:
 *   node scripts/purge-fleetbase-smoke.mjs --dry-run
 *   node scripts/purge-fleetbase-smoke.mjs
 *   node scripts/purge-fleetbase-smoke.mjs --all      # every order + contact/customer
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dryRun = process.argv.includes("--dry-run");
const purgeAll = process.argv.includes("--all");

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      if (!line || line.trimStart().startsWith("#") || !line.includes("=")) continue;
      const i = line.indexOf("=");
      const k = line.slice(0, i).trim();
      if (!process.env[k]) process.env[k] = line.slice(i + 1).trim();
    }
  } catch {
    /* env already provided */
  }
}
loadEnvLocal();

const BASE = (process.env.FLEETBASE_API_URL ?? "http://localhost:8000/v1").replace(/\/$/, "");
const KEY = (process.env.FLEETBASE_API_KEY ?? "").trim();

if (!KEY) {
  console.error("FLEETBASE_API_KEY missing — nothing to do.");
  process.exit(1);
}
if (!/localhost|127\.0\.0\.1/.test(BASE)) {
  console.error(`Refusing to run against non-local Fleetbase: ${BASE}`);
  process.exit(1);
}

/** Names written by the smoke/QA scripts. */
const SMOKE_NAME =
  /^(smoke|live|phaseb|probe|test|demo|qa)\b/i;
/** Trailing generated suffix, e.g. "Live Client mrryidjv" / "… 411830833". */
const SMOKE_SUFFIX = /\s(m[a-z0-9]{6,}|\d{6,})$/i;
/**
 * Orders carry no name — only a Fleetbase-generated `internal_id` (ZA######).
 * Every order in a local instance came from a smoke run, so match the prefix.
 */
const SMOKE_ORDER = /^ZA\d+$/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fleetbase 400s sporadically under load — retry a few times. */
async function call(method, path) {
  let lastErr = "";
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method,
        headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json" },
      });
      if (res.ok) {
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      }
      lastErr = `${res.status} ${(await res.text()).slice(0, 160)}`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
    await sleep(600 * (attempt + 1));
  }
  throw new Error(`${method} ${path} failed: ${lastErr}`);
}

/** Fleetbase returns a bare array here, and caps `limit` well under 100. */
async function listAll(resource) {
  const out = [];
  const pageSize = 25;
  for (let offset = 0; offset < 2000; offset += pageSize) {
    const page = await call("GET", `/${resource}?limit=${pageSize}&offset=${offset}`);
    const rows = Array.isArray(page) ? page : (page?.data ?? []);
    out.push(...rows);
    if (rows.length < pageSize) break;
    await sleep(200);
  }
  return out;
}

function isSmoke(row, resource) {
  if (purgeAll) return true;
  if (resource === "orders") return SMOKE_ORDER.test(String(row?.internal_id ?? ""));
  const name = String(row?.name ?? row?.internal_id ?? "");
  return SMOKE_NAME.test(name) || SMOKE_SUFFIX.test(name);
}

async function purge(resource) {
  let rows = [];
  try {
    rows = await listAll(resource);
  } catch (e) {
    console.log(`${resource}: skipped (${e instanceof Error ? e.message : e})`);
    return { deleted: 0, kept: 0 };
  }

  const doomed = rows.filter((r) => isSmoke(r, resource));
  const keptRows = rows.filter((r) => !isSmoke(r, resource));
  console.log(
    `${dryRun ? "[dry-run] " : ""}${resource}: ${doomed.length} to delete, ${keptRows.length} kept (of ${rows.length})`,
  );
  for (const row of doomed.slice(0, 5)) {
    console.log(`     del  ${row.id} ${row.name ?? row.internal_id ?? ""}`);
  }
  for (const row of keptRows.slice(0, 5)) {
    console.log(`     keep ${row.id} ${row.name ?? row.internal_id ?? ""}`);
  }

  if (dryRun) return { deleted: 0, kept: keptRows.length };

  let deleted = 0;
  for (const row of doomed) {
    try {
      await call("DELETE", `/${resource}/${row.id}`);
      deleted += 1;
    } catch (e) {
      console.log(`     ! ${row.id}: ${e instanceof Error ? e.message : e}`);
    }
    await sleep(120);
  }
  console.log(`${resource}: deleted ${deleted}`);
  return { deleted, kept: keptRows.length };
}

console.log(`Fleetbase: ${BASE}${purgeAll ? " (--all)" : ""}`);

// Orders first — they reference the contacts below.
// `customers` is POST-only in this Fleetbase build; deleting the contact is enough.
for (const resource of ["orders", "contacts"]) {
  await purge(resource);
}

console.log(dryRun ? "Dry run only." : "Done. Restart Next.js so caches clear.");
console.log("TranZfort was not modified.");
