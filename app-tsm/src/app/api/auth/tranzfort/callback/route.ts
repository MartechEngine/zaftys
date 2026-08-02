import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";
import { getDefaultRoute } from "@/lib/auth/users";
import { isPathAllowedForRole } from "@/lib/navigation";
import { loginTranZfortSupplierFromAccessToken } from "@/lib/tsm/tranzfort-auth";
import {
  exchangePkceCode,
  OAUTH_NEXT_COOKIE,
  OAUTH_VERIFIER_COOKIE,
  oauthCookieOptions,
} from "@/lib/tsm/tranzfort-oauth";

function loginErrorRedirect(request: NextRequest, message: string) {
  const login = new URL("/login", request.url);
  login.searchParams.set("error", message);
  const response = NextResponse.redirect(login);
  response.cookies.set(OAUTH_VERIFIER_COOKIE, "", { ...oauthCookieOptions(0), maxAge: 0 });
  response.cookies.set(OAUTH_NEXT_COOKIE, "", { ...oauthCookieOptions(0), maxAge: 0 });
  return response;
}

/**
 * Google OAuth callback — exchange PKCE code, gate supplier, mint tsm_session.
 * Never stores TranZfort access tokens in the browser.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const oauthError =
    url.searchParams.get("error_description") || url.searchParams.get("error");

  if (oauthError) {
    return loginErrorRedirect(request, `Google sign-in cancelled or failed: ${oauthError}`);
  }
  if (!code) {
    return loginErrorRedirect(request, "Google sign-in did not return an auth code.");
  }

  const verifier = request.cookies.get(OAUTH_VERIFIER_COOKIE)?.value;
  const nextRaw = request.cookies.get(OAUTH_NEXT_COOKIE)?.value ?? "";

  if (!verifier) {
    return loginErrorRedirect(
      request,
      "Google sign-in session expired. Try Continue with Google again.",
    );
  }

  let accessToken: string;
  let userId: string;
  let email: string;
  try {
    const exchanged = await exchangePkceCode(code, verifier);
    accessToken = exchanged.accessToken;
    userId = exchanged.userId;
    email = exchanged.email;
  } catch (error) {
    return loginErrorRedirect(
      request,
      error instanceof Error
        ? `Could not complete Google sign-in: ${error.message}`
        : "Could not complete Google sign-in.",
    );
  }

  const result = await loginTranZfortSupplierFromAccessToken(accessToken, userId, email);
  if (!result.ok) {
    return loginErrorRedirect(request, result.message);
  }

  let redirectTo = getDefaultRoute(result.user.role);
  if (nextRaw.startsWith("/") && isPathAllowedForRole(nextRaw, result.user.role)) {
    redirectTo = nextRaw;
  }

  const token = createSessionToken(result.user);
  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set(sessionCookieOptions(token));
  response.cookies.set(OAUTH_VERIFIER_COOKIE, "", { ...oauthCookieOptions(0), maxAge: 0 });
  response.cookies.set(OAUTH_NEXT_COOKIE, "", { ...oauthCookieOptions(0), maxAge: 0 });
  return response;
}
