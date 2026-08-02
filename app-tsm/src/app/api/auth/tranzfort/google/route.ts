import { NextResponse } from "next/server";
import {
  createPkcePair,
  googleAuthorizeUrl,
  OAUTH_NEXT_COOKIE,
  OAUTH_VERIFIER_COOKIE,
  oauthCookieOptions,
} from "@/lib/tsm/tranzfort-oauth";
import { isTranzfortAuthConfigured } from "@/lib/tsm/tranzfort-auth";
import { getBridgeMode } from "@/lib/tsm/bridge-rpc";

/**
 * Start TranZfort Google OAuth (PKCE).
 * Ops must allowlist redirect: {TSM_PUBLIC_URL}/api/auth/tranzfort/callback
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "";

  if (getBridgeMode() !== "live" || !isTranzfortAuthConfigured()) {
    const login = new URL("/login", request.url);
    login.searchParams.set(
      "error",
      "Google sign-in needs live bridge and TranZfort Auth keys (URL + anon).",
    );
    return NextResponse.redirect(login);
  }

  const { verifier, challenge } = createPkcePair();
  const authorize = googleAuthorizeUrl(challenge);

  const response = NextResponse.redirect(authorize);
  response.cookies.set(OAUTH_VERIFIER_COOKIE, verifier, oauthCookieOptions(600));
  response.cookies.set(
    OAUTH_NEXT_COOKIE,
    next.startsWith("/") ? next : "",
    oauthCookieOptions(600),
  );
  return response;
}
