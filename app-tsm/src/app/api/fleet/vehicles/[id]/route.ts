import { getVehicle } from "@/lib/data/fleet-repository";
import { patchStoredVehicle } from "@/lib/mutations/fleet-entity-store";
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

  const vehicle = await getVehicle(id);
  if (!vehicle) return apiError("VEHICLE_NOT_FOUND", "Vehicle not found.", 404);

  const data = body as Record<string, unknown>;
  const patch: {
    registration?: string;
    type?: string;
    capacityMt?: number;
  } = {};
  if (data.registration !== undefined) {
    patch.registration = String(data.registration).trim().toUpperCase();
  }
  if (data.type !== undefined) patch.type = String(data.type).trim();
  if (data.capacityMt !== undefined) {
    const capacityMt = Number(data.capacityMt);
    if (!Number.isFinite(capacityMt) || capacityMt <= 0) {
      return apiError("VALIDATION_ERROR", "Capacity must be a positive number.");
    }
    patch.capacityMt = capacityMt;
  }
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide at least one field.");
  }

  patchStoredVehicle(id, patch);
  return apiSuccess(await getVehicle(id));
}
