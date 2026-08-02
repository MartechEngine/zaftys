import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { listSupplierTrips } from "@/lib/tsm/trips-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";
import type { SupplierTripTab } from "@/lib/tsm/trips-types";

/**
 * Supplier trips — scoped to session org's linked supplier only.
 * Query: status=active|completed|all, q, limit, offset
 */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const url = new URL(request.url);
  const statusRaw = url.searchParams.get("status") ?? "all";
  const statusTab: SupplierTripTab =
    statusRaw === "active" || statusRaw === "completed" || statusRaw === "all"
      ? statusRaw
      : "all";
  const q = url.searchParams.get("q") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 20);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const result = await listSupplierTrips({
    supplierId,
    statusTab,
    search: q,
    limit: Number.isFinite(limit) ? limit : 20,
    offset: Number.isFinite(offset) ? offset : 0,
  });

  return apiSuccess(result);
}
