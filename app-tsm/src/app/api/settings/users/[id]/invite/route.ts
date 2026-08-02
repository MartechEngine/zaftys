import { getSession } from "@/lib/auth/session";
import { getOrgUser, resendOrgUserInvite } from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canManageSeats } from "@/lib/auth/seats";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canManageSeats(session.role)) {
    return apiError("FORBIDDEN", "Only company admins can resend invites.", 403);
  }

  const org = await getOrgAccountForSession(session);
  const { id } = await params;
  const user = await getOrgUser(id);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);
  if (user.tsmOrgId && user.tsmOrgId !== org.id) {
    return apiError("FORBIDDEN", "Seat belongs to another company.", 403);
  }
  if (user.status !== "pending") {
    return apiError("VALIDATION_ERROR", "Invite resend is only for pending users.", 400);
  }

  const result = await resendOrgUserInvite(id, org.id);
  if (!result) return apiError("VALIDATION_ERROR", "Invite resend is only for pending users.", 400);
  return apiSuccess({ ...user, ...result }, { invitePath: result.invitePath });
}
