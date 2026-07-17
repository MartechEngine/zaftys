import {
  getOrgProfile,
  updateOrgProfile,
  validateUpdateOrgInput,
} from "@/lib/settings/org-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getOrgProfile());
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateUpdateOrgInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const org = await updateOrgProfile(parsed);
  return apiSuccess(org);
}
