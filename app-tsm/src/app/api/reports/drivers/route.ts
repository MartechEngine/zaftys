import { getDriverScorecards, driverScorecardsToCsv } from "@/lib/reports/operations-report";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const scorecards = await getDriverScorecards();

  if (format === "csv") {
    const csv = driverScorecardsToCsv(scorecards);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="drivers-${stamp}.csv"`,
      },
    });
  }

  return apiSuccess(scorecards);
}
