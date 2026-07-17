import { listDrivers } from "@/lib/data/shipment-repository";
import { createStoredDriver } from "@/lib/mutations/fleet-entity-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listDrivers());
}

export async function POST(request: Request) {
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

  const driver = createStoredDriver({
    name,
    phone,
    license: String(data.license ?? "").trim() || undefined,
  });
  return apiSuccess(driver, { created: true });
}
