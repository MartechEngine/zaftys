import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { buildTenancyStatus } from "@/lib/tsm/tenancy";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/** Honesty endpoint for multi-tenant + desktop packaging status. */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  return apiSuccess(buildTenancyStatus({ session, org }));
}
