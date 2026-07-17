import {
  createServiceRate,
  listServiceRates,
  validateCreateServiceRateInput,
} from "@/lib/billing/rates-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listServiceRates());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateServiceRateInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const rate = await createServiceRate(parsed);
  return apiSuccess(rate, { created: true });
}
