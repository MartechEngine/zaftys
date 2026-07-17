import { apiSuccess } from "@/lib/api-response";
import { getDriversAnalytics } from "@/lib/analytics/series";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getDriversAnalytics());
}
