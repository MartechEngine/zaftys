/**
 * Apply TSM_DESKTOP_URL into tauri.conf.json + splash HTML.
 * Never write secrets — URL only. Run before `tauri dev` / `tauri build`.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvFile(join(root, ".env"));
loadEnvFile(join(root, ".env.local"));

const raw = (process.env.TSM_DESKTOP_URL ?? "http://localhost:3000").trim();
let url;
try {
  url = new URL(raw);
} catch {
  console.error(`Invalid TSM_DESKTOP_URL: ${raw}`);
  process.exit(1);
}
if (url.protocol !== "http:" && url.protocol !== "https:") {
  console.error(`TSM_DESKTOP_URL must be http(s): ${raw}`);
  process.exit(1);
}
if (/service[_-]?role|service_key|postgres(ql)?:\/\//i.test(raw)) {
  console.error("Refusing TSM_DESKTOP_URL that looks like a secret or DB URL.");
  process.exit(1);
}

const confPath = join(root, "src-tauri", "tauri.conf.json");
const conf = JSON.parse(readFileSync(confPath, "utf8"));
if (!conf.app?.windows?.[0]) {
  console.error("tauri.conf.json missing app.windows[0]");
  process.exit(1);
}
conf.app.windows[0].url = url.toString().replace(/\/$/, "") || url.origin;
writeFileSync(confPath, `${JSON.stringify(conf, null, 2)}\n`, "utf8");

const splash = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0;url=${conf.app.windows[0].url}" />
    <title>TSM Desktop</title>
  </head>
  <body>
    <p>
      TSM desktop shell — opening
      <a href="${conf.app.windows[0].url}">${conf.app.windows[0].url}</a>.
      Set <code>TSM_DESKTOP_URL</code> in <code>desktop/.env</code> for staging/prod.
    </p>
  </body>
</html>
`;
writeFileSync(join(root, "ui", "index.html"), splash, "utf8");

console.log(`TSM_DESKTOP_URL → ${conf.app.windows[0].url}`);
