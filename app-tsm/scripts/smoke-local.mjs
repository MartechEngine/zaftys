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
  "/api/settings/notifications",
  "/api/network/listings",
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
      writeCheck(
        "PATCH /api/shipments/quotes/q2 revise",
        cookie,
        "PATCH",
        "/api/shipments/quotes/q2",
        { tonnage: 26, rateInr: 11200 },
      ),
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
    async () => {
      const createRes = await fetch(`${BASE}/api/integrations/webhooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify({
          url: `https://hooks.example.com/smoke-delete-${Date.now().toString(36)}`,
          events: "order.*",
        }),
      });
      const createJson = await createRes.json();
      const webhookId = createJson.data?.id;
      if (!createRes.ok || !webhookId) {
        return {
          path: "DELETE /api/integrations/webhooks",
          ok: false,
          status: createRes.status,
          detail: "create webhook failed",
        };
      }
      return writeCheck(
        "DELETE /api/integrations/webhooks",
        cookie,
        "DELETE",
        "/api/integrations/webhooks",
        { id: webhookId },
      );
    },
    () =>
      writeCheck("PATCH /api/integrations/devices", cookie, "PATCH", "/api/integrations/devices", {
        id: "dv1",
        vehicle: "Unassigned",
      }),
    () =>
      writeCheck("PATCH /api/settings/users/u1", cookie, "PATCH", "/api/settings/users/u1", {
        role: "Fleet Manager",
      }),
    () =>
      writeCheck("PATCH /api/settings/users/u2", cookie, "PATCH", "/api/settings/users/u2", {
        status: "pending",
      }),
    () =>
      writeCheck("PATCH /api/integrations/devices assign", cookie, "PATCH", "/api/integrations/devices", {
        id: "dv1",
        vehicle: "MH-27-AB-1234",
      }),
    () =>
      writeCheck("PATCH /api/fleet/places/pl1 details", cookie, "PATCH", "/api/fleet/places/pl1", {
        name: "Amravati Cement Plant",
        type: "Plant",
        city: "Amravati",
      }),
    () =>
      writeCheck("PATCH /api/settings/geofences triggers", cookie, "PATCH", "/api/settings/geofences", {
        id: "gf1",
        triggers: "at_plant on enter · notify ops",
      }),
    () =>
      writeCheck("PATCH /api/settings/config billing scalar", cookie, "PATCH", "/api/settings/config", {
        section: "billing",
        values: { paymentTerms: "Net 30 days" },
      }),
    () =>
      writeCheck("DELETE /api/settings/automation", cookie, "DELETE", "/api/settings/automation", {
        id: "ar3",
      }),
    () =>
      writeCheck("DELETE /api/settings/report-schedules", cookie, "DELETE", "/api/settings/report-schedules", {
        id: "rs3",
      }),
    () =>
      writeCheck(
        "PATCH /api/settings/order-types/ot1/fields",
        cookie,
        "PATCH",
        "/api/settings/order-types/ot1/fields",
        { fieldId: "f3", required: true },
      ),
    () =>
      writeCheck(
        "DELETE /api/settings/order-types/ot1/fields",
        cookie,
        "DELETE",
        "/api/settings/order-types/ot1/fields",
        { fieldId: "f5" },
      ),
    () =>
      writeCheck("PATCH /api/fleet/drivers/d1 vehicle", cookie, "PATCH", "/api/fleet/drivers/d1", {
        vehicleId: "v2",
      }),
    () =>
      writeCheck("POST /api/integrations/tally export", cookie, "POST", "/api/integrations/tally", {
        action: "export",
      }),
    () =>
      writeCheck(
        "PATCH /api/clients/c1/users revoke",
        cookie,
        "PATCH",
        "/api/clients/c1/users",
        { userId: "cu1", revoke: true },
      ),
    () =>
      writeCheck(
        "PATCH /api/clients/c1/contacts",
        cookie,
        "PATCH",
        "/api/clients/c1/contacts",
        { contactId: "ct1", role: "Logistics director" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/groups/gr1 rename",
        cookie,
        "PATCH",
        "/api/settings/groups/gr1",
        { name: "Dispatch team" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/geofences rename",
        cookie,
        "PATCH",
        "/api/settings/geofences",
        { id: "gf1", name: "Amravati plant zone" },
      ),
    () =>
      writeCheck(
        "PATCH /api/fleet/equipment relocate",
        cookie,
        "PATCH",
        "/api/fleet/equipment",
        { id: "eq3", location: "Nagpur yard" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config billing template",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "billing",
          values: { invoiceTemplate: "ZAFTYS GST A4 · compact" },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config scheduling",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "scheduling",
          values: { maxDrivingHours: 11, plantWindow: "05:00 – 21:00" },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/maintenance/schedules",
        cookie,
        "PATCH",
        "/api/maintenance/schedules",
        { id: "ms1", trigger: "Every 12,000 km", nextDue: "01 Sep 2026" },
      ),
    () =>
      writeCheck(
        "PATCH /api/fleet/vehicles/v1 driver",
        cookie,
        "PATCH",
        "/api/fleet/vehicles/v1",
        { driverId: "d1" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/report-schedules cadence",
        cookie,
        "PATCH",
        "/api/settings/report-schedules",
        { id: "rs1", cadence: "Tue 08:30" },
      ),
    () =>
      (async () => {
        const res = await fetch(`${BASE}/api/settings/geofences`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(cookie ? { Cookie: cookie } : {}),
          },
          body: JSON.stringify({
            name: `Smoke Delete Fence ${Date.now().toString(36)}`,
            radius: "200m",
            triggers: "at_plant on enter",
          }),
        });
        let id = "";
        try {
          const json = await res.json();
          id = json.data?.id ?? "";
        } catch {
          /* ignore */
        }
        if (!res.ok || !id) {
          return {
            path: "DELETE /api/settings/geofences",
            ok: false,
            status: res.status,
            detail: "could not create geofence to delete",
          };
        }
        return writeCheck(
          "DELETE /api/settings/geofences",
          cookie,
          "DELETE",
          "/api/settings/geofences",
          { id },
        );
      })(),
    () =>
      writeCheck(
        "PATCH /api/settings/config security",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "security",
          values: { passwordMinLength: 14, passwordRotationDays: 60 },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config tracking",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "tracking",
          values: { tokenExpiryDays: 120 },
        },
      ),
    () =>
      writeCheck(
        "POST /api/fleet/groups/fg1 member",
        cookie,
        "POST",
        "/api/fleet/groups/fg1",
        { driver: "Smoke Driver", vehicle: "MH-27-AB-1234" },
      ),
    () =>
      writeCheck(
        "POST /api/integrations/fleetbase health",
        cookie,
        "POST",
        "/api/integrations/fleetbase",
        { action: "health" },
      ),
    () =>
      writeCheck(
        "POST /api/auth/forgot-password",
        "",
        "POST",
        "/api/auth/forgot-password",
        { email: "smoke@zaftys.com" },
      ),
    () =>
      writeCheck(
        "POST /api/billing/accounts",
        cookie,
        "POST",
        "/api/billing/accounts",
        { code: "5200", name: "Smoke expense", type: "Expense" },
      ),
    () =>
      writeCheck(
        "POST /api/auth/reset-password",
        "",
        "POST",
        "/api/auth/reset-password",
        {
          email: "smoke@zaftys.com",
          password: "smokepass1",
          confirmPassword: "smokepass1",
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/report-schedules recipients",
        cookie,
        "PATCH",
        "/api/settings/report-schedules",
        { id: "rs1", recipients: "ops-smoke@zaftys.com" },
      ),
    () =>
      writeCheck(
        "POST /api/settings/groups/gr1 member",
        cookie,
        "POST",
        "/api/settings/groups/gr1",
        { userId: "u2" },
      ),
    () =>
      writeCheck(
        "DELETE /api/settings/groups/gr1 member",
        cookie,
        "DELETE",
        "/api/settings/groups/gr1",
        { userId: "u2" },
      ),
    () =>
      writeCheck(
        "DELETE /api/fleet/groups/fg1 member",
        cookie,
        "DELETE",
        "/api/fleet/groups/fg1",
        { driver: "Smoke Driver", vehicle: "MH-27-AB-1234" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/roles/r2 permissions",
        cookie,
        "PATCH",
        "/api/settings/roles/r2",
        { permissions: { billing: true } },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/notifications recipients",
        cookie,
        "PATCH",
        "/api/settings/notifications",
        { id: "n-exc", recipients: "Email + in-app · smoke team" },
      ),
    () =>
      writeCheck("POST /api/shipments/import", cookie, "POST", "/api/shipments/import", {
        rows: [
          {
            client: "Smoke Import Co",
            origin: "Amravati",
            destination: "Nagpur",
            commodity: "Cement",
            tonnageMt: 28,
          },
        ],
      }),
    () =>
      writeCheck(
        "PATCH /api/settings/config policies",
        cookie,
        "PATCH",
        "/api/settings/config",
        { section: "policies", values: { requireLrBeforeTransit: false, alertDaysBeforeExpiry: 21 } },
      ),
    () =>
      writeCheck(
        "PATCH /api/fleet/places/pl1 sync geofence",
        cookie,
        "PATCH",
        "/api/fleet/places/pl1",
        { syncGeofence: true },
      ),
    () =>
      writeCheck(
        "POST /api/maintenance/faults/fr1/work-order",
        cookie,
        "POST",
        "/api/maintenance/faults/fr1/work-order",
        {},
      ),
    () =>
      writeCheck("PATCH /api/shipments/1 reschedule", cookie, "PATCH", "/api/shipments/1", {
        eta: "Tomorrow, 11:00 AM",
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
      }),
    () =>
      writeCheck("PATCH /api/shipments/quotes/q2 decline", cookie, "PATCH", "/api/shipments/quotes/q2", {
        status: "declined",
      }),
    async () => {
      const createRes = await fetch(`${BASE}/api/settings/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify({ name: `Smoke Delete Role ${Date.now().toString(36)}` }),
      });
      const createJson = await createRes.json();
      const roleId = createJson.data?.id;
      if (!createRes.ok || !roleId) {
        return {
          path: "DELETE /api/settings/roles/[id]",
          ok: false,
          status: createRes.status,
          detail: "create role failed",
        };
      }
      return writeCheck(
        "DELETE /api/settings/roles/[id]",
        cookie,
        "DELETE",
        `/api/settings/roles/${roleId}`,
        {},
      );
    },
    () =>
      writeCheck(
        "POST /api/settings/users/u2/invite",
        cookie,
        "POST",
        "/api/settings/users/u2/invite",
        {},
      ),
    () =>
      writeCheck("POST /api/maintenance/parts", cookie, "POST", "/api/maintenance/parts", {
        sku: `SMK-${Date.now().toString().slice(-5)}`,
        name: "Smoke test filter",
        stock: 6,
        reorder: 2,
        location: "Amravati depot",
      }),
    () =>
      writeCheck(
        "PATCH /api/settings/config dispatch scalar",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "dispatch",
          values: { orchestratorMode: "Auto-propose on pending queue" },
        },
      ),
    () =>
      writeCheck(
        "POST /api/dispatch/orchestrator apply",
        cookie,
        "POST",
        "/api/dispatch/orchestrator",
        { action: "apply" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config routing engine",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "routing",
          values: { primaryEngine: "Valhalla + OSRM fallback", maxAxleMt: 44 },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config map provider",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "map",
          values: { provider: "MapLibre GL + OpenFreeMap", style: "Light industrial" },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config navigator branding",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "navigator",
          values: { appName: "ZAFTYS Navigator Pro", primaryColor: "#0F766E" },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config weekend dispatch",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "scheduling",
          values: { weekendDispatch: "Blocked without ops approval" },
        },
      ),
    () =>
      writeCheck(
        "PATCH /api/maintenance/parts reorder",
        cookie,
        "PATCH",
        "/api/maintenance/parts",
        { id: "pt1", reorder: 6, location: "Amravati depot · aisle B" },
      ),
    () =>
      writeCheck("POST /api/maintenance/faults", cookie, "POST", "/api/maintenance/faults", {
        vehicle: "MH-27-AB-1234",
        driver: "Smoke Driver",
        issue: "Smoke clutch slip",
      }),
    () =>
      writeCheck(
        "PATCH /api/clients/c2/users resend",
        cookie,
        "PATCH",
        "/api/clients/c2/users",
        { userId: "cu3", resend: true },
      ),
    () =>
      writeCheck(
        "POST /api/dispatch/orchestrator dismiss",
        cookie,
        "POST",
        "/api/dispatch/orchestrator",
        { action: "dismiss" },
      ),
    () =>
      writeCheck(
        "PATCH /api/settings/config routing truck profile",
        cookie,
        "PATCH",
        "/api/settings/config",
        {
          section: "routing",
          values: { truckProfile: "Multi-axle · 32 MT" },
        },
      ),
    () =>
      writeCheck("POST /api/network/listings draft", cookie, "POST", "/api/network/listings", {
        shipmentId: "12",
        trucksNeeded: 2,
        priceType: "fixed",
        rateInr: 46000,
        advancePercent: 25,
        bodyType: "Open",
        tyres: 10,
        plantNotes: "Smoke draft",
        publish: false,
      }),
    async () => {
      const res = await fetch(`${BASE}/api/network/listings`, {
        headers: { Cookie: cookie },
        cache: "no-store",
      });
      const json = await res.json();
      const rows = Array.isArray(json.data) ? json.data : [];
      const hasRow = rows.some((r) => r?.listing?.shipmentId === "12" && r?.shipment?.publicId);
      return {
        path: "GET /api/network/listings desk",
        ok: res.ok && hasRow,
        status: res.status,
        detail: hasRow ? `${rows.length} rows · shipment joined` : `missing desk row (${rows.length})`,
      };
    },
    () =>
      writeCheck(
        "PATCH /api/network/listings/12 update",
        cookie,
        "PATCH",
        "/api/network/listings/12",
        { rateInr: 48500, trucksNeeded: 2, plantNotes: "Smoke updated" },
      ),
    () =>
      writeCheck(
        "PATCH /api/network/listings/12 publish",
        cookie,
        "PATCH",
        "/api/network/listings/12",
        { publish: true },
      ),
    async () => {
      const listingRes = await fetch(`${BASE}/api/network/listings/12`, {
        headers: { Cookie: cookie },
      });
      const listingJson = await listingRes.json();
      const offerId = listingJson?.data?.offers?.find((o) => o.status === "open")?.id;
      if (!offerId) {
        return {
          path: "PATCH /api/network/offers accept",
          ok: false,
          status: listingRes.status,
          detail: `no open offer: ${JSON.stringify(listingJson).slice(0, 120)}`,
        };
      }
      return writeCheck(
        "PATCH /api/network/offers accept",
        cookie,
        "PATCH",
        `/api/network/offers/${offerId}`,
        { action: "accept" },
      );
    },
    () =>
      writeCheck(
        "DELETE /api/network/listings/12 withdraw",
        cookie,
        "DELETE",
        "/api/network/listings/12",
      ),
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
