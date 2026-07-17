import {
  createQuote,
  listQuotes,
  validateCreateQuoteInput,
} from "@/lib/shipments/quotes-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listQuotes());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateQuoteInput(body);
  if ("error" in parsed) {
    return apiError("VALIDATION_ERROR", parsed.error);
  }

  const quote = await createQuote(parsed);
  return apiSuccess(quote, { created: true });
}
