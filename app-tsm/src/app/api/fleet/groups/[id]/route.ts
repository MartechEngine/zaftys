import { getFleetGroup } from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getFleetGroup(id);
  if (!result) return apiError("GROUP_NOT_FOUND", "Fleet group not found.", 404);
  return apiSuccess(result);
}
