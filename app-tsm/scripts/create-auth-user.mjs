#!/usr/bin/env node
/**
 * Create / update an auth-lite login user.
 * Writes to Postgres when available; always also writes `.data/auth-seed.json` (gitignored).
 *
 * Usage:
 *   node scripts/create-auth-user.mjs --email user@example.com --password '***' --role admin --name "Name" --tsm-org-id org_zaftys_local
 */
import { randomBytes, scryptSync } from "crypto";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = join(__dirname, "..", ".data", "auth-seed.json");

function arg(name, fallback = "") {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return fallback;
}

const email = arg("email").trim().toLowerCase();
const password = arg("password");
const role = arg("role", "admin");
const name = arg("name", email.split("@")[0] || "User");
const tsmOrgId = arg("tsm-org-id").trim().toLowerCase();
const supplierId = arg("supplier-id").trim().toLowerCase();
const allowed = new Set(["admin", "dispatcher", "fleet_manager", "client", "partner"]);

if (!email || !email.includes("@")) {
  console.error("ERROR: --email required");
  process.exit(1);
}
if (!password || password.length < 8) {
  console.error("ERROR: --password required (min 8 chars)");
  process.exit(1);
}
if (!allowed.has(role)) {
  console.error(`ERROR: --role must be one of ${[...allowed].join(", ")}`);
  process.exit(1);
}

function hashPassword(pw) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const now = new Date().toISOString();
const userId = `u-${email.replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
const userPayload = {
  id: userId,
  email,
  name,
  role,
  status: "active",
  createdAt: now,
  authSource: tsmOrgId ? "seat" : "auth_lite",
  ...(tsmOrgId ? { tsmOrgId } : {}),
  ...(supplierId ? { supplierId } : {}),
};
const passwordPayload = {
  id: email,
  email,
  hash: hashPassword(password),
  updatedAt: now,
};

// Local seed (gitignored) — always write so login works without Docker
mkdirSync(dirname(seedPath), { recursive: true });
let seed = { users: [], passwords: [] };
if (existsSync(seedPath)) {
  try {
    seed = JSON.parse(readFileSync(seedPath, "utf8"));
  } catch {
    seed = { users: [], passwords: [] };
  }
}
seed.users = (seed.users ?? []).filter((u) => u.email !== email);
seed.passwords = (seed.passwords ?? []).filter((p) => p.email !== email);
seed.users.push(userPayload);
seed.passwords.push(passwordPayload);
writeFileSync(seedPath, JSON.stringify(seed, null, 2));
console.log(`OK wrote local seed → .data/auth-seed.json (${email}, role=${role})`);

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1, connect_timeout: 3 });
try {
  await sql`
    insert into app_documents (collection, id, payload, updated_at)
    values ('auth_users', ${userId}, ${sql.json(userPayload)}, ${now})
    on conflict (collection, id) do update
    set payload = excluded.payload, updated_at = excluded.updated_at
  `;
  await sql`
    insert into app_documents (collection, id, payload, updated_at)
    values ('user_passwords', ${email}, ${sql.json(passwordPayload)}, ${now})
    on conflict (collection, id) do update
    set payload = excluded.payload, updated_at = excluded.updated_at
  `;
  console.log(`OK also persisted to Postgres (${email})`);
} catch (e) {
  console.log(
    `NOTE: Postgres unavailable (${e instanceof Error ? e.message.slice(0, 80) : "error"}) — local seed only.`,
  );
} finally {
  try {
    await sql.end({ timeout: 2 });
  } catch {
    /* ignore */
  }
}

console.log("Restart Next.js so hydrate picks up the user.");
