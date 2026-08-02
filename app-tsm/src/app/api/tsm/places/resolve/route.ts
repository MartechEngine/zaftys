import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { resolvePlace } from "@/lib/tsm/places-server";

/** Resolve a place suggestion to exact coordinates / labels. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const place = resolvePlace({
    city: body.city != null ? String(body.city) : undefined,
    label: body.label != null ? String(body.label) : undefined,
    state: body.state != null ? String(body.state) : undefined,
    lat: body.lat != null ? Number(body.lat) : undefined,
    lng: body.lng != null ? Number(body.lng) : undefined,
  });

  if (!place) {
    return apiError("PLACE_UNRESOLVED", "Could not resolve place coordinates.", 422);
  }

  return apiSuccess({ place });
}
