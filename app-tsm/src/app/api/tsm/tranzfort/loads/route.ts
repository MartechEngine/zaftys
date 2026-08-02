import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { listSupplierLoads } from "@/lib/tsm/loads-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";
import type { SupplierLoadTab } from "@/lib/tsm/loads-types";
import { tenancyApiError } from "@/lib/tsm/tenancy-http";

/**
 * My Loads — scoped to session org's linked supplier only.
 * Query: status=active|expired|cancelled|completed|all, q, limit, offset
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

  // Never trust client-supplied supplier UUID — session/org only.
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const url = new URL(request.url);
  const statusRaw = url.searchParams.get("status") ?? "all";
  const statusTab: SupplierLoadTab =
    statusRaw === "active" ||
    statusRaw === "expired" ||
    statusRaw === "cancelled" ||
    statusRaw === "completed" ||
    statusRaw === "all"
      ? statusRaw
      : "all";
  const q = url.searchParams.get("q") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 20);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const result = await listSupplierLoads({
    supplierId,
    statusTab,
    search: q,
    limit: Number.isFinite(limit) ? limit : 20,
    offset: Number.isFinite(offset) ? offset : 0,
  });

  return apiSuccess(result);
}
