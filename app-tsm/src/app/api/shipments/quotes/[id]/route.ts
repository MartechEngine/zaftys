import { updateQuoteStatus, reviseQuote } from "@/lib/shipments/quotes-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

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

  const data = body as { status?: string; tonnage?: number; rateInr?: number };
  const status = String(data.status ?? "");
  const tonnage = data.tonnage != null ? Number(data.tonnage) : undefined;
  const rateInr = data.rateInr != null ? Number(data.rateInr) : undefined;

  if (status) {
    if (!["sent", "draft", "accepted", "declined"].includes(status)) {
      return apiError("VALIDATION_ERROR", "status must be draft, sent, accepted, or declined.");
    }
    const quote = await updateQuoteStatus(id, status as "sent" | "draft" | "accepted" | "declined");
    if (!quote) return apiError("QUOTE_NOT_FOUND", "Quote not found.", 404);
    return apiSuccess(quote);
  }

  if (tonnage == null && rateInr == null) {
    return apiError("VALIDATION_ERROR", "Provide status, tonnage, and/or rateInr.");
  }

  const quote = await reviseQuote(id, { tonnage, rateInr });
  if (!quote) return apiError("QUOTE_NOT_FOUND", "Quote not found or cannot be revised.", 404);
  return apiSuccess(quote);
}
