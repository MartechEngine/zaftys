import {
  getOperationsReport,
  getDriverScorecards,
  operationsReportToCsv,
  driverScorecardsToCsv,
} from "@/lib/reports/operations-report";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const type = new URL(request.url).searchParams.get("type");

  if (format === "csv" && type === "drivers") {
    const scorecards = await getDriverScorecards();
    const csv = driverScorecardsToCsv(scorecards);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="drivers-${stamp}.csv"`,
      },
    });
  }

  const report = await getOperationsReport();

  if (format === "csv") {
    const csv = operationsReportToCsv(report.byCorridor);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="operations-${stamp}.csv"`,
      },
    });
  }

  return apiSuccess(report);
}
