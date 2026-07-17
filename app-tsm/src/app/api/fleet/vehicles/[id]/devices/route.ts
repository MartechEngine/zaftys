import { listDevices } from "@/lib/integrations/integrations-repository";
import { listVehicles } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const vehicle = (await listVehicles()).find((v) => v.id === id);
  if (!vehicle) return apiError("VEHICLE_NOT_FOUND", "Vehicle not found.", 404);

  const devices = await listDevices(vehicle.registration);
  return apiSuccess({ vehicle: { id: vehicle.id, registration: vehicle.registration }, devices });
}
