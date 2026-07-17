import { runGlobalSearch } from "@/lib/search/global-search";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  if (q.trim().length < 2) {
    return apiError("VALIDATION_ERROR", "Query must be at least 2 characters.", 400);
  }
  const results = await runGlobalSearch(q, 12);
  return apiSuccess(results, { total: results.length });
}
