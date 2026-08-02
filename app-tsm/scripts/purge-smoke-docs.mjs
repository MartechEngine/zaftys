#!/usr/bin/env node
/**
 * Purge local smoke/QA artifacts from app_documents.
 *
 * Repeated `smoke:local` / `smoke:live` runs leave rows behind ("Smoke Client …",
 * "Live Vendor …", "PhaseB Client …"), which is what makes a fresh pilot login
 * look full of dummy data. TranZfort is never touched — this is the local TSM DB.
 *
 * Keeps auth (auth_users/user_passwords), the TranZfort org link (tsm_org),
 * and sync bookkeeping unless --all is passed.
 *
 * Usage:
 *   node scripts/purge-smoke-docs.mjs --dry-run
 *   node scripts/purge-smoke-docs.mjs
 *   node scripts/purge-smoke-docs.mjs --all       # every operational collection
 */
import postgres from "postgres";

const dryRun = process.argv.includes("--dry-run");
const purgeAll = process.argv.includes("--all");

/** Never dropped: identity + the TZ supplier link the pilot depends on. */
const PROTECTED = new Set([
  "auth_users",
  "user_passwords",
  "tsm_org",
  "org_profile",
  "sync_state",
]);

/** Payload labels written by the smoke scripts. */
const SMOKE_LABEL = /^(smoke|live|phaseb|demo|test)\b/i;
/** Ids minted by the smoke scripts, e.g. c-mrp3af3l, vnd-mrs1ktjk. */
const SMOKE_ID = /^[a-z]+-m[a-z0-9]{8,}$/i;

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1, connect_timeout: 5 });

function labelOf(payload) {
  if (!payload || typeof payload !== "object") return "";
  return String(
    payload.name ?? payload.legalName ?? payload.title ?? payload.number ?? "",
  );
}

try {
  const rows = await sql`select collection, id, payload from app_documents`;
  const doomed = rows.filter((r) => {
    if (PROTECTED.has(r.collection)) return false;
    if (purgeAll) return true;
    return SMOKE_LABEL.test(labelOf(r.payload)) || SMOKE_ID.test(String(r.id));
  });

  const byCollection = new Map();
  for (const r of doomed) {
    byCollection.set(r.collection, (byCollection.get(r.collection) ?? 0) + 1);
  }
  for (const [collection, n] of [...byCollection].sort((a, b) => b[1] - a[1])) {
    console.log(`${dryRun ? "[dry-run] " : ""}${String(collection).padEnd(30)} ${n}`);
  }
  console.log("-".repeat(40));
  console.log(`${dryRun ? "would delete" : "deleting"} ${doomed.length} of ${rows.length} docs`);

  if (!dryRun && doomed.length) {
    const ids = doomed.map((r) => r.id);
    for (let i = 0; i < ids.length; i += 500) {
      const chunk = ids.slice(i, i + 500);
      await sql`delete from app_documents where id = any(${chunk})`;
    }
    console.log("Done. Restart Next.js so in-memory stores rehydrate.");
  }
  console.log("TranZfort was not modified.");
} catch (e) {
  console.error("purge failed:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
