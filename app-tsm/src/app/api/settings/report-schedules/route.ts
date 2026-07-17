import {
  createReportSchedule,
  deleteReportSchedule,
  getReportSchedules,
  validateCreateReportScheduleInput,
} from "@/lib/settings/config-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getReportSchedules());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateReportScheduleInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createReportSchedule(parsed), { created: true });
}

export async function DELETE(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const id = String((body as { id?: string }).id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const deleted = await deleteReportSchedule(id);
  if (!deleted) return apiError("SCHEDULE_NOT_FOUND", "Report schedule not found.", 404);
  return apiSuccess({ id, deleted: true });
}
