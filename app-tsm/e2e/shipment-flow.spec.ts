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

test.describe("North-star shipment flow", () => {
  test("create → detail → track → map", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await login(page);

    await page.goto("/shipments/new");
    await expect(page.getByText("1. Client & route")).toBeVisible({ timeout: 15_000 });

    // Step 0 — client & route (defaults are fine)
    await page.getByRole("button", { name: "Next step" }).click();

    // Step 1 — load details
    await page.getByLabel("Commodity").fill("Cement");
    await page.getByLabel("Tonnage (MT)").fill("28");
    await page.getByRole("button", { name: "Next step" }).click();

    // Step 2 — assign first available driver/vehicle when options exist
    const driverSelect = page
      .locator("label")
      .filter({ has: page.locator("span", { hasText: /^Driver$/ }) })
      .locator("select");
    const vehicleSelect = page
      .locator("label")
      .filter({ has: page.locator("span", { hasText: /^Vehicle$/ }) })
      .locator("select");
    await expect(driverSelect).toBeVisible({ timeout: 15_000 });
    const driverOptions = await driverSelect.locator("option").count();
    if (driverOptions > 1) {
      await driverSelect.selectOption({ index: 1 });
    }
    const vehicleOptions = await vehicleSelect.locator("option").count();
    if (vehicleOptions > 1) {
      await vehicleSelect.selectOption({ index: 1 });
    }
    await page.getByRole("button", { name: "Next step" }).click();

    // Step 3 — create (exclude /shipments/new from match)
    await page.getByRole("button", { name: "Create shipment" }).click();
    await page.waitForURL(
      (url) =>
        /^\/shipments\/[^/]+$/.test(url.pathname) &&
        url.pathname !== "/shipments/new" &&
        url.pathname !== "/shipments/quotes",
      { timeout: 20_000 },
    );

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy track link" })).toBeVisible({
      timeout: 10_000,
    });

    const trackLink = page.getByRole("link", { name: "Preview track page" });
    if (!(await trackLink.isVisible().catch(() => false))) {
      await page.getByRole("button", { name: "Copy track link" }).click();
      await expect(trackLink).toBeVisible({ timeout: 10_000 });
    }
    const href = await trackLink.getAttribute("href");
    expect(href).toMatch(/\/track\//);

    await page.goto(href!);
    await expect(page.locator("main").first()).toBeVisible({ timeout: 15_000 });

    await page.goto("/map");
    await expect(page.getByRole("heading", { level: 1, name: "Live map" })).toBeVisible();
    await expect(page.locator(".maplibregl-canvas, .maplibregl-map").first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
