import {
  getServiceRate,
  patchServiceRate,
  validatePatchServiceRateInput,
} from "@/lib/billing/rates-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getServiceRate(id);
  if (!result) return apiError("RATE_NOT_FOUND", "Service rate not found.", 404);
  return apiSuccess(result);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validatePatchServiceRateInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const rate = await patchServiceRate(id, parsed);
  if (!rate) return apiError("RATE_NOT_FOUND", "Service rate not found.", 404);
  return apiSuccess(rate);
}
