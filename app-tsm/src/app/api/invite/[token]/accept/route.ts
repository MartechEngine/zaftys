import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";
import { getDefaultRoute } from "@/lib/auth/users";
import { apiError } from "@/lib/api-response";
import { acceptOrgUserInvite } from "@/lib/settings/users-repository";

/**
 * Accept team-seat invite: set password → mint tsm_session (authSource=seat).
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const password = typeof body.password === "string" ? body.password : "";
  const name = typeof body.name === "string" ? body.name : undefined;

  try {
    const { user } = await acceptOrgUserInvite({ token, password, name });
    const redirectTo = getDefaultRoute(user.role);
    const sessionToken = createSessionToken(user);
    const response = NextResponse.json({
      data: { user, redirectTo },
      meta: { timestamp: new Date().toISOString() },
    });
    response.cookies.set(sessionCookieOptions(sessionToken));
    return response;
  } catch (e) {
    return apiError(
      "INVITE_ACCEPT_FAILED",
      e instanceof Error ? e.message : "Could not accept invite.",
      400,
    );
  }
}
