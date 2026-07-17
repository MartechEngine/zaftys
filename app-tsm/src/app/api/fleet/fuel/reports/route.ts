import { listFuelReports } from "@/lib/fleet/fuel-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

function csvEscape(value: string | number | undefined) {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const reports = await listFuelReports();

  if (format === "csv") {
    const header = ["vehicle", "period", "liters_total", "km_per_liter", "cost_per_km"];
    const rows = reports.map((r) =>
      [r.vehicle, r.period, r.litersTotal, r.kmPerLiter, r.costPerKm].map(csvEscape).join(","),
    );
    const csv = [header.join(","), ...rows].join("\n");
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="fuel-reports-${stamp}.csv"`,
      },
    });
  }

  return apiSuccess(reports);
}
