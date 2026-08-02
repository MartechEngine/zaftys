import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { listMarketplaceChats } from "@/lib/tsm/chat-client";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

/** Chat inbox — read-only conversation list for linked supplier. */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  await ensureTsmOrgHydrated();
  const org = await getOrgAccountForSession(session);
  const supplierId = org.tranzfortSupplierId || session.supplierId;

  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 25);
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const includeArchived = url.searchParams.get("archived") === "1";

  const result = await listMarketplaceChats({
    supplierId,
    search: q,
    limit: Number.isFinite(limit) ? limit : 25,
    offset: Number.isFinite(offset) ? offset : 0,
    includeArchived,
  });

  return apiSuccess(result);
}
