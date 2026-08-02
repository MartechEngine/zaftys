import {
  addShipmentDocument,
  getShipment,
  updateShipmentFields,
} from "@/lib/data/shipment-repository";
import { buildLrPdf } from "@/lib/documents/lr-pdf";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgProfile } from "@/lib/settings/org-repository";
import { isS3Configured, putObject } from "@/lib/storage/s3";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * POST — generate LR PDF for shipment, store in MinIO when configured,
 * attach as shipment document, set lrNumber if missing.
 * Query: ?download=1 returns the PDF bytes instead of JSON.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const org = await getOrgProfile();
  const pdf = await buildLrPdf(shipment, {
    name: org.name,
    gstin: org.gstin,
    address: org.address,
  });

  if (!shipment.lrNumber || shipment.lrNumber !== pdf.lrNumber) {
    try {
      await updateShipmentFields(id, { lrNumber: pdf.lrNumber });
    } catch (e) {
      console.warn("[lr] could not persist lrNumber", e);
    }
  }

  const docId = `doc-lr-${Date.now()}`;
  const storageKey = `shipments/${id}/${docId}/${pdf.filename}`;
  let uploadedKey: string | undefined;

  if (isS3Configured()) {
    try {
      await putObject(storageKey, pdf.buffer, "application/pdf");
      uploadedKey = storageKey;
    } catch (err) {
      console.error("[lr] S3 upload failed", err);
      return apiError("UPLOAD_FAILED", "Could not store LR PDF.", 502);
    }
  }

  const updated = await addShipmentDocument(id, {
    id: docId,
    type: "lr",
    name: pdf.filename,
    storageKey: uploadedKey,
    contentType: "application/pdf",
    sizeBytes: pdf.buffer.length,
  });
  if (!updated) return apiError("UPDATE_FAILED", "Could not attach LR document.", 500);

  const url = new URL(request.url);
  if (url.searchParams.get("download") === "1") {
    return new Response(new Uint8Array(pdf.buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdf.filename}"`,
        "Content-Length": String(pdf.buffer.length),
        "X-TSM-LR-Number": pdf.lrNumber,
        "X-TSM-Doc-Id": docId,
      },
    });
  }

  return apiSuccess(
    {
      shipment: updated,
      lrNumber: pdf.lrNumber,
      documentId: docId,
      filename: pdf.filename,
      stored: Boolean(uploadedKey),
      downloadPath: uploadedKey
        ? `/api/documents/${docId}/download`
        : `/api/shipments/${id}/lr?download=1`,
    },
    { generated: true },
  );
}

/** GET — regenerate-on-read preview (does not attach) for print/open. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const org = await getOrgProfile();
  const pdf = await buildLrPdf(shipment, {
    name: org.name,
    gstin: org.gstin,
    address: org.address,
  });

  return new Response(new Uint8Array(pdf.buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${pdf.filename}"`,
      "Content-Length": String(pdf.buffer.length),
    },
  });
}
