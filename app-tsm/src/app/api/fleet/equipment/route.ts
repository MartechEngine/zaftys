import {
  createEquipment,
  listEquipment,
  validateCreateEquipmentInput,
} from "@/lib/fleet/equipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listEquipment());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateEquipmentInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const equipment = await createEquipment(parsed);
  return apiSuccess(equipment, { created: true });
}
