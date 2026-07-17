import { listVehicles } from "@/lib/data/shipment-repository";
import { createStoredVehicle } from "@/lib/mutations/fleet-entity-store";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listVehicles());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const registration = String(data.registration ?? "").trim();
  if (!registration) return apiError("VALIDATION_ERROR", "Registration is required.");

  const vehicle = createStoredVehicle({
    registration,
    type: String(data.type ?? "").trim() || undefined,
  });
  return apiSuccess(vehicle, { created: true });
}
