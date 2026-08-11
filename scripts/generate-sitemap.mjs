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
function blogPostUrls() {
  const src = fs.readFileSync(path.join(root, "src", "lib", "blog-data.ts"), "utf8");
  const posts = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    posts.push({ slug: m[1], lastmod: m[2] });
  }
  return posts;
}

function reportUrls() {
  const src = fs.readFileSync(path.join(root, "src", "lib", "market-reports-data.ts"), "utf8");
  const reports = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    reports.push({ slug: m[1], lastmod: m[2] });
  }
  return reports;
}

const industrySlugs = [
  "cement",
  "coal-mining",
  "steel-metals",
  "chemicals",
  "manufacturing",
  "fmcg",
  "retail-distribution",
  "industrial-logistics",
];

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { path: "/services", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/network", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/technology", priority: "0.9", changefreq: "weekly", lastmod: today },
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
  { path: "/resources/reports", priority: "0.8", changefreq: "weekly", lastmod: today },
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
  path: `/resources/reports/${p.slug}`,
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
