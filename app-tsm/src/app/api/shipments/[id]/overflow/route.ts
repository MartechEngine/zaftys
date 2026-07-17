import { postShipmentToOverflow } from "@/lib/data/overflow-repository";
import { getShipment } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const result = await postShipmentToOverflow(id);
  if ("error" in result && result.error) {
    return apiError("OVERFLOW_FAILED", result.error, 400);
  }

  return apiSuccess({ load: result.load, cancelled: true });
}
