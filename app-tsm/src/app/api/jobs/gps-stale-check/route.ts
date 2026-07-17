import { getSession } from "@/lib/auth/session";
import { isCronAuthorized, isCronConfigured } from "@/lib/jobs/authorize-cron";
import { runGpsStaleCheck } from "@/lib/jobs/gps-stale-check";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

async function authorize(request: Request) {
  const session = await getSession();
  if (session) return true;
  if (isCronAuthorized(request)) return true;
  return false;
}

export async function POST(request: Request) {
  if (!(await authorize(request))) {
    return apiError(
      "UNAUTHORIZED",
      isCronConfigured()
        ? "Sign in or provide Authorization: Bearer <TSM_CRON_SECRET>."
        : "Sign in required. Set TSM_CRON_SECRET to enable cron auth.",
      401,
    );
  }

  let body: Record<string, unknown> = {};
  try {
    const text = await request.text();
    if (text) body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const thresholdMinutes =
    body.thresholdMinutes != null ? Number(body.thresholdMinutes) : undefined;
  const raiseException = body.raiseException === true;

  const result = await runGpsStaleCheck({
    thresholdMinutes: Number.isFinite(thresholdMinutes) ? thresholdMinutes : undefined,
    raiseException,
  });

  return apiSuccess(result);
}

export async function GET(request: Request) {
  if (!(await authorize(request))) {
    return apiError("UNAUTHORIZED", "Sign in or cron Bearer required.", 401);
  }
  const result = await runGpsStaleCheck({ raiseException: false });
  return apiSuccess(result);
}
