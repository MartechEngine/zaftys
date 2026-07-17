import { getShipment, updateShipmentStatus } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { parseStatusPatch, validateStatusTransition } from "@/lib/shipments/update-shipment";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);
  return apiSuccess(shipment);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const patch = parseStatusPatch(body);
  if (!patch) {
    return apiError("INVALID_BODY", "Expected { status: string }.", 400);
  }

  const existing = await getShipment(id);
  if (!existing) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const transitionErr = validateStatusTransition(existing.status, patch.status);
  if (transitionErr) {
    return apiError("INVALID_TRANSITION", transitionErr, 400);
  }

  try {
    const shipment = await updateShipmentStatus(id, patch.status);
    if (!shipment) return apiError("UPDATE_FAILED", "Could not update shipment.", 500);
    return apiSuccess(shipment);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed.";
    return apiError("UPDATE_FAILED", message, 400);
  }
}
