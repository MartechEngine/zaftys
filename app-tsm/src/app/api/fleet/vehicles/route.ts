import { getActiveDataSource, listVehicles } from "@/lib/data/shipment-repository";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { mapFleetbaseVehicle } from "@/lib/fleetbase/mapper";
import {
  createStoredVehicle,
  ensureFleetEntitiesHydrated,
  persistFleetEntities,
} from "@/lib/mutations/fleet-entity-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureFleetEntitiesHydrated();
  return apiSuccess(await listVehicles());
}

export async function POST(request: Request) {
  await ensureFleetEntitiesHydrated();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const registration = String(data.registration ?? "").trim();
  if (!registration) return apiError("VALIDATION_ERROR", "Registration is required.");
  const type = String(data.type ?? "").trim() || undefined;

  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().createVehicle({
        plate_number: registration,
        ...(type ? { type } : {}),
      });
      const vehicle = mapFleetbaseVehicle(raw as Record<string, unknown>);
      return apiSuccess(vehicle, { created: true, source: "fleetbase" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Fleetbase vehicle create failed.";
      return apiError("CREATE_FAILED", `Fleetbase unavailable (createVehicle): ${message}`, 502);
    }
  }

  const vehicle = createStoredVehicle({ registration, type });
  await persistFleetEntities();
  return apiSuccess(vehicle, { created: true, source: "dev-store" });
}
