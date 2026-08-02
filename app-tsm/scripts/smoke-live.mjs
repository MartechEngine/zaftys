#!/usr/bin/env node
/**
 * Live-first readiness smoke — no demo seed IDs.
 * Requires: npm run dev, TSM_DEMO_UI≠1, Fleetbase reachable, Postgres up.
 *
 * Exit 0 only when core live paths pass.
 */
const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const EMAIL = process.env.SMOKE_EMAIL ?? "dispatcher@zaftys.com";
const PASSWORD = process.env.SMOKE_PASSWORD ?? "dev";

/** Known demo-catalog IDs that must not appear in live list payloads. */
const DEMO_IDS = new Set([
  "vnd1",
  "wo1",
  "wo2",
  "wo3",
  "inv1",
  "sr1",
  "ms1",
  "u1",
  "u2",
  "u3",
  "u4",
  "fr1",
  "fr2",
  "fr3",
  "pt1",
  "pt2",
  "pt3",
  "pt4",
  "tz1",
  "tz2",
  "tz3",
  "gf1",
  "ot1",
  "r1",
  "r2",
  "r3",
  "r4",
]);

async function login() {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed (${res.status})`);
  const cookie = res.headers.get("set-cookie");
  if (!cookie) throw new Error("No session cookie");
  return cookie.split(";")[0];
}

async function get(path, cookie, { retries = 2 } = {}) {
  let last = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE}${path}`, {
      headers: cookie ? { Cookie: cookie } : {},
      cache: "no-store",
    });
    let json = null;
    try {
      json = await res.json();
    } catch {
      /* ignore */
    }
    last = { path, ok: res.ok, status: res.status, json };
    if (res.ok) return last;
    const msg = JSON.stringify(json?.error ?? json ?? "");
    const retryable =
      res.status === 429 ||
      res.status === 502 ||
      res.status === 503 ||
      res.status === 500 ||
      /too many requests/i.test(msg) ||
      /Fleetbase unavailable/i.test(msg);
    if (!retryable || attempt === retries) return last;
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  return last;
}

async function post(path, cookie, body, { retries = 3 } = {}) {
  let last = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: JSON.stringify(body),
    });
    let json = null;
    try {
      json = await res.json();
    } catch {
      /* ignore */
    }
    last = { path: `POST ${path}`, ok: res.ok, status: res.status, json };
    if (res.ok) return last;
    const msg = JSON.stringify(json?.error ?? json ?? "");
    const retryable =
      res.status === 429 ||
      res.status === 502 ||
      res.status === 503 ||
      res.status === 500 ||
      /too many requests/i.test(msg) ||
      /Fleetbase unavailable/i.test(msg);
    if (!retryable || attempt === retries) return last;
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  return last;
}

function mark(ok, label, detail) {
  console.log(`${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  return ok ? 0 : 1;
}

function collectIds(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectIds(item, out);
  } else if (node && typeof node === "object") {
    if (typeof node.id === "string") out.push(node.id);
    for (const v of Object.values(node)) collectIds(v, out);
  }
  return out;
}

function assertNoDemoIds(label, json) {
  const ids = collectIds(json?.data ?? json);
  const hit = ids.find((id) => DEMO_IDS.has(id));
  return mark(!hit, `no demo IDs · ${label}`, hit ? `found ${hit}` : "clean");
}

async function main() {
  console.log(`Live readiness → ${BASE}\n`);
  let failed = 0;
  const cookie = await login();
  console.log(`✓ login as ${EMAIL}\n`);

  const health = await get("/api/health", "");
  const h = health.json ?? {};
  failed += mark(
    health.ok && h.demoUi === false && h.dataSource === "fleetbase",
    "health live mode",
    `demoUi=${h.demoUi} source=${h.dataSource} fb=${h.fleetbaseReachable} db=${h.database}`,
  );
  failed += mark(h.fleetbaseReachable === true, "Fleetbase reachable");
  failed += mark(
    h.database === "up" || h.databaseConfigured === true,
    "database configured/up",
    String(h.database),
  );

  const reads = [
    "/api/shipments?tab=active",
    "/api/fleet/drivers",
    "/api/fleet/vehicles",
    "/api/clients",
    "/api/billing/invoices",
    "/api/billing/rates",
    "/api/fleet/fuel/transactions",
    "/api/fleet/places",
    "/api/fleet/equipment",
    "/api/fleet/issues",
    "/api/vendors",
    "/api/maintenance/work-orders",
    "/api/maintenance/faults",
    "/api/maintenance/parts",
    "/api/maintenance/schedules",
    "/api/settings/users",
    "/api/settings/roles",
    "/api/network/listings",
    "/api/network/overflow",
    "/api/network/partners",
    "/api/dashboard/kpis",
    "/api/map/vehicles",
    "/api/dispatch/calendar",
    "/api/integrations",
    "/api/integrations/fleetbase",
    "/api/integrations/events",
  ];
  for (const path of reads) {
    const r = await get(path, cookie);
    const n = Array.isArray(r.json?.data) ? r.json.data.length : "obj";
    failed += mark(r.ok, path, r.ok ? `count=${n}` : `status=${r.status}`);
    if (r.ok) failed += assertNoDemoIds(path, r.json);
  }

  // Brief pause before Fleetbase-heavy writes (local FB rate limits)
  await new Promise((r) => setTimeout(r, 2000));

  // Writes that must not depend on demo IDs
  const stamp = Date.now().toString(36);

  const place = await post("/api/fleet/places", cookie, {
    name: `Live Place ${stamp}`,
    type: "Depot",
    city: "Nagpur",
    geofence: "300m",
  });
  failed += mark(place.ok, "POST /api/fleet/places", place.json?.data?.id ?? String(place.status));

  const fuel = await post("/api/fleet/fuel/transactions", cookie, {
    vehicle: "MH-00-LIVE-1",
    station: `Live Station ${stamp}`,
    liters: 10,
    amountInr: 900,
  });
  failed += mark(
    fuel.ok,
    "POST /api/fleet/fuel/transactions",
    fuel.json?.data?.id ?? String(fuel.status),
  );

  const issue = await post("/api/fleet/issues", cookie, {
    vehicle: "MH-00-LIVE-1",
    driver: "Live Driver",
    issue: `Live issue ${stamp}`,
    severity: "low",
  });
  failed += mark(issue.ok, "POST /api/fleet/issues", issue.json?.data?.id ?? String(issue.status));

  const vendor = await post("/api/vendors", cookie, {
    name: `Live Vendor ${stamp}`,
    type: "Maintenance",
    city: "Nagpur",
    contact: "+91 90000 00002",
  });
  failed += mark(vendor.ok, "POST /api/vendors", vendor.json?.data?.id ?? String(vendor.status));

  const invoice = await post("/api/billing/invoices", cookie, {
    client: `Live Client ${stamp}`,
    description: `Live invoice ${stamp}`,
    subtotalInr: 12500,
  });
  failed += mark(
    invoice.ok,
    "POST /api/billing/invoices",
    invoice.json?.data?.id ?? String(invoice.status),
  );

  const wo = await post("/api/maintenance/work-orders", cookie, {
    vehicle: "MH-00-LIVE-1",
    title: `Live WO ${stamp}`,
    vendor: vendor.json?.data?.name ?? `Live Vendor ${stamp}`,
    notes: "smoke-live",
  });
  failed += mark(
    wo.ok,
    "POST /api/maintenance/work-orders",
    wo.json?.data?.id ?? String(wo.status),
  );

  const fault = await post("/api/maintenance/faults", cookie, {
    vehicle: "MH-00-LIVE-1",
    driver: "Live Driver",
    issue: `Live fault ${stamp}`,
  });
  failed += mark(
    fault.ok,
    "POST /api/maintenance/faults",
    fault.json?.data?.id ?? String(fault.status),
  );

  const part = await post("/api/maintenance/parts", cookie, {
    sku: `LIVE-${stamp}`.toUpperCase().slice(0, 20),
    name: `Live Part ${stamp}`,
    stock: 5,
    reorder: 2,
    location: "Nagpur yard",
  });
  failed += mark(part.ok, "POST /api/maintenance/parts", part.json?.data?.id ?? String(part.status));

  const client = await post("/api/clients", cookie, {
    name: `Live Client ${stamp}`,
    city: "Amravati",
    contact: "+91 90000 00001",
  });
  failed += mark(
    client.ok,
    "POST /api/clients (Fleetbase)",
    client.ok
      ? client.json?.data?.id
      : JSON.stringify(client.json?.error ?? client.status).slice(0, 80),
  );

  const shipment = await post("/api/shipments", cookie, {
    origin: "Nagpur",
    destination: "Amravati",
    client: `Live Client ${stamp}`,
    commodity: "Steel",
    tonnageMt: 12,
  });
  failed += mark(
    shipment.ok && Boolean(shipment.json?.data?.id),
    "POST /api/shipments (Fleetbase)",
    shipment.ok
      ? shipment.json?.data?.id
      : JSON.stringify(shipment.json?.error ?? shipment.status).slice(0, 80),
  );

  // Assign when live fleet exists (skip cleanly if empty — not a failure)
  const drivers = await get("/api/fleet/drivers", cookie);
  const vehicles = await get("/api/fleet/vehicles", cookie);
  const driverId = drivers.json?.data?.[0]?.id;
  const vehicleId = vehicles.json?.data?.[0]?.id;
  if (shipment.ok && driverId && vehicleId) {
    const assign = await post(`/api/shipments/${shipment.json.data.id}/assign`, cookie, {
      driverId,
      vehicleId,
    });
    failed += mark(
      assign.ok && assign.json?.data?.status === "dispatched",
      "POST /api/shipments/:id/assign",
      assign.ok
        ? `${assign.json?.data?.driver ?? "?"} / ${assign.json?.data?.vehicle ?? "?"}`
        : JSON.stringify(assign.json?.error ?? assign.status).slice(0, 80),
    );

    await new Promise((r) => setTimeout(r, 1500));
    const detail = await get(`/api/shipments/${shipment.json.data.id}`, cookie, {
      retries: 4,
    });
    failed += mark(
      detail.ok && detail.json?.data?.id === shipment.json.data.id,
      "GET /api/shipments/:id",
      detail.ok ? detail.json?.data?.status : String(detail.status),
    );
  } else {
    console.log("· POST /api/shipments/:id/assign — skipped (no FB driver/vehicle yet)");
  }

  console.log(failed === 0 ? "\nLive readiness passed." : `\n${failed} live check(s) failed.`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
