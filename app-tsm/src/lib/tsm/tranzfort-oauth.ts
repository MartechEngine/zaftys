/**
 * TranZfort Google OAuth (PKCE) helpers for TSM BFF.
 * Reuses the same Supabase Google provider / Web client as Flutter — do not rotate.
 */

import { createHash, randomBytes } from "crypto";
import { tranzfortAnonKey, tranzfortPublicUrl } from "@/lib/tsm/tranzfort-auth";

export const OAUTH_VERIFIER_COOKIE = "tsm_tz_oauth_verifier";
export const OAUTH_NEXT_COOKIE = "tsm_tz_oauth_next";

export function tsmPublicOrigin(): string {
  const raw =
    process.env.TSM_PUBLIC_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function googleCallbackUrl(): string {
  return `${tsmPublicOrigin()}/api/auth/tranzfort/callback`;
}

export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return { verifier, challenge };
}

export function googleAuthorizeUrl(codeChallenge: string): string {
  const base = tranzfortPublicUrl();
  const params = new URLSearchParams({
    provider: "google",
    redirect_to: googleCallbackUrl(),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `${base}/auth/v1/authorize?${params.toString()}`;
}

export type PkceTokenResult = {
  accessToken: string;
  userId: string;
  email: string;
};

/** Exchange auth code + verifier for a Supabase session (PKCE). */
export async function exchangePkceCode(
  code: string,
  codeVerifier: string,
): Promise<PkceTokenResult> {
  const base = tranzfortPublicUrl();
  const anon = tranzfortAnonKey();
  const res = await fetch(`${base}/auth/v1/token?grant_type=pkce`, {
    method: "POST",
    headers: {
      apikey: anon,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      auth_code: code,
      code_verifier: codeVerifier,
    }),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`pkce_exchange_failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const json = JSON.parse(text) as {
    access_token?: string;
    user?: { id?: string; email?: string };
  };
  const accessToken = json.access_token ?? "";
  const userId = json.user?.id ?? "";
  const email = json.user?.email ?? "";
  if (!accessToken || !userId) {
    throw new Error("pkce_exchange_missing_session");
  }
  return { accessToken, userId, email };
}

export function oauthCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSec,
  };
}
