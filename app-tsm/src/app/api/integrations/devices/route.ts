import {
  createDevice,
  listDevices,
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
