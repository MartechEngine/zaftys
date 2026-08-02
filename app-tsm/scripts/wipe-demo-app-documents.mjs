#!/usr/bin/env node
/**
 * Wipe legacy demo seed IDs from app_documents (Phase 3 live-first cleanup).
 * Safe for local/dev: only deletes known demo id patterns from demo-data.ts.
 *
 * Usage: node scripts/wipe-demo-app-documents.mjs
 *        npm run db:wipe-demo
 */
import postgres from "postgres";

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1 });

/** Exact demo IDs from src/lib/demo-data.ts (and common patch keys). */
const DEMO_IDS = [
  "vnd1",
  "wo1",
  "wo2",
  "wo3",
  "ms1",
  "sr1",
  "inv1",
  "u1",
  "u2",
  "u3",
  "u4",
  "r1",
  "r2",
  "r3",
  "r4",
  "gf1",
  "ot1",
  "gr1",
  "pl1",
  "fg1",
  "c1",
  "pt4",
  "fr1",
  "fr2",
  "fr3",
  "ms2",
  "ms3",
  "ms4",
  "vnd2",
  "tz1",
  "tz2",
  "tz3",
];

try {
  const deleted = await sql`
    delete from app_documents
    where id = any(${DEMO_IDS})
    returning collection, id
  `;
  console.log(`Removed ${deleted.length} legacy demo document(s):`);
  for (const row of deleted) {
    console.log(`  ${row.collection}/${row.id}`);
  }
  if (deleted.length === 0) {
    console.log("  (none matched — already clean or different IDs)");
  }
} finally {
  await sql.end({ timeout: 5 });
}
