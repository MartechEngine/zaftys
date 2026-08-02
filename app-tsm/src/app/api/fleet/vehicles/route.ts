import { getActiveDataSource, listVehicles } from "@/lib/data/shipment-repository";
import { getExecutionStore, isLiveExecutionMode } from "@/lib/execution";
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

  if (isLiveExecutionMode()) {
    try {
      const vehicle = await getExecutionStore().createVehicle({
        plate_number: registration,
        ...(type ? { type } : {}),
      });
      return apiSuccess(vehicle, {
        created: true,
        source: getActiveDataSource(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Vehicle create failed.";
      return apiError("CREATE_FAILED", message, 502);
    }
  }

  const vehicle = createStoredVehicle({ registration, type });
  await persistFleetEntities();
  return apiSuccess(vehicle, { created: true, source: "dev-store" });
}
