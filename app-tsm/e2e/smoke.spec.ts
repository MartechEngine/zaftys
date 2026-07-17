import { expect, test } from "@playwright/test";

const EMAIL = process.env.SMOKE_EMAIL ?? "dispatcher@zaftys.com";
const PASSWORD = process.env.SMOKE_PASSWORD ?? "dev";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(EMAIL);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in to TSM" }).click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 15_000 });
}

test.describe("TSM portal smoke", () => {
  test("login and core routes load", async ({ page }) => {
    await login(page);

    await expect(page.getByRole("heading", { level: 1, name: "Command Center" })).toBeVisible({
      timeout: 15_000,
    });

    await page.goto("/shipments");
    await expect(page.getByRole("heading", { level: 1, name: "Shipments" })).toBeVisible();
    await expect(page.locator("table")).toBeVisible();

    await page.goto("/map");
    await expect(page.getByRole("heading", { level: 1, name: "Live map" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh map" })).toBeVisible();
    await expect(page.locator(".maplibregl-canvas, .maplibregl-map").first()).toBeVisible({
      timeout: 15_000,
    });

    await page.goto("/dispatch");
    await expect(page.getByRole("heading", { level: 1, name: "Dispatch board" })).toBeVisible();
  });

  test("fleet, documents, billing, and settings shells load", async ({ page }) => {
    await login(page);

    await page.goto("/fleet/drivers");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15_000 });

    await page.goto("/fleet/vehicles");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/fleet/places");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/documents");
    await expect(page.getByRole("heading", { level: 1, name: "Documents" })).toBeVisible();

    await page.goto("/billing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/integrations/fleetbase");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/API key|Connection|Data source/i).first()).toBeVisible();

    await page.goto("/settings/security");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("health API reports demo data source", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.dataSource ?? body.data?.dataSource).toBeTruthy();
  });
});
