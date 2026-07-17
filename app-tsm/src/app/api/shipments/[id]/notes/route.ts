import { getShipment, listShipmentNotes, addShipmentNote } from "@/lib/data/shipment-repository";
import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  return apiSuccess(listShipmentNotes(id));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const text = String((body as { body?: string }).body ?? "").trim();
  if (!text) {
    return apiError("VALIDATION_ERROR", "body is required.", 400);
  }

  const note = addShipmentNote(id, session.name ?? session.email, text);
  if (!note) return apiError("UPDATE_FAILED", "Could not add note.", 500);

  return apiSuccess(note);
}
