import {
  createCustomReport,
  listCustomReportDefinitions,
  validateCreateCustomReportInput,
} from "@/lib/reports/custom-reports";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listCustomReportDefinitions());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateCustomReportInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createCustomReport(parsed), { created: true });
}
