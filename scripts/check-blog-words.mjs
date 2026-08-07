import fs from "fs";

const t = fs.readFileSync("src/lib/blog-data.ts", "utf8");
const slugs = [...t.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
for (const slug of slugs) {
  const start = t.indexOf(`slug: "${slug}"`);
  const idxs = slugs
    .map((s) => t.indexOf(`slug: "${s}"`))
    .filter((i) => i > start)
    .sort((a, b) => a - b);
  const next = idxs[0] ?? t.length;
  const chunk = t.slice(start, next);
  const sec = chunk.indexOf("sections:");
  const faq = chunk.indexOf("faqs:");
  // count faqs + sections
  const body = chunk.slice(Math.min(faq, sec));
  const bodyStrings = [...body.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) =>
    JSON.parse(`"${m[1]}"`),
  );
  const words = bodyStrings.join(" ").split(/\s+/).filter(Boolean).length;
  const headings = [...chunk.matchAll(/heading: "([^"]+)"/g)].map((m) => m[1]);
  console.log(slug, "words~", words, "secs", headings.length);
  console.log(" ", headings.join(" | "));
}
