import { getDriver } from "@/lib/data/fleet-repository";
import { listVehicles } from "@/lib/data/shipment-repository";
import {
  patchStoredDriver,
} from "@/lib/mutations/fleet-entity-store";
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const driver = await getDriver(id);
  if (!driver) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);

  const data = body as Record<string, unknown>;
  const patch: {
    name?: string;
    phone?: string;
    license?: string;
    vehicle?: string;
    vehicleId?: string;
  } = {};
  if (data.name !== undefined) patch.name = String(data.name).trim();
  if (data.phone !== undefined) patch.phone = String(data.phone).trim();
  if (data.license !== undefined) patch.license = String(data.license).trim();

  if (data.vehicleId !== undefined) {
    const raw = data.vehicleId;
    if (raw === null || raw === "") {
      patch.vehicle = undefined;
      patch.vehicleId = undefined;
    } else {
      const vehicleId = String(raw).trim();
      const vehicles = await listVehicles();
      const vehicle = vehicles.find((v) => v.id === vehicleId);
      if (!vehicle) return apiError("VEHICLE_NOT_FOUND", "Vehicle not found.", 404);
      patch.vehicleId = vehicleId;
      patch.vehicle = vehicle.registration;
    }
  }

  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide at least one field.");
  }

  patchStoredDriver(id, patch);
  return apiSuccess(await getDriver(id));
}
