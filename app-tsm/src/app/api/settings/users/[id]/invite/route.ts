import { getOrgUser, resendOrgUserInvite } from "@/lib/settings/users-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getOrgUser(id);
  if (!user) return apiError("USER_NOT_FOUND", "User not found.", 404);
  if (user.status !== "pending") {
    return apiError("VALIDATION_ERROR", "Invite resend is only for pending users.", 400);
  }

  const result = await resendOrgUserInvite(id);
  return apiSuccess({ ...user, ...result });
}
