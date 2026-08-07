/**
 * Ports docs/marketing/blog-posts.md into src/lib/blog-data.ts
 * Usage: node scripts/port-blog-posts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdPath = path.join(root, "docs", "marketing", "blog-posts.md");
const outPath = path.join(root, "src", "lib", "blog-data.ts");

const META = {
  "reduce-empty-return-trips": {
    publishedAt: "2026-08-02",
    category: "operations",
    summary:
      "Empty returns waste fuel, time, and margin. Industrial programs improve when corridors, schedules, and overflow capacity are planned together.",
    relatedSlugs: [
      "planning-industrial-shipments",
      "tms-for-heavy-haul",
      "cement-plant-loading-windows",
    ],
    heroImage: "/images/blog/reduce-empty-return-trips.jpg",
    cta: { label: "Get a freight quote", whatsapp: true },
  },
  "planning-industrial-shipments": {
    publishedAt: "2026-08-03",
    category: "operations",
    summary:
      "Most industrial freight failures start before the vehicle moves. Align cargo, asset, plant timing, and paperwork in one plan.",
    relatedSlugs: [
      "reduce-empty-return-trips",
      "cement-plant-loading-windows",
      "tms-for-heavy-haul",
    ],
    heroImage: "/images/blog/planning-industrial-shipments.jpg",
    cta: { label: "Explore industrial services", to: "/services" },
  },
  "cement-plant-loading-windows": {
    publishedAt: "2026-08-04",
    category: "industries",
    summary:
      "Detention and queue time can erase corridor planning. Align tipper capacity, plant windows, and documentation before the vehicle reaches the gate.",
    relatedSlugs: [
      "planning-industrial-shipments",
      "reduce-empty-return-trips",
      "steel-coil-transport-basics",
    ],
    heroImage: "/images/blog/cement-plant-loading-windows.jpg",
    cta: { label: "Cement & construction logistics", to: "/industries/cement" },
  },
  "steel-coil-transport-basics": {
    publishedAt: "2026-08-05",
    category: "industries",
    summary:
      "Coils and plates fail quietly when bed type, strapping, or axle planning is wrong. This guide covers the basics shippers and mill teams should align before dispatch.",
    relatedSlugs: [
      "planning-industrial-shipments",
      "cement-plant-loading-windows",
      "tms-for-heavy-haul",
    ],
    heroImage: "/images/blog/steel-coil-transport-basics.jpg",
    cta: { label: "Steel & metals logistics", to: "/industries/steel-metals" },
  },
  "tms-for-heavy-haul": {
    publishedAt: "2026-08-06",
    category: "technology",
    summary:
      "GPS alone is not a transport management system. For heavy-haul freight, the platform must support dispatch discipline, documentation, and plant-window reality.",
    relatedSlugs: [
      "planning-industrial-shipments",
      "reduce-empty-return-trips",
      "steel-coil-transport-basics",
    ],
    heroImage: "/images/blog/tms-for-heavy-haul.jpg",
    cta: { label: "Explore ZAFTYS TMS", to: "/technology" },
  },
};

function esc(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function field(table, key) {
  const re = new RegExp(`\\|\\s*\\*\\*${key}\\*\\*\\s*\\|\\s*([^|]+)\\|`, "i");
  const m = table.match(re);
  return m ? m[1].trim().replace(/^`|`$/g, "") : "";
}

function stripMdBold(s) {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

function parseBullets(block) {
  return block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]|\d+\./.test(l))
    .map((l) => stripMdBold(l.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").trim()))
    .filter(Boolean);
}

function parseSections(articleBody) {
  const chunks = articleBody.split(/^### /m).slice(1);
  const sections = [];

  for (const chunk of chunks) {
    const nl = chunk.indexOf("\n");
    let heading = chunk.slice(0, nl).trim();
    let body = chunk.slice(nl + 1).trim();
    if (heading === "Soft CTA") heading = "What to do next";
    if (!heading || heading === "FAQs" || heading === "References") {
      if (heading === "References") {
        const bullets = parseBullets(body);
        if (bullets.length) {
          sections.push({
            heading: "References",
            paragraphs: [
              "Outside links below are for grounding and further reading. They are not endorsements of those vendors' products.",
            ],
            bullets,
          });
        }
      }
      continue;
    }

    const paragraphs = [];
    let bullets;

    // Split into blocks by blank lines
    const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
    for (const block of blocks) {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      const isList = lines.every((l) => /^[-*]|\d+\./.test(l));
      if (isList) {
        bullets = [...(bullets || []), ...parseBullets(block)];
      } else {
        // Join soft-wrapped lines inside a paragraph block
        const para = stripMdBold(lines.join(" ").replace(/\s+/g, " ").trim());
        if (para) paragraphs.push(para);
      }
    }

    if (paragraphs.length || (bullets && bullets.length)) {
      sections.push({
        heading,
        paragraphs: paragraphs.length ? paragraphs : [""],
        ...(bullets?.length ? { bullets } : {}),
      });
    }
  }

  return sections.filter((s) => s.paragraphs.some((p) => p) || s.bullets?.length);
}

function parseFaqs(faqBlock) {
  const faqs = [];
  const parts = faqBlock.split(/\*\*/).slice(1);
  for (let i = 0; i < parts.length; i += 2) {
    let q = parts[i]?.trim() || "";
    let a = parts[i + 1]?.trim() || "";
    q = q.replace(/\?$/, "?").replace(/\s+$/, "");
    if (!q.endsWith("?")) {
      // question might include trailing spaces then answer on next
    }
    // Format: **Q?**  \n Answer
    const qm = q.match(/^(.+\?)\s*$/);
    if (qm) q = qm[1];
    a = a.replace(/^\s*/, "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    a = stripMdBold(a);
    if (q && a) faqs.push({ question: q, answer: a });
  }
  return faqs;
}

function wordCount(sections) {
  const text = sections
    .flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

function readMinutes(words) {
  return Math.max(7, Math.round(words / 160));
}

function serializeCta(cta) {
  if (cta.whatsapp) return `{ label: ${JSON.stringify(cta.label)}, whatsapp: true }`;
  return `{ label: ${JSON.stringify(cta.label)}, to: ${JSON.stringify(cta.to)} }`;
}

function serializePost(post) {
  const lines = [];
  lines.push("  {");
  lines.push(`    slug: ${JSON.stringify(post.slug)},`);
  lines.push(`    title: ${JSON.stringify(post.title)},`);
  lines.push(`    seoTitle: ${JSON.stringify(post.seoTitle)},`);
  lines.push(`    seoDescription: ${JSON.stringify(post.seoDescription)},`);
  lines.push(`    category: ${JSON.stringify(post.category)},`);
  lines.push(`    publishedAt: ${JSON.stringify(post.publishedAt)},`);
  lines.push(`    updatedAt: ${JSON.stringify(post.updatedAt)},`);
  lines.push(`    author: ${JSON.stringify(post.author)},`);
  lines.push(`    summary: ${JSON.stringify(post.summary)},`);
  lines.push(`    readMinutes: ${post.readMinutes},`);
  lines.push(`    heroImage: ${JSON.stringify(post.heroImage)},`);
  lines.push(
    `    relatedSlugs: ${JSON.stringify(post.relatedSlugs)},`,
  );
  lines.push("    faqs: [");
  for (const f of post.faqs) {
    lines.push("      {");
    lines.push(`        question: ${JSON.stringify(f.question)},`);
    lines.push(`        answer: ${JSON.stringify(f.answer)},`);
    lines.push("      },");
  }
  lines.push("    ],");
  lines.push("    sections: [");
  for (const s of post.sections) {
    lines.push("      {");
    lines.push(`        heading: ${JSON.stringify(s.heading)},`);
    lines.push("        paragraphs: [");
    for (const p of s.paragraphs) {
      if (!p) continue;
      lines.push(`          ${JSON.stringify(p)},`);
    }
    lines.push("        ],");
    if (s.bullets?.length) {
      lines.push("        bullets: [");
      for (const b of s.bullets) {
        lines.push(`          ${JSON.stringify(b)},`);
      }
      lines.push("        ],");
    }
    lines.push("      },");
  }
  lines.push("    ],");
  lines.push(`    cta: ${serializeCta(post.cta)},`);
  lines.push("  },");
  return lines.join("\n");
}

let md = fs.readFileSync(mdPath, "utf8");
const checklistAt = md.indexOf("## Editorial checklist");
if (checklistAt !== -1) md = md.slice(0, checklistAt);
const rawPosts = md.split(/^# \d+\. /m).slice(1);
const parsed = [];

for (const raw of rawPosts) {
  const titleLine = raw.split("\n")[0].trim();
  const tableMatch = raw.match(/\| Meta \| Value \|[\s\S]*?\n\n## Article/);
  const table = tableMatch ? tableMatch[0] : "";
  const slug = field(table, "Slug").replace(/`/g, "");
  const seoTitle = field(table, "SEO title");
  const seoDescription = field(table, "SEO description");
  const meta = META[slug];
  if (!meta) throw new Error(`No META for slug ${slug}`);

  const afterArticle = raw.split("## Article\n")[1] || "";
  const faqSplit = afterArticle.split("### FAQs\n");
  const refsSplit = (faqSplit[1] || "").split("### References\n");
  const articleMain = faqSplit[0];
  const faqBlock = refsSplit[0] || "";
  const refsBlock = refsSplit[1] || "";

  const sections = parseSections(articleMain + (refsBlock ? `\n### References\n${refsBlock}` : ""));
  const faqs = parseFaqs(faqBlock);
  // Ensure markdown links survive in FAQ answers (don't strip link syntax)
  const faqsFixed = [];
  const faqRe = /\*\*(.+?\?)\*\*\s*\n([^*]+?)(?=\n\*\*|\n###|$)/gs;
  let m;
  const faqSrc = faqBlock;
  while ((m = faqRe.exec(faqSrc))) {
    faqsFixed.push({
      question: m[1].trim(),
      answer: m[2].replace(/\n+/g, " ").replace(/\s+/g, " ").trim(),
    });
  }

  const words = wordCount(sections) + faqsFixed.reduce((n, f) => n + f.answer.split(/\s+/).length, 0);
  parsed.push({
    slug,
    title: titleLine,
    seoTitle,
    seoDescription,
    category: meta.category,
    publishedAt: meta.publishedAt,
    updatedAt: "2026-08-07",
    author: "ZAFTYS Operations",
    summary: meta.summary,
    readMinutes: readMinutes(words),
    heroImage: meta.heroImage,
    relatedSlugs: meta.relatedSlugs,
    faqs: faqsFixed.length ? faqsFixed : faqs,
    sections,
    cta: meta.cta,
    _words: words,
  });
}

// Sort by publishedAt desc to match previous editorial order preference in source array
parsed.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const header = `/** ZAFTYS Blog — typed content modules (ported from docs/marketing/blog-posts.md) */

export type BlogCategory = "operations" | "industries" | "technology";

export type BlogCta =
  | { label: string; to: string }
  | { label: string; whatsapp: true };

export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: BlogCategory;
  publishedAt: string;
  /** ISO date — when the guide was last materially revised */
  updatedAt?: string;
  author: string;
  summary: string;
  readMinutes: number;
  heroImage?: string;
  relatedSlugs: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  sections: readonly BlogSection[];
  cta: BlogCta;
};

export const blogCategoryLabels: Record<BlogCategory, string> = {
  operations: "Operations",
  industries: "Industries",
  technology: "Technology",
};

export const blogPosts: readonly BlogPost[] = [
`;

const footer = `];

export function listPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const found = post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));
  return found.slice(0, limit);
}

export function formatPostDate(isoDate: string): string {
  const date = new Date(\`\${isoDate}T12:00:00\`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function postModifiedAt(post: Pick<BlogPost, "publishedAt" | "updatedAt">): string {
  return post.updatedAt ?? post.publishedAt;
}

export function latestPosts(limit = 3): BlogPost[] {
  return listPosts().slice(0, limit);
}
`;

const body = parsed.map((p) => serializePost(p)).join("\n");
fs.writeFileSync(outPath, header + body + "\n" + footer, "utf8");

for (const p of parsed) {
  console.log(`${p.slug}: ~${p._words} words, ${p.readMinutes} min, ${p.sections.length} sections, ${p.faqs.length} faqs`);
}
console.log("Wrote", outPath);
