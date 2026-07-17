import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { applyProfileOverlay } from "@/lib/auth/profile-store";
import { getConfigPatches } from "@/lib/mutations/entity-stores";
import type { SessionPayload, SessionUser } from "./types";

export const SESSION_COOKIE = "tsm_session";
const DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.SESSION_SECRET ?? "zaftys-tsm-dev-secret-change-me";
}

function sign(data: string) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

/** Resolve session lifetime: env → in-memory security config → 7 days. */
export function getSessionMaxAgeSec(): number {
  const envHours = process.env.SESSION_MAX_AGE_HOURS;
  if (envHours != null && envHours.trim() !== "") {
    const hours = Number(envHours);
    if (Number.isFinite(hours) && hours > 0) {
      return Math.round(hours * 3600);
    }
  }

  try {
    const patch = getConfigPatches()["security"];
    const raw = patch?.sessionTimeoutHours;
    const hours = typeof raw === "number" ? raw : Number(raw);
    if (Number.isFinite(hours) && hours > 0) {
      return Math.round(hours * 3600);
    }
  } catch {
    // config store unavailable — fall through
  }

  return DEFAULT_MAX_AGE_SEC;
}

export function createSessionToken(user: SessionUser): string {
  const enriched = applyProfileOverlay(user);
  const maxAge = getSessionMaxAgeSec();
  const payload: SessionPayload = {
    ...enriched,
    exp: Math.floor(Date.now() / 1000) + maxAge,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function parseSessionToken(token: string): SessionPayload | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = sign(data);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = parseSessionToken(token);
  if (!payload) return null;
  return applyProfileOverlay(payload) as SessionPayload;
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getSessionMaxAgeSec(),
  };
}
