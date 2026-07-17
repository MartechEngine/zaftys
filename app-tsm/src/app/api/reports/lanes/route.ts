import { getLanesReport, lanesReportToCsv } from "@/lib/reports/lanes-report";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const report = await getLanesReport();

  if (format === "csv") {
    const csv = lanesReportToCsv(report.corridors);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="lanes-${stamp}.csv"`,
      },
    });
  }

  return apiSuccess(report);
}
