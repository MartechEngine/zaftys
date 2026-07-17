import {
  getActiveDataSource,
  listDrivers,
} from "@/lib/data/shipment-repository";
import { getDriver } from "@/lib/data/fleet-repository";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { mapFleetbaseDriver } from "@/lib/fleetbase/mapper";
import {
  createStoredDriver,
  persistFleetEntities,
  ensureFleetEntitiesHydrated,
} from "@/lib/mutations/fleet-entity-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureFleetEntitiesHydrated();
  return apiSuccess(await listDrivers());
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
  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  if (!name) return apiError("VALIDATION_ERROR", "Name is required.");
  if (!phone) return apiError("VALIDATION_ERROR", "Phone is required.");
  const license = String(data.license ?? "").trim() || undefined;

  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().createDriver({
        name,
        phone,
        ...(license ? { drivers_license_number: license } : {}),
      });
      const driver = mapFleetbaseDriver(raw as Record<string, unknown>);
      return apiSuccess(driver, { created: true, source: "fleetbase" });
    } catch (err) {
      console.warn("[drivers] Fleetbase create failed, using local store:", err);
    }
  }

  const driver = createStoredDriver({ name, phone, license });
  await persistFleetEntities();
  return apiSuccess(driver, { created: true, source: "dev-store" });
}
