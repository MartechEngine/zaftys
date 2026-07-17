import { getPlace } from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getPlace(id);
  if (!result) return apiError("PLACE_NOT_FOUND", "Place not found.", 404);
  return apiSuccess(result);
}
