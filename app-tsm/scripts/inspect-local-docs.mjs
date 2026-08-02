/**
 * Inspect local TSM app_documents volume per collection.
 * Usage: node scripts/inspect-local-docs.mjs
 */
import postgres from "postgres";

const url = process.env.DATABASE_URL ?? "postgresql://tsm:tsm@localhost:5432/zaftys_tsm";
const sql = postgres(url, { max: 1, connect_timeout: 5 });

try {
  const rows = await sql`
    select collection, count(*)::int as n
    from app_documents
    group by collection
    order by n desc
  `;
  let total = 0;
  for (const r of rows) {
    total += r.n;
    console.log(String(r.collection).padEnd(36), r.n);
  }
  console.log("-".repeat(44));
  console.log("TOTAL".padEnd(36), total);

  const sample = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  for (const collection of sample) {
    const docs = await sql`
      select id, payload
      from app_documents
      where collection = ${collection}
      limit 5
    `;
    console.log(`\n== ${collection}`);
    for (const d of docs) {
      const p = d.payload ?? {};
      const label =
        p.name ?? p.legalName ?? p.tradeName ?? p.plate ?? p.number ?? p.title ?? "";
      console.log(`   ${d.id}  ${label}`);
    }
  }
} catch (e) {
  console.log("ERR", e instanceof Error ? e.message : e);
} finally {
  await sql.end({ timeout: 2 });
}
