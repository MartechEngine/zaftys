import {
  inviteOrgUser,
  listOrgUsers,
  validateInviteOrgUserInput,
} from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  return apiSuccess(await listOrgUsers(q));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateInviteOrgUserInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const user = await inviteOrgUser(parsed);
  return apiSuccess(user, { created: true, invitePath: user.invitePath });
}
