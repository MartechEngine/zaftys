import { assignShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const { driverId, vehicleId } = body as { driverId?: string; vehicleId?: string };

  if (!driverId || !vehicleId) {
    return apiError("VALIDATION_ERROR", "driverId and vehicleId are required.");
  }

  const shipment = await assignShipment(id, driverId, vehicleId);
  if (!shipment) return apiError("ASSIGN_FAILED", "Could not assign shipment.", 404);

  return apiSuccess(shipment);
}
