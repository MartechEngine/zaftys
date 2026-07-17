import { findDocumentById } from "@/lib/db/documents-repository";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { apiError } from "@/lib/api-response";
import { getObject, isS3Configured } from "@/lib/storage/s3";

export const dynamic = "force-dynamic";

async function resolveDocument(id: string) {
  const fromDb = await findDocumentById(id);
  if (fromDb) return fromDb;

  const shipments = await fetchAllShipmentsRaw();
  for (const shipment of shipments) {
    const doc = shipment.documents.find((d) => d.id === id);
    if (doc) {
      return { ...doc, shipmentId: shipment.id };
    }
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = await resolveDocument(id);
  if (!doc) return apiError("DOCUMENT_NOT_FOUND", "Document not found.", 404);

  if (doc.storageKey && isS3Configured()) {
    try {
      const object = await getObject(doc.storageKey);
      const contentType =
        doc.contentType || object.contentType || "application/octet-stream";
      return new Response(Buffer.from(object.body), {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${doc.name.replace(/"/g, "")}"`,
          ...(object.contentLength != null
            ? { "Content-Length": String(object.contentLength) }
            : {}),
        },
      });
    } catch (err) {
      console.error("[documents/download] S3 get failed", err);
      return apiError("DOWNLOAD_FAILED", "Could not download file from storage.", 502);
    }
  }

  if (!doc.storageKey) {
    return apiError(
      "NO_FILE",
      "Document metadata only — no file was uploaded to storage.",
      404,
    );
  }

  return apiError(
    "STORAGE_UNAVAILABLE",
    "File storage is not configured; cannot download this document.",
    503,
  );
}
