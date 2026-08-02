import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import {
  buildTenancyStatus,
  TenancyError,
} from "@/lib/tsm/tenancy";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/** Honesty endpoint for multi-tenant + desktop packaging status. */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  try {
    const org = await getOrgAccountForSession(session);
    return apiSuccess(buildTenancyStatus({ session, org }));
  } catch (e) {
    if (e instanceof TenancyError) {
      return apiSuccess(
        buildTenancyStatus({ session, org: null }),
        { tenancyError: e.code },
      );
    }
    const msg = e instanceof Error ? e.message : "Tenancy status failed";
    return apiError("TENANCY_STATUS", msg, 500);
  }
}
