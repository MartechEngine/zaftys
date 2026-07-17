import { getFleetUtilizationReport, fleetUtilizationToCsv } from "@/lib/reports/fleet-report";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const report = await getFleetUtilizationReport();

  if (format === "csv") {
    const csv = fleetUtilizationToCsv(report.byVehicle);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="fleet-${stamp}.csv"`,
      },
    });
  }

  return apiSuccess(report);
}
