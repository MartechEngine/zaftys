import { addShipmentDocument, getShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { isS3Configured, putObject } from "@/lib/storage/s3";

export const dynamic = "force-dynamic";

const DOC_TYPES = new Set(["lr", "epod", "invoice", "other"]);

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 180) || "file";
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await getShipment(id);
  if (!existing) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return apiError("INVALID_FORM", "Could not parse multipart form data.", 400);
    }

    const type = String(form.get("type") ?? "").toLowerCase();
    const file = form.get("file");

    if (!DOC_TYPES.has(type)) {
      return apiError("VALIDATION_ERROR", "type must be lr, epod, invoice, or other.", 400);
    }
    if (!(file instanceof File)) {
      return apiError("VALIDATION_ERROR", "file is required for multipart upload.", 400);
    }

    const name = file.name?.trim() || "upload.bin";
    const docId = `doc-${Date.now()}`;
    const storageKey = `shipments/${id}/${docId}/${sanitizeFilename(name)}`;
    let uploadedKey: string | undefined;
    const fileContentType = file.type || undefined;
    const sizeBytes = file.size;

    if (isS3Configured()) {
      try {
        const bytes = Buffer.from(await file.arrayBuffer());
        await putObject(storageKey, bytes, fileContentType || "application/octet-stream");
        uploadedKey = storageKey;
      } catch (err) {
        console.error("[documents] S3 upload failed", err);
        return apiError("UPLOAD_FAILED", "Could not upload file to storage.", 502);
      }
    }

    const shipment = await addShipmentDocument(id, {
      id: docId,
      type: type as "lr" | "epod" | "invoice" | "other",
      name,
      storageKey: uploadedKey,
      contentType: fileContentType,
      sizeBytes,
    });
    if (!shipment) return apiError("UPDATE_FAILED", "Could not add document.", 500);

    return apiSuccess(shipment);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const b = body as { type?: string; name?: string };
  const type = String(b.type ?? "").toLowerCase();
  const name = String(b.name ?? "").trim();

  if (!DOC_TYPES.has(type)) {
    return apiError("VALIDATION_ERROR", "type must be lr, epod, invoice, or other.", 400);
  }
  if (!name) {
    return apiError("VALIDATION_ERROR", "name is required.", 400);
  }

  const shipment = await addShipmentDocument(id, {
    type: type as "lr" | "epod" | "invoice" | "other",
    name,
  });
  if (!shipment) return apiError("UPDATE_FAILED", "Could not add document.", 500);

  return apiSuccess(shipment);
}
