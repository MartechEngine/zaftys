import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { canApproveBookings } from "@/lib/tsm/org";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import {
  approveSupplierBooking,
  rejectSupplierBooking,
} from "@/lib/tsm/bookings-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/**
 * Approve or reject a marketplace booking for the linked supplier.
 * Body: { action: "approve" | "reject", reason?: string }
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ bookingId: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (!canApproveBookings(session.role)) {
    return apiError("FORBIDDEN", "Your role cannot approve bookings.", 403);
  }

  const { bookingId } = await context.params;
  if (!bookingId?.trim()) {
    return apiError("VALIDATION", "bookingId required.", 400);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("VALIDATION", "JSON body required.", 400);
  }

  const action = String(body.action ?? "").toLowerCase();
  if (action !== "approve" && action !== "reject") {
    return apiError("VALIDATION", 'action must be "approve" or "reject".', 400);
  }

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const result =
    action === "approve"
      ? await approveSupplierBooking({
          tsmOrgId: org.id,
          supplierId,
          bookingId,
        })
      : await rejectSupplierBooking({
          tsmOrgId: org.id,
          supplierId,
          bookingId,
          reason: body.reason != null ? String(body.reason) : undefined,
        });

  if (!result.ok) {
    return apiError("BOOKING_ACTION_FAILED", result.message ?? "Action failed.", 400);
  }

  return apiSuccess(result);
}
