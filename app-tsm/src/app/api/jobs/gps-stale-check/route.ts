import { runGpsStaleCheck } from "@/lib/jobs/gps-stale-check";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

export async function GET() {
  // Dry-run style: report with current threshold, no exception raise
  const result = await runGpsStaleCheck({ raiseException: false });
  return apiSuccess(result);
}
