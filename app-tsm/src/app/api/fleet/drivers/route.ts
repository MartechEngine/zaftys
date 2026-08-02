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
  const emailRaw = String(data.email ?? "").trim();
  const email =
    emailRaw ||
    `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.|\.$/g, "")
      .slice(0, 40) || "driver"}@drivers.zaftys.local`;

  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().createDriver({
        name,
        phone,
        email,
        ...(license ? { drivers_license_number: license } : {}),
      });
      const driver = mapFleetbaseDriver(raw as Record<string, unknown>);
      return apiSuccess(driver, { created: true, source: "fleetbase" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Fleetbase driver create failed.";
      return apiError("CREATE_FAILED", `Fleetbase unavailable (createDriver): ${message}`, 502);
    }
  }

  const driver = createStoredDriver({ name, phone, license });
  await persistFleetEntities();
  return apiSuccess(driver, { created: true, source: "dev-store" });
}
