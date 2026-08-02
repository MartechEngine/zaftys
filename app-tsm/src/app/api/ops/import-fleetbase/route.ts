import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { importFleetbaseIntoPostgres } from "@/lib/execution/import-fleetbase";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { tenancyApiError } from "@/lib/tsm/tenancy-http";

export const dynamic = "force-dynamic";

/**
 * One-shot pilot import: Fleetbase orders/fleet → Postgres + link TSM-posted My Loads.
 * Admin only. Do not delete Fleetbase until this + shipment UI smoke pass.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);
  if (session.role !== "admin") {
    return apiError("FORBIDDEN", "Admin only.", 403);
  }

  const cron = process.env.TSM_CRON_SECRET?.trim();
  if (cron) {
    const header = request.headers.get("x-tsm-cron-secret")?.trim();
    // Optional second gate when secret is configured (CI / scripts).
    if (header && header !== cron) {
      return apiError("FORBIDDEN", "Invalid cron secret.", 403);
    }
  }

  let org;
  try {
    org = await getOrgAccountForSession(session);
  } catch (e) {
    const err = tenancyApiError(e);
    if (err) return err;
    throw e;
  }

  const result = await importFleetbaseIntoPostgres({
    orgId: org.id,
    supplierId: org.tranzfortSupplierId ?? session.supplierId,
  });

  return apiSuccess(result, {
    note: "Fleetbase escape hatch retained — delete only after full parity smoke.",
  });
}
