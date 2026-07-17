import { addShipmentDocument, getShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

const DOC_TYPES = new Set(["lr", "epod", "invoice", "other"]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await getShipment(id);
  if (!existing) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

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

  const shipment = addShipmentDocument(id, {
    type: type as "lr" | "epod" | "invoice" | "other",
    name,
  });
  if (!shipment) return apiError("UPDATE_FAILED", "Could not add document.", 500);

  return apiSuccess(shipment);
}
