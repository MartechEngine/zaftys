import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { fetchVehicleCatalog } from "@/lib/tsm/catalog-client";

/** Vehicle catalog for publish form (live RPC or TSM stub). */
export async function GET() {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const catalog = await fetchVehicleCatalog();
  return apiSuccess(catalog);
}
