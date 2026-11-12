import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const issues = [];
const ok = (msg) => console.log(`OK  ${msg}`);
const bad = (msg) => {
  issues.push(msg);
  console.error(`FAIL ${msg}`);
};

const corridors = read("src/lib/corridors-data.ts");
const slugs = [...corridors.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const related = [...corridors.matchAll(/relatedSlugs:\s*\[([^\]]+)\]/g)].flatMap((m) =>
  [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
);
const missingRelated = [...new Set(related.filter((r) => !slugs.includes(r)))];
if (slugs.length !== 7) bad(`expected 7 corridor slugs, got ${slugs.length}`);
else ok(`7 corridor slugs`);
if (missingRelated.length) bad(`relatedSlugs missing: ${missingRelated.join(", ")}`);
else ok("relatedSlugs resolve");
if (/â€|â†|â€™/.test(corridors)) bad("mojibake still in corridors-data.ts");
else ok("no mojibake in corridors-data.ts");

const schema = read("src/lib/schema.ts");
const constants = read("src/lib/constants.ts");
for (const needle of [
  'name: "ZAFTYS"',
  'legalName: "ZAFTYS Logistics"',
  'alternateName: ["ZAFTYS Logistics", "Zaftys"]',
]) {
  if (!schema.includes(needle)) bad(`schema missing ${needle}`);
  else ok(needle);
}
for (const url of [
  "https://www.linkedin.com/company/zaftys",
  "https://www.youtube.com/@ZAFTYS",
  "https://x.com/zaftyslogistics",
  "https://www.tranzfort.com",
]) {
  if (!constants.includes(url)) bad(`constants missing ${url}`);
  else ok(`sameAs candidate ${url}`);
}
if (constants.match(/organizationSameAs = \[[\s\S]*?crunchbase/)) {
  bad("Crunchbase should not be in organizationSameAs until live");
} else ok("Crunchbase excluded from sameAs");

const home = read("src/lib/page-seo.ts");
const homeTitle = /home:\s*\{[\s\S]*?title:\s*"([^"]+)"/.exec(home)?.[1];
if (homeTitle !== "ZAFTYS | 3PL & Contract Logistics India") {
  bad(`unexpected home title: ${homeTitle}`);
} else ok(`home title ${homeTitle}`);

const prerender = read("scripts/prerender.mjs");
if (!prerender.includes(homeTitle)) bad("prerender HOME_TITLE out of sync with page-seo home");
else ok("prerender HOME_TITLE synced");

const app = read("src/App.tsx");
if (!(app.includes("CorridorsHub") && app.includes("CorridorLeaf"))) bad("App routes missing corridors");
else ok("App corridor routes wired");

const nav = read("src/lib/nav-config.ts");
const logisticsBlock = /id: "logistics"[\s\S]*?items:\s*\[([\s\S]*?)\]/.exec(nav)?.[1] || "";
if (!logisticsBlock.includes("Transportation") || !logisticsBlock.includes("Our Fleet")) {
  bad("Logistics dropdown missing Transportation/Our Fleet");
} else ok("Logistics dropdown has Transportation + Our Fleet");
if (logisticsBlock.includes("Routes & Corridors") || logisticsBlock.includes("corridorUrl")) {
  bad("Logistics dropdown still lists corridors (Option B violation)");
} else ok("Logistics dropdown Option B clean");
if (!nav.includes("All corridors")) bad("Footer missing All corridors");
else ok("Footer corridors column present");

const sitemap = read("public/sitemap.xml");
for (const slug of slugs) {
  const loc = `https://zaftys.com/logistics/corridors/${slug}`;
  if (!sitemap.includes(loc)) bad(`sitemap missing ${loc}`);
}
if (!sitemap.includes("https://zaftys.com/logistics/corridors</loc>")) {
  bad("sitemap missing corridors hub");
} else ok("sitemap has corridors hub + leaves");

const indexHtml = read("index.html");
if (!indexHtml.includes('og:site_name" content="ZAFTYS"')) bad("index.html og:site_name not ZAFTYS");
else ok("index.html og:site_name ZAFTYS");

console.log("");
if (issues.length) {
  console.error(`Predeploy check failed: ${issues.length} issue(s)`);
  process.exit(1);
}
console.log("Predeploy check passed");
