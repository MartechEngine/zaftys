import { generateTrackLink } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const link = generateTrackLink(id);
  if (!link) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);
  return apiSuccess(link);
}
