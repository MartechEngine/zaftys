import { runCustomReport } from "@/lib/reports/custom-reports";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await runCustomReport(id);
  if (!result) return apiError("REPORT_NOT_FOUND", "Report not found.", 404);
  if ("error" in result) {
    return apiError("REPORT_NOT_READY", String(result.error), 400);
  }
  return apiSuccess(result);
}
