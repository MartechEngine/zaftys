import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { listSupplierBookings } from "@/lib/tsm/bookings-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";
import type { BookingInboxTab } from "@/lib/tsm/bookings-types";
import { tenancyApiError } from "@/lib/tsm/tenancy-http";

/**
 * Booking inbox — scoped to session org's linked supplier only.
 * Query: status=pending|decided|all, q, limit, offset
 */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  let org;
  try {
    org = await getOrgAccountForSession(session);
  } catch (e) {
    const err = tenancyApiError(e);
    if (err) return err;
    throw e;
  }
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const url = new URL(request.url);
  const statusRaw = url.searchParams.get("status") ?? "pending";
  const statusTab: BookingInboxTab =
    statusRaw === "pending" || statusRaw === "decided" || statusRaw === "all"
      ? statusRaw
      : "pending";
  const q = url.searchParams.get("q") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 25);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const result = await listSupplierBookings({
    supplierId,
    statusTab,
    search: q,
    limit: Number.isFinite(limit) ? limit : 25,
    offset: Number.isFinite(offset) ? offset : 0,
  });

  return apiSuccess(result);
}
