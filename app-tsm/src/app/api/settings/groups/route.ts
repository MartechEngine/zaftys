import {
  createSettingsGroup,
  listSettingsGroups,
  validateCreateSettingsGroupInput,
} from "@/lib/settings/groups-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listSettingsGroups());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateSettingsGroupInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createSettingsGroup(parsed), { created: true });
}
