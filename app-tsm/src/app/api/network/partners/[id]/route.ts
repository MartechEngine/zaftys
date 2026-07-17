import { getPartner, verifyPartner } from "@/lib/network/partners-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const partner = await getPartner(id);
  if (!partner) return apiError("PARTNER_NOT_FOUND", "Partner not found.", 404);
  return apiSuccess(partner);
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

  const data = (body ?? {}) as Record<string, unknown>;
  if (data.verify === true || data.verified === true) {
    const partner = await verifyPartner(id);
    if (!partner) return apiError("PARTNER_NOT_FOUND", "Partner not found.", 404);
    return apiSuccess(partner);
  }

  return apiError("VALIDATION_ERROR", "Provide { verify: true }.");
}
