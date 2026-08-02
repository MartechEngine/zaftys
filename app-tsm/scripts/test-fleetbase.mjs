#!/usr/bin/env node
/**
 * Test Fleetbase API connectivity.
 * Usage: node scripts/test-fleetbase.mjs
 * Loads FLEETBASE_* from .env.local if present.
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
    // Always prefer .env.local for Fleetbase (shell may have empty stubs)
    if (key.startsWith("FLEETBASE_") || process.env[key] == null || process.env[key] === "") {
      process.env[key] = val;
    }
  }
}

const base = (process.env.FLEETBASE_API_URL ?? "http://localhost:8000/v1").replace(/\/$/, "");
const key = process.env.FLEETBASE_API_KEY ?? "";

console.log("Fleetbase test");
console.log("  URL:", base);
console.log("  Key:", key ? `${key.slice(0, 12)}…` : "(not set)");

if (!key) {
  console.error("\n❌ Set FLEETBASE_API_KEY in app-tsm/.env.local");
  console.error("   Create key in Fleetbase console → Developers → API keys");
  process.exit(1);
}

const res = await fetch(`${base}/orders?limit=1`, {
  headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text.slice(0, 200) };
}

if (!res.ok) {
  console.error(`\n❌ API error ${res.status}:`, json);
  process.exit(1);
}

const orders = Array.isArray(json) ? json : json.data ?? [];
console.log(`\n✅ Connected — ${orders.length} order(s) in sample response`);
console.log("   Add key to .env.local and restart npm run dev for live data in TSM.");
