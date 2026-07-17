#!/usr/bin/env node
/** Reset persisted demo password hashes so login works with password `dev`. */
import postgres from "postgres";

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1 });

try {
  const deleted = await sql`
    delete from app_documents
    where collection = 'user_passwords'
    returning id
  `;
  console.log(`Cleared ${deleted.length} password hash(es).`);

  // Restore security min length to 12 if smoke left it at 14
  await sql`
    delete from app_documents
    where collection = 'config_patches' and id = 'security'
  `;
  console.log("Cleared security config patch (if any).");
} finally {
  await sql.end({ timeout: 5 });
}
