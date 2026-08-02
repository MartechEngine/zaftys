#!/usr/bin/env node
/**
 * Pilot cleanup for TSM local/dev DB — does NOT touch TranZfort.
 *
 * - Truncates network_listings + network_offers (mock Live rows)
 * - Deletes tsm_publish_audit app_documents
 * - Resets tsm_org to a clean unlinked default
 * - Optional --prune-auth: keep only allowlisted auth_users / passwords / auth-seed
 *
 * Usage:
 *   node scripts/pilot-cleanup-tsm.mjs --dry-run
 *   node scripts/pilot-cleanup-tsm.mjs
 *   node scripts/pilot-cleanup-tsm.mjs --prune-auth
 *   node scripts/pilot-cleanup-tsm.mjs --keep-emails=admin@zaftys.com,dispatcher@zaftys.com
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = join(__dirname, "..", ".data", "auth-seed.json");

const DEFAULT_KEEP = [
  "admin@zaftys.com",
  "dispatcher@zaftys.com",
  "fleet@zaftys.com",
];

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function argValue(name) {
  const prefix = `--${name}=`;
  const hit = process.argv.find((a) => a.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

const dryRun = hasFlag("dry-run");
const pruneAuth = hasFlag("prune-auth");
const keepArg = argValue("keep-emails");
const keepEmails = new Set(
  (keepArg || DEFAULT_KEEP.join(","))
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1 });

const CLEAN_ORG = {
  id: "org_zaftys_local",
  legalName: "Pilot Company",
  tradeName: "Pilot",
  mainContactName: "Dispatcher",
  superLoadAutoPolicy: "paid_tsm_auto_activate",
};

function log(msg) {
  console.log(`${dryRun ? "[dry-run] " : ""}${msg}`);
}

try {
  log(`DATABASE_URL host target (local TSM only)`);
  log(`Keep emails: ${[...keepEmails].join(", ")}`);

  if (dryRun) {
    const listings = await sql`select count(*)::int as n from network_listings`;
    const offers = await sql`select count(*)::int as n from network_offers`;
    const audit = await sql`
      select count(*)::int as n from app_documents where collection = 'tsm_publish_audit'
    `;
    const org = await sql`
      select count(*)::int as n from app_documents where collection = 'tsm_org'
    `;
    log(`Would truncate network_listings (${listings[0].n}) + network_offers (${offers[0].n})`);
    log(`Would delete tsm_publish_audit docs (${audit[0].n})`);
    log(`Would reset tsm_org docs (${org[0].n}) → clean unlinked default`);
    if (pruneAuth) {
      const users = await sql`
        select id, payload->>'email' as email from app_documents where collection = 'auth_users'
      `;
      const drop = users.filter((u) => !keepEmails.has(String(u.email || "").toLowerCase()));
      log(`Would prune ${drop.length} auth_users (keep ${users.length - drop.length})`);
    } else {
      log(`Auth prune skipped (pass --prune-auth to enable)`);
    }
  } else {
    await sql`truncate table network_offers, network_listings`;
    log(`Truncated network_offers + network_listings`);

    const delAudit = await sql`
      delete from app_documents where collection = 'tsm_publish_audit' returning id
    `;
    log(`Deleted ${delAudit.length} tsm_publish_audit document(s)`);

    await sql`delete from app_documents where collection = 'tsm_org'`;
    await sql`
      insert into app_documents (id, collection, payload, updated_at)
      values (${CLEAN_ORG.id}, 'tsm_org', ${sql.json(CLEAN_ORG)}, now())
    `;
    log(`Reset tsm_org → ${CLEAN_ORG.id} (unlinked, tradeName=${CLEAN_ORG.tradeName})`);

    if (pruneAuth) {
      const users = await sql`
        select id, payload->>'email' as email from app_documents where collection = 'auth_users'
      `;
      const dropIds = users
        .filter((u) => !keepEmails.has(String(u.email || "").toLowerCase()))
        .map((u) => u.id);
      if (dropIds.length) {
        const removed = await sql`
          delete from app_documents
          where collection = 'auth_users' and id = any(${dropIds})
          returning id
        `;
        log(`Pruned ${removed.length} auth_users`);
      } else {
        log(`No auth_users outside allowlist`);
      }

      const pw = await sql`
        select id from app_documents where collection = 'user_passwords'
      `;
      const dropPw = pw
        .map((r) => r.id)
        .filter((id) => !keepEmails.has(String(id).toLowerCase()));
      if (dropPw.length) {
        const removedPw = await sql`
          delete from app_documents
          where collection = 'user_passwords' and id = any(${dropPw})
          returning id
        `;
        log(`Pruned ${removedPw.length} user_passwords`);
      }

      if (existsSync(seedPath)) {
        try {
          const raw = JSON.parse(readFileSync(seedPath, "utf8"));
          const nextUsers = Array.isArray(raw.users)
            ? raw.users.filter((u) => keepEmails.has(String(u.email || "").toLowerCase()))
            : [];
          const nextPasswords =
            raw.passwords && typeof raw.passwords === "object"
              ? Object.fromEntries(
                  Object.entries(raw.passwords).filter(([email]) =>
                    keepEmails.has(email.toLowerCase()),
                  ),
                )
              : {};
          mkdirSync(dirname(seedPath), { recursive: true });
          writeFileSync(
            seedPath,
            JSON.stringify({ users: nextUsers, passwords: nextPasswords }, null, 2),
          );
          log(`Rewrote .data/auth-seed.json (kept ${nextUsers.length} user(s))`);
        } catch (e) {
          console.warn(`Could not rewrite auth-seed.json:`, e instanceof Error ? e.message : e);
        }
      }
    }
  }

  log(`Done. Restart Next.js so in-memory stores rehydrate.`);
  log(`Reminder: set TSM_DEMO_UI=0 and keep TSM_TRANZFORT_BRIDGE_MODE=mock until live smoke.`);
  log(`TranZfort prod was not modified.`);
} catch (e) {
  console.error("pilot-cleanup failed:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
