import {
  createPlace,
  listPlaces,
  validateCreatePlaceInput,
} from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  return apiSuccess(await listPlaces(q));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreatePlaceInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const place = await createPlace(parsed);
  return apiSuccess(place, { created: true });
}
