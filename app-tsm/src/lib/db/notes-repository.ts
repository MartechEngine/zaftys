import { desc, eq } from "drizzle-orm";
import type { ShipmentNote } from "@/lib/dev-store";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { shipmentNotes } from "@/lib/db/schema";

export async function listNotesFromDb(
  shipmentId: string,
  limit = 50,
): Promise<ShipmentNote[] | null> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return null;

  const rows = await db
    .select()
    .from(shipmentNotes)
    .where(eq(shipmentNotes.shipmentId, shipmentId))
    .orderBy(desc(shipmentNotes.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    shipmentId: r.shipmentId,
    author: r.author,
    body: r.body,
    createdAt: r.createdAt,
  }));
}

export async function insertNoteToDb(note: ShipmentNote): Promise<boolean> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return false;

  await db.insert(shipmentNotes).values({
    id: note.id,
    shipmentId: note.shipmentId,
    author: note.author,
    body: note.body,
    createdAt: note.createdAt,
  });
  return true;
}
