/**
 * Snapshot marketing routes into dist/<path>/index.html after `vite build`.
 * Hostinger Apache maps /about → /about/index.html (see public/.htaccess).
 *
 * Skip: SKIP_PRERENDER=1
 * Browsers: npx playwright install chromium
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { preview } from "vite";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const PORT = 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CONCURRENCY = 3;
const HOME_TITLE =
  "ZAFTYS | 3PL Transportation and Contract Logistics";

function routesFromSitemap() {
  const xml = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((loc) => {
    const u = new URL(loc);
    return u.pathname === "" ? "/" : u.pathname;
  });
  return [...new Set(paths)];
}

function outFileFor(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  return path.join(dist, routePath.replace(/^\//, ""), "index.html");
}

function stripHomeLcpPreload(html, routePath) {
  if (routePath === "/") return html;
  return html.replace(/\s*<link[^>]*hero-home[^>]*>/gi, "");
}

async function waitForPage(page, routePath) {
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="Loading page"]'),
    { timeout: 25000 },
  );
  await page.waitForSelector("h1", { timeout: 25000 });
  if (routePath !== "/") {
    await page.waitForFunction(
      (homeTitle) => {
        const title = document.title || "";
        return title.length > 0 && title !== homeTitle;
      },
      HOME_TITLE,
      { timeout: 25000 },
    );
  }
  await page.waitForFunction(
    (routePath) => {
      const can = document.querySelector('link[rel="canonical"]');
      if (!can) return false;
      const href = can.getAttribute("href") || "";
      if (routePath === "/") return href === "https://zaftys.com/" || href === "https://zaftys.com";
      return href === `https://zaftys.com${routePath}`;
    },
    routePath,
    { timeout: 25000 },
  );
}

async function snapshotRoute(browser, routePath) {
  const page = await browser.newPage();
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (/google-analytics|googletagmanager|clarity\.ms|doubleclick/i.test(url)) {
      return route.abort();
    }
    if (new URL(url).pathname.startsWith("/api/")) return route.abort();
    return route.continue();
  });

  const url = `${ORIGIN}${routePath === "/" ? "/" : routePath}`;
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  if (!response || response.status() >= 400) {
    throw new Error(`${routePath} HTTP ${response?.status() ?? "no response"}`);
  }
  await waitForPage(page, routePath);
  const html = stripHomeLcpPreload(await page.content(), routePath);
  await page.close();

  const dest = outFileFor(routePath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, "utf8");
  return dest;
}

async function runPool(items, limit, worker) {
  const pending = [...items];
  const errors = [];
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (pending.length) {
      const item = pending.shift();
      try {
        await worker(item);
      } catch (err) {
        errors.push({ item, err });
      }
    }
  });
  await Promise.all(runners);
  return errors;
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("SKIP_PRERENDER=1 — leaving dist as a client-only SPA");
    return;
  }
  if (!fs.existsSync(path.join(dist, "index.html"))) {
    throw new Error("dist/index.html missing — run vite build first");
  }

  const routes = routesFromSitemap();
  console.log(`Prerendering ${routes.length} routes…`);

  const server = await preview({
    configFile: path.join(root, "vite.config.ts"),
    preview: { host: "127.0.0.1", port: PORT, strictPort: true },
  });

  const browser = await chromium.launch({ headless: true });
  try {
    const errors = await runPool(routes, CONCURRENCY, async (routePath) => {
      const dest = await snapshotRoute(browser, routePath);
      console.log(`  ${routePath} → ${path.relative(root, dest)}`);
    });
    if (errors.length) {
      for (const { item, err } of errors) {
        console.error(`FAIL ${item}:`, err?.message || err);
      }
      throw new Error(`Prerender failed for ${errors.length} route(s)`);
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log("Prerender complete");
}

main().catch((err) => {
  console.error(err);
  if (String(err?.message || err).includes("Executable doesn't exist")) {
    console.error("Install Chromium: npx playwright install chromium");
  }
  process.exit(1);
});
