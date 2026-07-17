import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { OperationsCharts } from "@/components/app/charts/operations-charts";
import { getOperationsAnalytics } from "@/lib/analytics/series";
import { getOperationsReport } from "@/lib/reports/operations-report";
import { REPORTS_NAV } from "@/lib/module-nav";
import { ExportReportCsvButton } from "@/components/app/sprint15-forms";

export default async function ReportsOperationsPage() {
  const [report, analytics] = await Promise.all([
    getOperationsReport(),
    getOperationsAnalytics(),
  ]);

  return (
    <>
      <PageHeader
        title="Operations report"
        description={`${report.totalTrips} trips · ${report.onTimePercent}% on-time · ${report.exceptions} exceptions`}
        action={<ExportReportCsvButton path="/api/reports/operations" filename="operations" />}
      />
      <ModuleSubNav links={REPORTS_NAV} />
      <OperationsCharts initialData={analytics} />
      <DataTable
        rows={report.byCorridor.map((c, i) => ({ id: String(i), ...c }))}
        columns={[
          { key: "corridor", header: "Corridor", render: (r) => r.corridor },
          { key: "trips", header: "Trips", render: (r) => r.trips },
          { key: "onTime", header: "On-time %", render: (r) => `${r.onTime}%` },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/reports" className="text-link hover:underline">
          ← Reports hub
        </Link>
      </p>
    </>
  );
}
