import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoReportOps } from "@/lib/demo-data";
import { REPORTS_NAV } from "@/lib/module-nav";

export default function ReportsOperationsPage() {
  return (
    <>
      <PageHeader title="Operations report" description="Last 30 days" />
      <ModuleSubNav links={REPORTS_NAV} />
      <DataTable
        rows={demoReportOps.byCorridor.map((c, i) => ({ id: String(i), ...c }))}
        columns={[
          { key: "corridor", header: "Corridor", render: (r) => r.corridor },
          { key: "trips", header: "Trips", render: (r) => r.trips },
          { key: "onTime", header: "On-time %", render: (r) => `${r.onTime}%` },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/reports" className="text-link hover:underline">← Reports hub</Link>
      </p>
    </>
  );
}
