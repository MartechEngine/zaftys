#!/usr/bin/env node
/**
 * Auth-lite smoke: login + /api/tsm/org + publish role gate.
 *
 * Env:
 *   BASE_URL (default http://localhost:3000)
 *   TSM_AUTH_EMAIL / TSM_AUTH_PASSWORD — primary user under test
 *   Optional: also checks dispatcher@zaftys.com / dev still works
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const email = process.env.TSM_AUTH_EMAIL ?? "";
const password = process.env.TSM_AUTH_PASSWORD ?? "";

let failed = 0;

function ok(label) {
  console.log(`✓ ${label}`);
}
function fail(label, detail) {
  failed += 1;
  console.log(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

async function login(userEmail, userPassword) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });
  const json = await res.json().catch(() => ({}));
  const cookie = res.headers.getSetCookie?.()?.join("; ") ?? res.headers.get("set-cookie") ?? "";
  return { res, json, cookie };
}

async function main() {
  console.log(`Auth-lite smoke → ${BASE}`);

  // Health
  try {
    const h = await fetch(`${BASE}/api/health`);
    if (h.ok) ok("GET /api/health");
    else fail("GET /api/health", `status ${h.status}`);
  } catch (e) {
    fail("GET /api/health", e instanceof Error ? e.message : "unreachable");
    process.exit(1);
  }

  // Baseline dispatcher still works
  {
    const { res, json, cookie } = await login("dispatcher@zaftys.com", "dev");
    if (res.ok && json?.data?.user?.email === "dispatcher@zaftys.com") {
      ok("login dispatcher@zaftys.com");
      const org = await fetch(`${BASE}/api/tsm/org`, { headers: { Cookie: cookie } });
      const body = await org.json().catch(() => ({}));
      if (org.ok && body?.data?.seat?.canPublish === true) ok("dispatcher canPublish on /api/tsm/org");
      else fail("/api/tsm/org as dispatcher", JSON.stringify(body?.error ?? body).slice(0, 200));
    } else {
      fail("login dispatcher@zaftys.com", JSON.stringify(json?.error ?? { status: res.status }).slice(0, 200));
    }
  }

  if (!email || !password) {
    fail("TSM_AUTH_EMAIL / TSM_AUTH_PASSWORD not set — skip primary user checks");
  } else {
    const { res, json, cookie } = await login(email, password);
    if (!res.ok || !json?.data?.user) {
      fail(`login ${email}`, JSON.stringify(json?.error ?? { status: res.status }).slice(0, 200));
    } else {
      ok(`login ${email} (role=${json.data.user.role})`);
      const org = await fetch(`${BASE}/api/tsm/org`, { headers: { Cookie: cookie } });
      const body = await org.json().catch(() => ({}));
      if (org.ok && body?.data?.org?.id) {
        ok(`/api/tsm/org as ${email}`);
        if (body.data.seat?.canPublish) ok(`${email} canPublish=true`);
        else fail(`${email} canPublish`, "expected true for admin/dispatcher");
      } else {
        fail(`/api/tsm/org as ${email}`, JSON.stringify(body?.error ?? body).slice(0, 200));
      }

      // Mock publish should succeed for publish roles
      const pub = await fetch(`${BASE}/api/tsm/tranzfort/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Cookie: cookie },
        body: JSON.stringify({
          draft: {
            idempotencyKey: `auth-smoke-${Date.now()}`,
            originLabel: "A gate",
            originCity: "Nagpur",
            originState: "MH",
            originLat: 21.14,
            originLng: 79.08,
            destinationLabel: "B plant",
            destinationCity: "Pune",
            destinationState: "MH",
            destinationLat: 18.52,
            destinationLng: 73.85,
            routeDistanceKm: 700,
            routeDurationMinutes: 700,
            routePolyline: "",
            routeSnapshotSource: "tsm",
            material: "Steel",
            materialCode: "STEEL",
            weightTonnes: 20,
            requiredBodyType: null,
            requiredTyres: null,
            trucksNeeded: 1,
            priceAmount: 40000,
            priceType: "fixed",
            advancePercentage: 20,
            pickupDate: new Date().toISOString().slice(0, 10),
            listingDuration: "7_days",
            requiredVehicleCategoryCode: null,
            requiredBodyStyleCodes: [],
            requiredConfigurationCodes: ["PLACEHOLDER_CONFIG"],
            requiredVehicleCategoryCodes: [],
          },
        }),
      });
      const pubBody = await pub.json().catch(() => ({}));
      if (pub.ok && pubBody?.data?.loadId) ok(`mock publish → ${pubBody.data.loadId}`);
      else fail("mock publish", JSON.stringify(pubBody?.error ?? pubBody).slice(0, 240));
    }

    // Wrong password must fail
    const bad = await login(email, "wrong-password-!!!");
    if (bad.res.status === 401) ok("wrong password rejected");
    else fail("wrong password rejected", `status ${bad.res.status}`);
  }

  console.log(failed === 0 ? "\nAuth-lite smoke PASSED" : `\nAuth-lite smoke FAILED (${failed})`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
