import { apiError, apiSuccess } from "@/lib/api-response";
import {
  importShipments,
  validateImportBody,
} from "@/lib/shipments/import-shipments";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateImportBody(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const result = await importShipments(parsed.rows);
  return apiSuccess(result);
}
