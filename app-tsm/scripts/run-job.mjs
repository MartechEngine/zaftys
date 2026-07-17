#!/usr/bin/env node
/** Invoke cron-authenticated local jobs against a running TSM server. */

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const SECRET = process.env.TSM_CRON_SECRET ?? "";

const job = process.argv[2] ?? "";

const specs = {
  "gps-stale": {
    method: "POST",
    path: "/api/jobs/gps-stale-check",
    body: { raiseException: false },
  },
  "dlq-process": {
    method: "POST",
    path: "/api/sync/dlq",
    body: { action: "process" },
  },
};

const spec = specs[job];
if (!spec) {
  console.error(`Usage: node scripts/run-job.mjs <${Object.keys(specs).join("|")}>`);
  process.exit(1);
}

if (!SECRET) {
  console.error("Set TSM_CRON_SECRET (or sign in and call the API with a session cookie).");
  process.exit(1);
}

const res = await fetch(`${BASE}${spec.path}`, {
  method: spec.method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SECRET}`,
  },
  body: JSON.stringify(spec.body),
});

const text = await res.text();
console.log(res.status, text);
process.exit(res.ok ? 0 : 1);
