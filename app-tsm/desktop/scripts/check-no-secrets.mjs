/**
 * Fail if desktop tree contains bridge/DB secret *assignments* (docs may mention names).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skipDirs = new Set(["node_modules", "target", ".git", "dist"]);
const patterns = [
  /TRANZFORT_SERVICE_KEY\s*=\s*["']?[^"'\s#]+/,
  /SERVICE_ROLE_KEY\s*=\s*["']?[^"'\s#]+/,
  /DATABASE_URL\s*=\s*["']?postgres/i,
  /FLEETBASE_API_KEY\s*=\s*["']?[^"'\s#]+/,
  /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/, // JWT-shaped
];

const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(rs|toml|json|html|mjs|js|ts|tsx|env|example|css)$/i.test(name) && name !== ".env") {
      continue;
    }
    // Allow commented placeholders in .env.example
    const lines = readFileSync(p, "utf8").split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      for (const re of patterns) {
        if (re.test(line)) {
          hits.push(`${relative(root, p)}:${i + 1}`);
          break;
        }
      }
    }
  }
}

walk(root);
if (hits.length) {
  console.error("Desktop secret scan FAILED — remove secrets from:");
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
}
console.log("Desktop secret scan OK (no service_role / DB / Fleetbase key assignments).");
