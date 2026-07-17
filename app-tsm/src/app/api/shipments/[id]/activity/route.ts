import { getShipmentActivities } from "@/lib/data/shipment-repository";
import { getShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  return apiSuccess(getShipmentActivities(id));
}
