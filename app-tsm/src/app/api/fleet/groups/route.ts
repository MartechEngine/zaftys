import {
  createFleetGroup,
  listFleetGroups,
  validateCreateFleetGroupInput,
} from "@/lib/fleet/places-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listFleetGroups());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateFleetGroupInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createFleetGroup(parsed), { created: true });
}
