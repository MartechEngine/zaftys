import {
  createEquipment,
  listEquipment,
  updateEquipment,
  validateCreateEquipmentInput,
  type EquipmentStatus,
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

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const patch: { location?: string; status?: EquipmentStatus } = {};
  if (typeof data.location === "string" && data.location.trim()) {
    patch.location = data.location.trim();
  }
  if (typeof data.status === "string") {
    const status = data.status as EquipmentStatus;
    if (["active", "stored", "maintenance"].includes(status)) patch.status = status;
  }
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide location or status.");
  }

  const equipment = await updateEquipment(id, patch);
  if (!equipment) return apiError("EQUIPMENT_NOT_FOUND", "Equipment not found.", 404);
  return apiSuccess(equipment);
}
