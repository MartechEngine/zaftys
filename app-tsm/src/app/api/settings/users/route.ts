import { getSession } from "@/lib/auth/session";
import {
  inviteOrgUser,
  listOrgUsers,
  seatUsageForOrg,
  validateInviteOrgUserInput,
} from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canManageSeats } from "@/lib/auth/seats";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { tenancyApiError } from "@/lib/tsm/tenancy-http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  let org;
  try {
    org = await getOrgAccountForSession(session);
  } catch (e) {
    const err = tenancyApiError(e);
    if (err) return err;
    throw e;
  }
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const users = await listOrgUsers(q, org.id);
  const seats = seatUsageForOrg(org.id);
  return apiSuccess({ users, seats, orgId: org.id });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canManageSeats(session.role)) {
    return apiError("FORBIDDEN", "Only company admins can invite team seats.", 403);
  }

  let org;
  try {
    org = await getOrgAccountForSession(session);
  } catch (e) {
    const err = tenancyApiError(e);
    if (err) return err;
    throw e;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateInviteOrgUserInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  try {
    const user = await inviteOrgUser({
      ...parsed,
      tsmOrgId: org.id,
      supplierId: org.tranzfortSupplierId,
    });
    return apiSuccess(user, { created: true, invitePath: user.invitePath });
  } catch (e) {
    return apiError(
      "INVITE_FAILED",
      e instanceof Error ? e.message : "Could not invite user.",
      400,
    );
  }
}
