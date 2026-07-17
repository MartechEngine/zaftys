import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { getOperationsReport } from "@/lib/reports/operations-report";
import { REPORTS_NAV } from "@/lib/module-nav";

export default async function ReportsOperationsPage() {
  const report = await getOperationsReport();

  return (
    <>
      <PageHeader
        title="Operations report"
        description={`${report.totalTrips} trips · ${report.onTimePercent}% on-time · ${report.exceptions} exceptions`}
      />
      <ModuleSubNav links={REPORTS_NAV} />
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
