import {
  listComplianceDocs,
  updateComplianceDoc,
  type ComplianceDocStatus,
} from "@/lib/fleet/compliance-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listComplianceDocs());
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  const status = String(data.status ?? "valid") as ComplianceDocStatus;
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (!["valid", "expiring", "expired"].includes(status)) {
    return apiError("VALIDATION_ERROR", "status must be valid, expiring, or expired.");
  }

  const doc = await updateComplianceDoc(id, status);
  if (!doc) return apiError("DOC_NOT_FOUND", "Compliance document not found.", 404);
  return apiSuccess(doc);
}
