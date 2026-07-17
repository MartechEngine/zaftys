#!/usr/bin/env node
/** Local smoke test — run while dev server is up on :3000 */

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const EMAIL = process.env.SMOKE_EMAIL ?? "dispatcher@zaftys.com";
const PASSWORD = process.env.SMOKE_PASSWORD ?? "dev";

  const routes = [
  "/api/health",
  "/api/dashboard/kpis",
  "/api/shipments?tab=active",
  "/api/reports/operations",
  "/api/billing/invoices",
  "/api/dispatch/calendar",
  "/api/clients",
  "/api/fleet/drivers",
  "/api/billing/summary",
  "/api/vendors",
  "/api/maintenance/work-orders",
  "/api/maintenance/faults",
  "/api/settings/users",
  "/api/settings/roles",
  "/api/integrations",
  "/api/network/partners",
  "/api/network/summary",
  "/api/maintenance/schedules",
  "/api/maintenance/parts",
  "/api/settings/organization",
  "/api/integrations/logs",
  "/api/integrations/events",
  "/api/fleet/places",
  "/api/fleet/groups",
  "/api/fleet/compliance",
  "/api/fleet/issues",
  "/api/billing/rates",
  "/api/billing/gst",
  "/api/settings/order-types",
  "/api/dispatch/orchestrator",
  "/api/billing/accounts",
  "/api/fleet/equipment",
  "/api/fleet/fuel/transactions",
  "/api/fleet/fuel/reports",
  "/api/settings/order-types/ot1/fields",
  "/api/settings/order-types/ot1/flow",
  "/api/integrations/fleetbase",
  "/api/integrations/telematics",
  "/api/map/replay",
  "/api/integrations/devices",
  "/api/integrations/sensors",
  "/api/integrations/webhooks",
  "/api/integrations/sockets",
  "/api/integrations/fuel-providers",
  "/api/integrations/traccar",
  "/api/settings/geofences",
  "/api/settings/groups",
  "/api/settings/automation",
  "/api/shipments/quotes",
  "/api/reports/fleet",
  "/api/fleet/drivers/d1/schedule",
  "/api/fleet/vehicles/v1/devices",
  "/api/settings/config",
  "/api/settings/config?section=dispatch",
  "/api/settings/config?section=map",
  "/api/settings/config?section=billing",
  "/api/settings/config?section=policies",
  "/api/integrations/tally",
  "/api/fleet/drivers/d1/invite",
  "/api/reports/custom",
  "/api/settings/report-schedules",
  "/api/notifications",
  "/api/reports/lanes",
  "/api/settings/config?section=payments",
  "/api/documents",
];

async function login() {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) {
    throw new Error(`Login failed (${res.status})`);
  }
  const cookie = res.headers.get("set-cookie");
  if (!cookie) throw new Error("Login did not return session cookie");
  return cookie.split(";")[0];
}

async function check(path, cookie) {
  const url = `${BASE}${path}`;
  const headers = cookie ? { Cookie: cookie } : {};
  const res = await fetch(url, { cache: "no-store", headers });
  const ok = res.ok;
  let detail = "";
  try {
    const json = await res.json();
    detail =
      json.data !== undefined
        ? Array.isArray(json.data)
          ? `${json.data.length} items`
          : "data ok"
        : JSON.stringify(json).slice(0, 60);
  } catch {
    detail = `status ${res.status}`;
  }
  return { path, ok, status: res.status, detail };
}

async function writeCheck(label, cookie, method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(body),
  });
  let detail = "";
  try {
    const json = await res.json();
    detail = json.data
      ? json.data.id
        ? `id=${json.data.id}`
        : "data ok"
      : JSON.stringify(json).slice(0, 80);
  } catch {
    detail = `status ${res.status}`;
  }
  return { path: label, ok: res.ok, status: res.status, detail };
}

async function main() {
  console.log(`Smoke test → ${BASE}\n`);

  let cookie = "";
  try {
    cookie = await login();
    console.log(`✓ login as ${EMAIL}\n`);
  } catch (e) {
    console.warn(`⚠ login skipped — ${e instanceof Error ? e.message : "failed"}\n`);
  }

  let failed = 0;

  for (const path of routes) {
    try {
      const result = await check(path, cookie);
      const mark = result.ok ? "✓" : "✗";
      console.log(`${mark} ${path} (${result.status}) ${result.detail}`);
      if (!result.ok) failed += 1;
    } catch (e) {
      failed += 1;
      console.log(`✗ ${path} — ${e instanceof Error ? e.message : "failed"}`);
    }
  }

  console.log("\nWrite paths:");
  const writes = [
    () =>
      writeCheck("POST /api/clients", cookie, "POST", "/api/clients", {
        name: `Smoke Client ${Date.now().toString(36)}`,
        gstin: "27AABCSMOKE01Z5",
        city: "Nagpur",
        contact: "Smoke Tester",
      }),
    () =>
      writeCheck("POST /api/shipments/quotes", cookie, "POST", "/api/shipments/quotes", {
        client: "Smoke Client",
        origin: "Amravati",
        destination: "Pune",
        tonnage: 24,
        status: "draft",
      }),
    () =>
      writeCheck("PATCH /api/settings/automation", cookie, "PATCH", "/api/settings/automation", {
        id: "ar4",
        enabled: true,
      }),
    () =>
      writeCheck("POST /api/billing/rates", cookie, "POST", "/api/billing/rates", {
        name: "Smoke corridor rate",
        basis: "Per MT · zone",
        rate: "₹450/MT",
        minCharge: "₹9,000",
      }),
    () =>
      writeCheck("POST /api/vendors", cookie, "POST", "/api/vendors", {
        name: `Smoke Vendor ${Date.now().toString(36)}`,
        type: "Maintenance",
        city: "Nagpur",
        contact: "+91 90000 00000",
      }),
    () =>
      writeCheck("POST /api/maintenance/work-orders", cookie, "POST", "/api/maintenance/work-orders", {
        vehicle: "MH-27-AB-1234",
        title: "Smoke inspection",
        vendor: "Ashok Tyres & Services",
        cost: "₹5,000",
      }),
    () =>
      writeCheck(
        "PATCH /api/maintenance/work-orders/wo1",
        cookie,
        "PATCH",
        "/api/maintenance/work-orders/wo1",
        { status: "in_progress" },
      ),
    () =>
      writeCheck("PATCH /api/maintenance/faults", cookie, "PATCH", "/api/maintenance/faults", {
        id: "fr1",
        status: "linked",
      }),
    () =>
      writeCheck("POST /api/fleet/places", cookie, "POST", "/api/fleet/places", {
        name: `Smoke Depot ${Date.now().toString(36)}`,
        type: "Depot",
        city: "Nagpur",
        geofence: "300m",
      }),
    () =>
      writeCheck("POST /api/settings/geofences", cookie, "POST", "/api/settings/geofences", {
        name: `Smoke Fence ${Date.now().toString(36)}`,
        radius: "400m",
        triggers: "at_plant on enter",
      }),
    () =>
      writeCheck("PATCH /api/maintenance/parts", cookie, "PATCH", "/api/maintenance/parts", {
        id: "pt1",
        delta: 1,
      }),
    () =>
      writeCheck("PATCH /api/billing/invoices/inv1", cookie, "PATCH", "/api/billing/invoices/inv1", {
        status: "paid",
      }),
    () =>
      writeCheck(
        "POST /api/fleet/fuel/transactions",
        cookie,
        "POST",
        "/api/fleet/fuel/transactions",
        {
          vehicle: "MH-27-AB-1234",
          station: "IOCL Smoke",
          liters: 100,
        },
      ),
    () =>
      writeCheck("POST /api/fleet/equipment", cookie, "POST", "/api/fleet/equipment", {
        name: `Smoke Modem ${Date.now().toString(36)}`,
        type: "Telematics",
        location: "Spare inventory",
        status: "stored",
      }),
    () =>
      writeCheck("PATCH /api/settings/organization", cookie, "PATCH", "/api/settings/organization", {
        phone: "+91 927 092 3581",
      }),
    () =>
      writeCheck("POST /api/clients/c1/contacts", cookie, "POST", "/api/clients/c1/contacts", {
        name: "Smoke Contact",
        role: "Ops",
        email: "smoke@example.com",
      }),
    () =>
      writeCheck("POST /api/clients/c1/users", cookie, "POST", "/api/clients/c1/users", {
        name: "Smoke Portal User",
        email: `smoke.portal.${Date.now().toString(36)}@example.com`,
      }),
    () =>
      writeCheck("PATCH /api/clients/c1", cookie, "PATCH", "/api/clients/c1", {
        city: "Amravati",
      }),
    () =>
      writeCheck("POST /api/billing/invoices", cookie, "POST", "/api/billing/invoices", {
        client: "Smoke Client",
        description: "Smoke freight",
        subtotalInr: 42000,
      }),
    () =>
      writeCheck("POST /api/settings/order-types", cookie, "POST", "/api/settings/order-types", {
        name: `Smoke OT ${Date.now().toString(36)}`,
      }),
    () =>
      writeCheck(
        "POST /api/settings/order-types/ot1/fields",
        cookie,
        "POST",
        "/api/settings/order-types/ot1/fields",
        { name: "Smoke field", type: "text", required: false },
      ),
    () =>
      writeCheck("POST /api/integrations/webhooks", cookie, "POST", "/api/integrations/webhooks", {
        url: "https://hooks.example.com/smoke",
        events: "order.*",
      }),
    () =>
      writeCheck("POST /api/integrations/devices", cookie, "POST", "/api/integrations/devices", {
        imei: `3596331${Date.now().toString().slice(-7)}`,
        vehicle: "MH-27-AB-1234",
        provider: "Flespi",
      }),
    () =>
      writeCheck("POST /api/maintenance/schedules", cookie, "POST", "/api/maintenance/schedules", {
        vehicle: "MH-27-AB-1234",
        trigger: "Every 5,000 km",
        type: "Smoke service",
      }),
    () =>
      writeCheck("POST /api/fleet/groups", cookie, "POST", "/api/fleet/groups", {
        name: `Smoke Fleet Group ${Date.now().toString(36)}`,
        zone: "Nagpur",
      }),
    () =>
      writeCheck("POST /api/settings/users", cookie, "POST", "/api/settings/users", {
        name: "Smoke Ops",
        email: `smoke.ops.${Date.now().toString(36)}@zaftys.com`,
        role: "Dispatcher",
      }),
    () =>
      writeCheck("POST /api/network/partners", cookie, "POST", "/api/network/partners", {
        name: `Smoke Partner ${Date.now().toString(36)}`,
      }),
    () =>
      writeCheck("PATCH /api/settings/config", cookie, "PATCH", "/api/settings/config", {
        section: "dispatch",
        values: { autoAssign: true },
      }),
    () =>
      writeCheck("POST /api/dispatch/orchestrator", cookie, "POST", "/api/dispatch/orchestrator", {}),
    () =>
      writeCheck(
        "POST /api/fleet/drivers/d1/invite",
        cookie,
        "POST",
        "/api/fleet/drivers/d1/invite",
        {},
      ),
    () =>
      writeCheck("POST /api/integrations/tally", cookie, "POST", "/api/integrations/tally", {}),
    () =>
      writeCheck("POST /api/reports/custom", cookie, "POST", "/api/reports/custom", {
        name: `Smoke Report ${Date.now().toString(36)}`,
        description: "Smoke custom report",
      }),
    () =>
      writeCheck("PATCH /api/vendors/vnd1", cookie, "PATCH", "/api/vendors/vnd1", {
        city: "Nagpur",
      }),
    () =>
      writeCheck("PATCH /api/fleet/drivers/d1", cookie, "PATCH", "/api/fleet/drivers/d1", {
        phone: "+91 90000 11111",
      }),
    () =>
      writeCheck("PATCH /api/fleet/vehicles/v1", cookie, "PATCH", "/api/fleet/vehicles/v1", {
        capacityMt: 32,
      }),
    () =>
      writeCheck("PATCH /api/shipments/1", cookie, "PATCH", "/api/shipments/1", {
        commodity: "Cement",
        tonnageMt: 32,
      }),
    () =>
      writeCheck("PATCH /api/billing/rates/sr1", cookie, "PATCH", "/api/billing/rates/sr1", {
        name: "Amravati – Nagpur (cement)",
        basis: "Per MT · zone",
        rate: "₹420/MT",
        minCharge: "₹8,400",
      }),
    () =>
      writeCheck(
        "POST /api/settings/report-schedules",
        cookie,
        "POST",
        "/api/settings/report-schedules",
        {
          name: `Smoke Schedule ${Date.now().toString(36)}`,
          cadence: "Daily 08:00",
          recipients: "smoke@zaftys.com",
        },
      ),
    () =>
      writeCheck("POST /api/fleet/drivers", cookie, "POST", "/api/fleet/drivers", {
        name: `Smoke Driver ${Date.now().toString(36)}`,
        phone: "+91 90000 22222",
      }),
    () =>
      writeCheck("POST /api/fleet/vehicles", cookie, "POST", "/api/fleet/vehicles", {
        registration: `MH-27-SM-${Date.now().toString().slice(-4)}`,
        type: "Multi-axle",
      }),
    () =>
      writeCheck("PATCH /api/notifications", cookie, "PATCH", "/api/notifications", {
        all: true,
      }),
    () =>
      writeCheck("POST /api/shipments/bulk", cookie, "POST", "/api/shipments/bulk", {
        ids: ["1"],
        status: "at_weighbridge",
      }),
    () =>
      writeCheck(
        "PATCH /api/settings/config payments",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "payments",
          values: { gatewaysEnabled: false },
        },
      ),
    () =>
      writeCheck(
        "POST /api/shipments/quotes/q1/accept",
        cookie,
        "POST",
        "/api/shipments/quotes/q1/accept",
        {},
      ),
    () =>
      writeCheck("POST /api/fleet/issues", cookie, "POST", "/api/fleet/issues", {
        vehicle: "MH-27-AB-1234",
        driver: "Smoke Driver",
        issue: "Smoke tyre check",
        severity: "low",
      }),
    () =>
      writeCheck("PATCH /api/fleet/issues", cookie, "PATCH", "/api/fleet/issues", {
        id: "fi1",
        action: "resolve",
      }),
    () =>
      writeCheck("PATCH /api/fleet/compliance", cookie, "PATCH", "/api/fleet/compliance", {
        id: "cd1",
        status: "valid",
      }),
    () =>
      writeCheck("PATCH /api/network/partners/p3", cookie, "PATCH", "/api/network/partners/p3", {
        verify: true,
      }),
    () =>
      writeCheck("PATCH /api/settings/users/u4", cookie, "PATCH", "/api/settings/users/u4", {
        activate: true,
      }),
    () =>
      writeCheck(
        "POST /api/reports/custom/cr-ops/run",
        cookie,
        "POST",
        "/api/reports/custom/cr-ops/run",
        {},
      ),
    () =>
      writeCheck("PATCH /api/shipments/quotes/q2", cookie, "PATCH", "/api/shipments/quotes/q2", {
        status: "sent",
      }),
    () =>
      writeCheck("POST /api/integrations/traccar", cookie, "POST", "/api/integrations/traccar", {}),
    () =>
      writeCheck("PATCH /api/settings/roles/r2", cookie, "PATCH", "/api/settings/roles/r2", {
        name: "Dispatcher",
      }),
    () =>
      writeCheck("PATCH /api/settings/groups/gr1", cookie, "PATCH", "/api/settings/groups/gr1", {
        policy: "Dispatcher",
      }),
    () =>
      writeCheck("PATCH /api/fleet/equipment", cookie, "PATCH", "/api/fleet/equipment", {
        id: "eq3",
        status: "active",
      }),
    () =>
      writeCheck("PATCH /api/settings/geofences", cookie, "PATCH", "/api/settings/geofences", {
        id: "gf1",
        radius: "550m",
      }),
    () =>
      writeCheck("PATCH /api/fleet/places/pl1", cookie, "PATCH", "/api/fleet/places/pl1", {
        geofence: "520m",
      }),
    () =>
      writeCheck(
        "PATCH /api/settings/order-types/ot1/flow",
        cookie,
        "PATCH",
        "/api/settings/order-types/ot1/flow",
        {
          statusFlow:
            "pending → dispatched → at_plant → in_transit → at_weighbridge → delivered",
        },
      ),
    () =>
      writeCheck(
        "POST /api/settings/organization/logo",
        cookie,
        "POST",
        "/api/settings/organization/logo",
        { filename: "zaftys-logo.png" },
      ),
    () =>
      writeCheck("POST /api/integrations/fleetbase", cookie, "POST", "/api/integrations/fleetbase", {}),
    () =>
      writeCheck("POST /api/profile/password", cookie, "POST", "/api/profile/password", {
        newPassword: "local-stub-pass",
      }),
    () =>
      writeCheck("PATCH /api/fleet/groups/fg1", cookie, "PATCH", "/api/fleet/groups/fg1", {
        name: "Vidarbha cement fleet",
        zone: "Amravati – Nagpur",
      }),
    () =>
      writeCheck(
        "PATCH /api/integrations/fuel-providers",
        cookie,
        "PATCH",
        "/api/integrations/fuel-providers",
        { id: "fp2", status: "connected" },
      ),
    () =>
      writeCheck("POST /api/integrations/telematics", cookie, "POST", "/api/integrations/telematics", {
        id: "tp1",
      }),
    () =>
      writeCheck("POST /api/settings/automation", cookie, "POST", "/api/settings/automation", {
        trigger: "status → delivered",
        action: "Notify ops channel",
      }),
    () =>
      writeCheck("PATCH /api/settings/order-types/ot1", cookie, "PATCH", "/api/settings/order-types/ot1", {
        name: "Standard freight",
      }),
    () =>
      writeCheck("DELETE /api/integrations/webhooks", cookie, "DELETE", "/api/integrations/webhooks", {
        id: "wh3",
      }),
    () =>
      writeCheck("PATCH /api/integrations/devices", cookie, "PATCH", "/api/integrations/devices", {
        id: "dv1",
        vehicle: "Unassigned",
      }),
  ];

  for (const run of writes) {
    try {
      const result = await run();
      const mark = result.ok ? "✓" : "✗";
      console.log(`${mark} ${result.path} (${result.status}) ${result.detail}`);
      if (!result.ok) failed += 1;
    } catch (e) {
      failed += 1;
      console.log(`✗ write — ${e instanceof Error ? e.message : "failed"}`);
    }
  }

  console.log(failed === 0 ? "\nAll checks passed." : `\n${failed} check(s) failed.`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
