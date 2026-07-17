import {
  getPlace,
  syncPlaceGeofence,
  updatePlace,
  validateCreatePlaceInput,
} from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getPlace(id);
  if (!result) return apiError("PLACE_NOT_FOUND", "Place not found.", 404);
  return apiSuccess(result);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const existing = await getPlace(id);
  if (!existing) return apiError("PLACE_NOT_FOUND", "Place not found.", 404);

  if (data.syncGeofence === true) {
    const synced = await syncPlaceGeofence(id);
    if (!synced) return apiError("PLACE_NOT_FOUND", "Place not found.", 404);
    return apiSuccess(synced);
  }

  const merged = {
    name: data.name ?? existing.place.name,
    type: data.type ?? existing.place.type,
    city: data.city ?? existing.place.city,
    geofence: data.geofence ?? existing.place.geofence,
  };
  const parsed = validateCreatePlaceInput(merged);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const place = await updatePlace(id, parsed);
  if (!place) return apiError("PLACE_NOT_FOUND", "Place not found.", 404);
  return apiSuccess(place);
}
