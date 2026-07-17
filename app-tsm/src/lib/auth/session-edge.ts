import type { SessionPayload } from "./types";

export const SESSION_COOKIE = "tsm_session";

function secret() {
  return process.env.SESSION_SECRET ?? "zaftys-tsm-dev-secret-change-me";
}

function fromBase64Url(data: string) {
  const padded = data.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const normalized = pad ? padded + "=".repeat(4 - pad) : padded;
  return atob(normalized);
}

function toBase64Url(bytes: ArrayBuffer) {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(sig);
}

/** Edge-safe session verification for middleware. */
export async function parseSessionToken(token: string): Promise<SessionPayload | null> {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = await sign(data);
  if (sig.length !== expected.length) return null;
  let valid = true;
  for (let i = 0; i < sig.length; i++) {
    if (sig[i] !== expected[i]) valid = false;
  }
  if (!valid) return null;
  try {
    const payload = JSON.parse(fromBase64Url(data)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
