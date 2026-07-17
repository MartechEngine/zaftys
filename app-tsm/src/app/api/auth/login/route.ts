import { NextResponse } from "next/server";
import { verifyDevCredentials, getDefaultRoute } from "@/lib/auth/users";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";
import { isPathAllowedForRole } from "@/lib/navigation";
import { apiError } from "@/lib/api-response";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const next = typeof body.next === "string" ? body.next : "";

  if (!email || !password) {
    return apiError("VALIDATION_ERROR", "Email and password are required.");
  }

  const user = await verifyDevCredentials(email, password);
  if (!user) {
    return apiError("INVALID_CREDENTIALS", "Email or password is incorrect.", 401);
  }

  let redirectTo = getDefaultRoute(user.role);
  if (next.startsWith("/") && isPathAllowedForRole(next, user.role)) {
    redirectTo = next;
  }

  const token = createSessionToken(user);
  const response = NextResponse.json({
    data: { user, redirectTo },
    meta: { timestamp: new Date().toISOString() },
  });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
