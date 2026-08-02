import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { getMarketplaceAnalytics } from "@/lib/tsm/analytics-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/** Marketplace analytics — scoped to session org's linked supplier only. */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const result = await getMarketplaceAnalytics({ supplierId });
  return apiSuccess(result);
}
