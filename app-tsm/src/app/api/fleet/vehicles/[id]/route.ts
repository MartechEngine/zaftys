import { getDriver, getVehicle } from "@/lib/data/fleet-repository";
import {
  getActiveDataSource,
  listDrivers,
} from "@/lib/data/shipment-repository";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import {
  ensureFleetEntitiesHydrated,
  patchStoredDriver,
  patchStoredVehicle,
  persistFleetEntities,
} from "@/lib/mutations/fleet-entity-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await ensureFleetEntitiesHydrated();
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) return apiError("VEHICLE_NOT_FOUND", "Vehicle not found.", 404);
  return apiSuccess(vehicle);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await ensureFleetEntitiesHydrated();
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
    driver?: string;
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

  if (data.driverId !== undefined) {
    const raw = data.driverId;
    if (raw === null || raw === "") {
      patch.driver = undefined;
      const drivers = await listDrivers();
      for (const d of drivers) {
        if (d.vehicleId === id) {
          patchStoredDriver(d.id, { vehicle: undefined, vehicleId: undefined });
        }
      }
    } else {
      const driverId = String(raw).trim();
      const driver = await getDriver(driverId);
      if (!driver) return apiError("DRIVER_NOT_FOUND", "Driver not found.", 404);
      patch.driver = driver.name;
      patchStoredDriver(driverId, {
        vehicleId: id,
        vehicle: vehicle.registration,
      });
    }
  }

  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide at least one field.");
  }

  if (getActiveDataSource() === "fleetbase") {
    try {
      const fbPatch: Record<string, unknown> = {};
      if (patch.registration !== undefined) fbPatch.plate_number = patch.registration;
      if (patch.type !== undefined) fbPatch.type = patch.type;
      if (patch.capacityMt !== undefined) {
        fbPatch.meta = { capacity_mt: patch.capacityMt };
      }
      await getFleetbaseClient().updateVehicle(id, fbPatch);
    } catch (err) {
      console.warn("[vehicles] Fleetbase patch failed, applying local overlay:", err);
      patchStoredVehicle(id, patch);
      await persistFleetEntities();
    }
  } else {
    patchStoredVehicle(id, patch);
    await persistFleetEntities();
  }

  return apiSuccess(await getVehicle(id));
}
