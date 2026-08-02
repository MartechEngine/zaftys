#!/usr/bin/env node
/**
 * Pilot: import Fleetbase LOS + link TSM-posted My Loads into Postgres.
 * Usage: node scripts/import-fleetbase-pilot.mjs
 * Requires app running on BASE_URL (default http://localhost:3000) and admin login.
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const val = m[2].trim();
    if (process.env[key] == null || process.env[key] === "") process.env[key] = val;
  }
}

const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const email = process.env.TSM_SMOKE_EMAIL ?? "tabish.khan9404@gmail.com";
const password = process.env.TSM_SMOKE_PASSWORD ?? "Tabish@2026";

const loginRes = await fetch(`${base}/api/auth/login`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, password }),
});
if (!loginRes.ok) {
  console.error("login failed", loginRes.status, await loginRes.text());
  process.exit(1);
}
const cookie = loginRes.headers.getSetCookie?.()?.join("; ") ?? loginRes.headers.get("set-cookie");
if (!cookie) {
  console.error("no session cookie from login");
  process.exit(1);
}

const headers = { cookie, "content-type": "application/json" };
if (process.env.TSM_CRON_SECRET) {
  headers["x-tsm-cron-secret"] = process.env.TSM_CRON_SECRET;
}

const res = await fetch(`${base}/api/ops/import-fleetbase`, {
  method: "POST",
  headers,
});
const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text.slice(0, 500) };
}
console.log(JSON.stringify(json, null, 2));
if (!res.ok) process.exit(1);
