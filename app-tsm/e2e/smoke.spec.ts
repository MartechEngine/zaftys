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
});
