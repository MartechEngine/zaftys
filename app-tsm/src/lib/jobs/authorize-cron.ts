import { timingSafeEqual } from "crypto";

/**
 * Authorize cron / webhook callers via `Authorization: Bearer <TSM_CRON_SECRET>`.
 * Returns true when secret is configured and matches.
 */
export function isCronAuthorized(request: Request): boolean {
  const secret = process.env.TSM_CRON_SECRET?.trim();
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return false;

  const provided = match[1].trim();
  try {
    const a = Buffer.from(provided);
    const b = Buffer.from(secret);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** True when cron secret is set (jobs can be invoked without a session). */
export function isCronConfigured(): boolean {
  return Boolean(process.env.TSM_CRON_SECRET?.trim());
}
