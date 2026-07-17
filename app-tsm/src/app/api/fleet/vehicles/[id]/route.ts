import { getVehicle } from "@/lib/data/fleet-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) return apiError("VEHICLE_NOT_FOUND", "Vehicle not found.", 404);
  return apiSuccess(vehicle);
}
