import {
  createInvoice,
  listInvoices,
  validateCreateInvoiceInput,
} from "@/lib/billing/invoice-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listInvoices());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateInvoiceInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const invoice = await createInvoice(parsed);
  return apiSuccess(invoice, { created: true });
}
