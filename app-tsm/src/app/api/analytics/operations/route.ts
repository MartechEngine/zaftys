import { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { getOperationsAnalytics } from "@/lib/analytics/series";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const days = Number(req.nextUrl.searchParams.get("days") || 30);
  return apiSuccess(await getOperationsAnalytics(Number.isFinite(days) ? days : 30));
}
