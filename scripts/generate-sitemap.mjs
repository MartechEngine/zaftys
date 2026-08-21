/**
 * Generate public/sitemap.xml from known marketing routes + blog posts + reports.
 * Usage: node scripts/generate-sitemap.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "public", "sitemap.xml");

const BASE = "https://zaftys.com";
const today = new Date().toISOString().slice(0, 10);

/** Parse publishedAt from blog-data.ts without importing TS */
function blogPostUrlsFromFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const posts = [];
  const starts = [...src.matchAll(/slug:\s*"([^"]+)",\s*\r?\n\s*title:/g)];
  for (let i = 0; i < starts.length; i++) {
    const slug = starts[i][1];
    const from = starts[i].index;
    const to = i + 1 < starts.length ? starts[i + 1].index : src.length;
    const block = src.slice(from, to);
    const published = block.match(/publishedAt:\s*"([^"]+)"/);
    const updated = block.match(/updatedAt:\s*"([^"]+)"/);
    if (published) posts.push({ slug, lastmod: updated?.[1] ?? published[1] });
  }
  return posts;
}

function blogPostUrls() {
  const lib = path.join(root, "src", "lib");
  const files = [path.join(lib, "blog-data.ts")].filter((f) => fs.existsSync(f));
  const bySlug = new Map();
  for (const file of files) {
    for (const post of blogPostUrlsFromFile(file)) {
      bySlug.set(post.slug, post);
    }
  }
  return [...bySlug.values()];
}

function reportUrlsFromFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const reports = [];
  for (const block of src.split(/report\(\{/).slice(1)) {
    const slug = block.match(/slug:\s*"([^"]+)"/);
    const published = block.match(/publishedAt:\s*"([^"]+)"/);
    const updated = block.match(/updatedAt:\s*"([^"]+)"/);
    if (slug && published) {
      reports.push({ slug: slug[1], lastmod: updated?.[1] ?? published[1] });
    }
  }
  return reports;
}

function reportUrls() {
  const lib = path.join(root, "src", "lib");
  const files = [path.join(lib, "market-reports-data.ts")].filter((f) => fs.existsSync(f));
  const bySlug = new Map();
  for (const file of files) {
    for (const report of reportUrlsFromFile(file)) {
      bySlug.set(report.slug, report);
    }
  }
  return [...bySlug.values()];
}

function industrySlugsFromData() {
  const src = fs.readFileSync(path.join(root, "src", "lib", "industries-data.ts"), "utf8");
  const part = src.split("INDUSTRY_SLUG_ALIASES")[0];
  return [...part.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

const industrySlugs = industrySlugsFromData();

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { path: "/logistics", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/network", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/network/tranzfort", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/network/transporter-network", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/network/truck-capacity", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/zaftys-tms", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/zaftys-tms/fleet-management", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/zaftys-tms/tracking", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/zaftys-tms/apis", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/intelligence", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/intelligence/analytics", priority: "0.75", changefreq: "monthly", lastmod: today },
  { path: "/intelligence/freight-rates", priority: "0.75", changefreq: "monthly", lastmod: today },
  { path: "/intelligence/market-intelligence", priority: "0.75", changefreq: "monthly", lastmod: today },
  { path: "/intelligence/ai", priority: "0.75", changefreq: "monthly", lastmod: today },
  { path: "/fleet", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/industries", priority: "0.8", changefreq: "weekly", lastmod: today },
  ...industrySlugs.map((slug) => ({
    path: `/industries/${slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: today,
  })),
  { path: "/partner", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/about", priority: "0.7", changefreq: "monthly", lastmod: today },
  { path: "/contact", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/careers", priority: "0.5", changefreq: "monthly", lastmod: today },
  { path: "/resources", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/reports", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/blog", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/privacy", priority: "0.3", changefreq: "yearly", lastmod: today },
  { path: "/terms", priority: "0.3", changefreq: "yearly", lastmod: today },
  { path: "/cookies", priority: "0.3", changefreq: "yearly", lastmod: today },
  { path: "/legal-notice", priority: "0.3", changefreq: "yearly", lastmod: today },
];

const blogUrls = blogPostUrls().map((p) => ({
  path: `/blog/${p.slug}`,
  priority: "0.7",
  changefreq: "monthly",
  lastmod: p.lastmod,
}));

const marketReportUrls = reportUrls().map((p) => ({
  path: `/reports/${p.slug}`,
  priority: "0.7",
  changefreq: "monthly",
  lastmod: p.lastmod,
}));

const all = [...staticUrls, ...blogUrls, ...marketReportUrls];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const body = all
  .map(
    (u) => `  <url>
    <loc>${escapeXml(BASE + (u.path === "/" ? "/" : u.path))}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${all.length} URLs → ${outPath}`);
