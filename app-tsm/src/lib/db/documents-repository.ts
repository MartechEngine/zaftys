import { desc, eq } from "drizzle-orm";
import type { ShipmentDocument } from "@/lib/dev-store";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { shipmentDocuments } from "@/lib/db/schema";

export type ShipmentDocumentRow = ShipmentDocument & {
  shipmentId: string;
};

export async function listDocumentsFromDb(
  shipmentId: string,
): Promise<ShipmentDocument[] | null> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return null;

  const rows = await db
    .select()
    .from(shipmentDocuments)
    .where(eq(shipmentDocuments.shipmentId, shipmentId))
    .orderBy(desc(shipmentDocuments.uploadedAt));

  return rows.map((r) => ({
    id: r.id,
    type: r.type as ShipmentDocument["type"],
    name: r.name,
    uploadedAt: r.uploadedAt,
    storageKey: r.storageKey ?? undefined,
    contentType: r.contentType ?? undefined,
    sizeBytes: r.sizeBytes != null ? Number(r.sizeBytes) : undefined,
  }));
}

export async function insertDocumentToDb(
  shipmentId: string,
  doc: ShipmentDocument,
): Promise<boolean> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return false;

  await db.insert(shipmentDocuments).values({
    id: doc.id,
    shipmentId,
    type: doc.type,
    name: doc.name,
    storageKey: doc.storageKey ?? null,
    contentType: doc.contentType ?? null,
    sizeBytes: doc.sizeBytes != null ? String(doc.sizeBytes) : null,
    uploadedAt: doc.uploadedAt,
    payload: doc,
  });
  return true;
}
