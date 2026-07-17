#!/usr/bin/env node
/**
 * Seed sample orders into Fleetbase for QA.
 * Usage: node scripts/seed-fleetbase-orders.mjs
 * Loads FLEETBASE_* from .env.local if present.
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] ??= m[2].trim();
  }
}

const base = (process.env.FLEETBASE_API_URL ?? "http://localhost:8000/v1").replace(/\/$/, "");
const key = process.env.FLEETBASE_API_KEY ?? "";

const SAMPLE_ORDERS = [
  {
    type: "transport",
    status: "created",
    pickup: { name: "Amravati Cement Plant", city: "Amravati" },
    dropoff: { name: "Nagpur Depot", city: "Nagpur" },
    meta: {
      client: "Acme Cement",
      commodity: "Cement",
      tonnage: 32,
      tonnage_mt: 32,
      origin_type: "fleet",
      lr_number: "LR-SEED-001",
    },
  },
  {
    type: "transport",
    status: "started",
    pickup: { name: "Wardha Steel Yard", city: "Wardha" },
    dropoff: { name: "Pune Industrial Zone", city: "Pune" },
    meta: {
      client: "Steel Corp India",
      commodity: "Steel coils",
      tonnage: 28,
      tonnage_mt: 28,
      origin_type: "network",
      tranzfort_id: "tz-seed-8842",
      lr_number: "LR-SEED-002",
    },
  },
  {
    type: "transport",
    status: "created",
    pickup: { name: "Chandrapur Mine Gate", city: "Chandrapur" },
    dropoff: { name: "Amravati Plant", city: "Amravati" },
    meta: {
      client: "Mining Ltd",
      commodity: "Iron ore",
      tonnage: 40,
      tonnage_mt: 40,
      origin_type: "fleet",
      lr_number: "LR-SEED-003",
    },
  },
];

console.log("Fleetbase seed orders");
console.log("  URL:", base);
console.log("  Key:", key ? `${key.slice(0, 12)}…` : "(not set)");

if (!key) {
  console.error("\n❌ Set FLEETBASE_API_KEY in app-tsm/.env.local");
  process.exit(1);
}

async function createOrder(payload) {
  const res = await fetch(`${base}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  if (!res.ok) {
    throw new Error(json.errors?.[0] ?? json.message ?? `HTTP ${res.status}`);
  }
  return json.data ?? json;
}

let created = 0;
const errors = [];

for (const order of SAMPLE_ORDERS) {
  try {
    const result = await createOrder(order);
    created++;
    const id = result.id ?? result.public_id ?? "unknown";
    console.log(`  ✅ ${order.meta.lr_number} → ${id}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    errors.push(`${order.meta.lr_number}: ${msg}`);
    console.error(`  ❌ ${order.meta.lr_number}: ${msg}`);
  }
}

console.log(`\nDone — ${created}/${SAMPLE_ORDERS.length} created`);
if (errors.length) {
  console.error("Errors:", errors);
  process.exit(1);
}

console.log("Set TSM_DEMO_UI=0 and restart dev server to use live Fleetbase data.");
