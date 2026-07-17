import { cancelShipment, getShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { validateStatusTransition } from "@/lib/shipments/update-shipment";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await getShipment(id);
  if (!existing) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const transitionErr = validateStatusTransition(existing.status, "cancelled");
  if (transitionErr) {
    return apiError("CANCEL_FAILED", transitionErr, 400);
  }

  try {
    const shipment = await cancelShipment(id);
    if (!shipment) return apiError("CANCEL_FAILED", "Could not cancel shipment.", 500);
    return apiSuccess(shipment);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Cancel failed.";
    return apiError("CANCEL_FAILED", message, 400);
  }
}
