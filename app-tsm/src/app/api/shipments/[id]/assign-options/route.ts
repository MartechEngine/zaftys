import { getAssignOptions } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const options = await getAssignOptions(id);
  if (!options) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);
  return apiSuccess(options);
}
