import {
  getShipment,
  updateShipmentStatus,
  updateShipmentFields,
} from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import {
  parseStatusPatch,
  parseFieldsPatch,
  validateStatusTransition,
} from "@/lib/shipments/update-shipment";

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

  const statusPatch = parseStatusPatch(body);
  if (statusPatch) {
    const existing = await getShipment(id);
    if (!existing) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

    const transitionErr = validateStatusTransition(existing.status, statusPatch.status);
    if (transitionErr) {
      return apiError("INVALID_TRANSITION", transitionErr, 400);
    }

    try {
      const shipment = await updateShipmentStatus(id, statusPatch.status);
      if (!shipment) return apiError("UPDATE_FAILED", "Could not update shipment.", 500);
      return apiSuccess(shipment);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Update failed.";
      return apiError("UPDATE_FAILED", message, 400);
    }
  }

  const fieldsPatch = parseFieldsPatch(body);
  if (!fieldsPatch) {
    return apiError("INVALID_BODY", "Expected { status } or trip field updates.", 400);
  }
  if ("error" in fieldsPatch) {
    return apiError("VALIDATION_ERROR", fieldsPatch.error, 400);
  }

  try {
    const shipment = await updateShipmentFields(id, fieldsPatch);
    if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);
    return apiSuccess(shipment);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed.";
    return apiError("UPDATE_FAILED", message, 400);
  }
}
