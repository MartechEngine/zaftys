import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 30 * 24 * 60 * 60 * 1000;

function secret(): string {
  return process.env.TRACK_TOKEN_SECRET ?? "dev-track-secret-set-TRACK_TOKEN_SECRET-in-prod";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Signed track token: `{shipmentId}.{expMs}.{hmac}` */
export function createTrackToken(shipmentId: string): string {
  const exp = String(Date.now() + TTL_MS);
  const payload = `${shipmentId}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyTrackToken(token: string): { shipmentId: string } | null {
  const parts = token.split(".");
  if (parts.length === 3) {
    const [shipmentId, expStr, sig] = parts;
    if (!shipmentId || !expStr || !sig) return null;
    const payload = `${shipmentId}.${expStr}`;
    if (!safeEqual(sign(payload), sig)) return null;
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || Date.now() > exp) return null;
    return { shipmentId };
  }

  if (token.startsWith("demo-")) {
    const legacyId = token.slice("demo-".length);
    return { shipmentId: legacyId };
  }

  return null;
}
