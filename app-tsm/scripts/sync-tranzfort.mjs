#!/usr/bin/env node
/**
 * TranZfort → Fleetbase shadow sync (manual / cron).
 * Usage: node scripts/sync-tranzfort.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] ??= m[2].trim();
  }
}

console.log("TranZfort sync →", `${appUrl}/api/sync/run`);

const res = await fetch(`${appUrl}/api/sync/run`, { method: "POST" });
const json = await res.json();

if (!res.ok) {
  console.error("❌ Sync failed:", json);
  process.exit(1);
}

console.log("✅ Sync result:", JSON.stringify(json.data, null, 2));
