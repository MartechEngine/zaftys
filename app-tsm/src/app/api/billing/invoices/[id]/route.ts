import { getInvoice, updateInvoiceStatus } from "@/lib/billing/invoice-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) return apiError("INVOICE_NOT_FOUND", "Invoice not found.", 404);
  return apiSuccess(invoice);
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

  const status = String((body as { status?: string }).status ?? "");
  if (status !== "pending" && status !== "paid") {
    return apiError("VALIDATION_ERROR", "status must be pending or paid.");
  }

  const invoice = await updateInvoiceStatus(id, status);
  if (!invoice) return apiError("INVOICE_NOT_FOUND", "Invoice not found.", 404);
  return apiSuccess(invoice);
}
