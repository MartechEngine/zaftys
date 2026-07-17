import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

type Db = ReturnType<typeof drizzle<typeof schema>>;

const g = globalThis as typeof globalThis & {
  __tsmPg?: ReturnType<typeof postgres>;
  __tsmDb?: Db;
};

export function getDb(): Db | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  if (!g.__tsmPg) {
    g.__tsmPg = postgres(url, { max: 10, prepare: false });
  }
  if (!g.__tsmDb) {
    g.__tsmDb = drizzle(g.__tsmPg, { schema });
  }
  return g.__tsmDb;
}

export async function checkDatabaseHealth(): Promise<"up" | "down" | "unset"> {
  if (!isDatabaseConfigured()) return "unset";
  const db = getDb();
  if (!db) return "unset";
  try {
    await db.execute(sql`select 1`);
    return "up";
  } catch {
    return "down";
  }
}
