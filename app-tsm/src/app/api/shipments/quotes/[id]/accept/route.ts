import { acceptQuote } from "@/lib/shipments/quotes-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await acceptQuote(id);
  if (!result) return apiError("QUOTE_NOT_FOUND", "Quote not found or could not be accepted.", 404);
  return apiSuccess(result);
}
