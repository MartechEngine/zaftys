import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { fetchMaterials } from "@/lib/tsm/catalog-client";

/** Material typeahead for publish form. */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { searchParams } = new URL(request.url);
  const q = String(searchParams.get("q") ?? "");
  const limit = Math.min(30, Math.max(1, Number(searchParams.get("limit") ?? 12) || 12));
  const result = await fetchMaterials(q, limit);
  return apiSuccess(result);
}
