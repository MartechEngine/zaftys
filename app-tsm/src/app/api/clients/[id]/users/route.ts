import {
  getClient,
  inviteClientUser,
  listClientUsers,
  resendClientPortalUserInvite,
  revokeClientPortalUser,
  validateInviteClientUserInput,
} from "@/lib/clients/client-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) return apiError("CLIENT_NOT_FOUND", "Client not found.", 404);
  return apiSuccess(await listClientUsers(id));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateInviteClientUserInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const user = await inviteClientUser(id, parsed);
  if (!user) return apiError("CLIENT_NOT_FOUND", "Client not found.", 404);
  return apiSuccess(user, { created: true, invitePath: user.invitePath });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { userId?: string; id?: string; revoke?: boolean; resend?: boolean };
  const userId = String(data.userId ?? data.id ?? "").trim();
  if (!userId) return apiError("VALIDATION_ERROR", "userId is required.");

  if (data.resend === true) {
    const user = await resendClientPortalUserInvite(id, userId);
    if (!user) {
      return apiError(
        "VALIDATION_ERROR",
        "Invite resend is only for pending portal users.",
        400,
      );
    }
    return apiSuccess(user, { invitePath: user.invitePath });
  }

  if (data.revoke !== true) {
    return apiError("VALIDATION_ERROR", "revoke: true or resend: true is required.");
  }

  const user = await revokeClientPortalUser(id, userId);
  if (!user) return apiError("USER_NOT_FOUND", "Portal user not found.", 404);
  return apiSuccess(user);
}
