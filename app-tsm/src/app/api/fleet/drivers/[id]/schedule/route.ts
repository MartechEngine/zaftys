import { getDriverSchedule } from "@/lib/dispatch/calendar";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getDriverSchedule(id);
  if (!result) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);
  return apiSuccess(result);
}
