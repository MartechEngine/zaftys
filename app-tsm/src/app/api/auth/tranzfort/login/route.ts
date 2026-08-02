import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";
import { getDefaultRoute } from "@/lib/auth/users";
import { isPathAllowedForRole } from "@/lib/navigation";
import { apiError } from "@/lib/api-response";
import { loginTranZfortSupplier } from "@/lib/tsm/tranzfort-auth";

/**
 * L1 — Sign in with TranZfort email/password.
 * Mock (default bridge): pilot supplier only.
 * Live: Supabase Auth password grant + profile gates (needs anon key).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON.");
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const next = typeof body.next === "string" ? body.next : "";

  if (!email || !password) {
    return apiError("VALIDATION_ERROR", "Email and password are required.");
  }

  const result = await loginTranZfortSupplier(email, password);
  if (!result.ok) {
    return apiError(result.code, result.message, result.status);
  }

  let redirectTo = getDefaultRoute(result.user.role);
  if (next.startsWith("/") && isPathAllowedForRole(next, result.user.role)) {
    redirectTo = next;
  }

  const token = createSessionToken(result.user);
  const response = NextResponse.json({
    data: {
      user: result.user,
      redirectTo,
      mode: result.mode,
      publishAllowed: result.publishAllowed,
      message: result.message,
      linkedSupplierId: result.identity.supplierId,
    },
    meta: { timestamp: new Date().toISOString() },
  });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
