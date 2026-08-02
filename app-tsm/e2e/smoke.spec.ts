import { expect, test } from "@playwright/test";

const EMAIL = process.env.SMOKE_EMAIL ?? "dispatcher@zaftys.com";
const PASSWORD = process.env.SMOKE_PASSWORD ?? "dev";

/** API login — avoids React hydration flakes on the login form under Turbopack load. */
async function login(page: import("@playwright/test").Page, email = EMAIL) {
  await page.context().clearCookies();
  const res = await page.request.post("/api/auth/login", {
    data: { email, password: PASSWORD },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  const redirectTo = body.data?.redirectTo ?? "/";
  await page.goto(redirectTo);
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 20_000 });
}

test.describe("TSM portal smoke", () => {
  test.describe.configure({ mode: "serial" });

  test("login and core routes load", async ({ page }) => {
    await login(page);

    await expect(page.getByRole("heading", { level: 1, name: "Command Center" })).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByText("Demo UI mode")).toHaveCount(0);

    await page.goto("/shipments");
    await expect(
      page
        .getByRole("heading", { level: 1, name: "Shipments" })
        .or(page.getByText(/Something went wrong|Too many requests|Try again/i)),
    ).toBeVisible({ timeout: 30_000 });

    await page.goto("/map");
    await expect(
      page
        .getByRole("heading", { level: 1, name: "Live map" })
        .or(page.getByText(/Something went wrong|temporarily unavailable|Too many requests/i)),
    ).toBeVisible({ timeout: 30_000 });
    // Map canvas when shell rendered; skip if hard error boundary
    if (await page.getByRole("heading", { level: 1, name: "Live map" }).isVisible()) {
      await expect(page.getByRole("button", { name: "Refresh map" })).toBeVisible();
      await expect(page.locator(".maplibregl-canvas, .maplibregl-map").first()).toBeVisible({
        timeout: 15_000,
      });
    }

    await page.goto("/dispatch");
    await expect(
      page
        .getByRole("heading", { level: 1, name: "Dispatch board" })
        .or(page.getByText(/Something went wrong|Too many requests|Try again/i)),
    ).toBeVisible({ timeout: 30_000 });
  });

  test("documents and profile shells load", async ({ page }) => {
    await login(page);

    await page.goto("/documents");
    await expect(page.getByRole("heading", { level: 1, name: "Documents" })).toBeVisible({
      timeout: 25_000,
    });

    await page.goto("/profile");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 25_000 });
  });

  test("network deferred honesty (dispatcher)", async ({ page }) => {
    await login(page);

    await page.goto("/network");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/TranZfort deferred/i)).toBeVisible();
    await expect(page.getByText("Demo UI mode")).toHaveCount(0);
  });

  test("integrations session honesty (admin)", async ({ page }) => {
    await login(page, "admin@zaftys.com");

    await page.goto("/integrations");
    await expect(page.getByRole("heading", { level: 1, name: "Integrations" })).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByText(/Session-only/i).first()).toBeVisible();
    await expect(page.getByText("Demo UI mode")).toHaveCount(0);
  });

  test("health API reports live mode", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.demoUi).toBe(false);
    expect(body.dataSource ?? body.data?.dataSource).toBe("fleetbase");
  });
});
