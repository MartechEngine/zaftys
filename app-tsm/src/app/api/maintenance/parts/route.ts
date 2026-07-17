import {
  adjustPartsStock,
  listPartsInventory,
} from "@/lib/maintenance/work-order-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listPartsInventory());
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; delta?: number };
  const id = String(data.id ?? "").trim();
  const delta = Number(data.delta);

  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (!Number.isFinite(delta) || delta === 0) {
    return apiError("VALIDATION_ERROR", "delta must be a non-zero number.");
  }

  const part = await adjustPartsStock(id, delta);
  if (!part) return apiError("PART_NOT_FOUND", "Part not found.", 404);
  return apiSuccess(part);
}
