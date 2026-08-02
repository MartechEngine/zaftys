import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { estimateRoutePreview } from "@/lib/tsm/places-search";
import { isValidGps } from "@/lib/geo";

/** Route preview between two resolved places. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const origin = body.origin as Record<string, unknown> | undefined;
  const destination = body.destination as Record<string, unknown> | undefined;
  const oLat = Number(origin?.lat);
  const oLng = Number(origin?.lng);
  const dLat = Number(destination?.lat);
  const dLng = Number(destination?.lng);

  if (!isValidGps(oLat, oLng) || !isValidGps(dLat, dLng)) {
    return apiError("ROUTE_INVALID", "Origin and destination coordinates are required.", 422);
  }

  const preview = estimateRoutePreview(
    { lat: oLat, lng: oLng },
    { lat: dLat, lng: dLng },
  );

  return apiSuccess({ preview });
}
