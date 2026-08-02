import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canPublishToTranzfort } from "@/lib/tsm/org";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { cancelSupplierLoad } from "@/lib/tsm/loads-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/**
 * Cancel a marketplace load for the linked supplier.
 * Body: { action: "cancel" }
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ loadId: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canPublishToTranzfort(session.role)) {
    return apiError("FORBIDDEN", "Your role cannot cancel marketplace loads.", 403);
  }

  const { loadId } = await context.params;
  if (!loadId?.trim()) {
    return apiError("VALIDATION", "loadId required.", 400);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("VALIDATION", "JSON body required.", 400);
  }

  const action = String(body.action ?? "").toLowerCase();
  if (action !== "cancel") {
    return apiError("VALIDATION", 'action must be "cancel".', 400);
  }

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const result = await cancelSupplierLoad({
    tsmOrgId: org.id,
    supplierId,
    loadId,
  });

  if (!result.ok) {
    return apiError("CANCEL_FAILED", result.message, 400);
  }
  return apiSuccess(result);
}
