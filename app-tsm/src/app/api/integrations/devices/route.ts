import {
  createDevice,
  listDevices,
  updateDevice,
  validateCreateDeviceInput,
} from "@/lib/integrations/integrations-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vehicle = searchParams.get("vehicle") ?? undefined;
  return apiSuccess(await listDevices(vehicle));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateDeviceInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createDevice(parsed), { created: true });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; vehicle?: string; vehicleId?: string };
  const id = String(data.id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const patch: { vehicle?: string; vehicleId?: string } = {};
  if (data.vehicle != null) patch.vehicle = String(data.vehicle).trim() || "Unassigned";
  if (data.vehicleId != null) patch.vehicleId = String(data.vehicleId).trim();
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide vehicle or vehicleId.");
  }

  const device = await updateDevice(id, patch);
  if (!device) return apiError("DEVICE_NOT_FOUND", "Device not found.", 404);
  return apiSuccess(device);
}
