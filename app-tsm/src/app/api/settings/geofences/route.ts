import {
  createGeofence,
  deleteGeofence,
  listGeofences,
  updateGeofence,
  validateCreateGeofenceInput,
} from "@/lib/settings/geofences-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listGeofences());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateGeofenceInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);
  return apiSuccess(await createGeofence(parsed), { created: true });
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

  const patch: { name?: string; radius?: string; triggers?: string } = {};
  if (typeof data.name === "string" && data.name.trim()) patch.name = data.name.trim();
  if (typeof data.radius === "string" && data.radius.trim()) patch.radius = data.radius.trim();
  if (typeof data.triggers === "string" && data.triggers.trim()) {
    patch.triggers = data.triggers.trim();
  }
  if (Object.keys(patch).length === 0) {
    return apiError("VALIDATION_ERROR", "Provide name, radius, or triggers.");
  }

  const geofence = await updateGeofence(id, patch);
  if (!geofence) return apiError("GEOFENCE_NOT_FOUND", "Geofence not found.", 404);
  return apiSuccess(geofence);
}

export async function DELETE(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const id = String((body as { id?: string }).id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const deleted = await deleteGeofence(id);
  if (!deleted) return apiError("GEOFENCE_NOT_FOUND", "Geofence not found.", 404);
  return apiSuccess({ id, deleted: true });
}
