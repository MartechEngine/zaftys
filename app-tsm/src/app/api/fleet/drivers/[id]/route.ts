import { getDriver } from "@/lib/data/fleet-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const driver = await getDriver(id);
  if (!driver) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);
  return apiSuccess(driver);
}
