import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { DriversCharts } from "@/components/app/charts/drivers-charts";
import { getDriversAnalytics } from "@/lib/analytics/series";
import { getDriverScorecards } from "@/lib/reports/operations-report";
import { REPORTS_NAV } from "@/lib/module-nav";
import { ExportReportCsvButton } from "@/components/app/sprint15-forms";

export default async function ReportsDriversPage() {
  const [scorecards, analytics] = await Promise.all([
    getDriverScorecards(),
    getDriversAnalytics(),
  ]);

  return (
    <>
      <PageHeader
        title="Driver scorecards"
        description="Performance ranking — live from shipments"
        action={<ExportReportCsvButton path="/api/reports/drivers" filename="drivers" />}
      />
      <ModuleSubNav links={REPORTS_NAV} />
      <DriversCharts initialData={analytics} />
      {scorecards.length === 0 ? (
        <p className="text-sm text-muted-foreground">No driver trip data yet.</p>
      ) : (
        <DataTable
          rows={scorecards}
          columns={[
            { key: "name", header: "Driver", render: (r) => r.name },
            { key: "trips", header: "Trips", render: (r) => r.trips },
            { key: "onTime", header: "On-time", render: (r) => r.onTime },
            { key: "safety", header: "Safety", render: (r) => r.safety },
            { key: "rating", header: "Rating", render: (r) => `${r.rating} ★` },
          ]}
        />
      )}
      <p className="mt-4 text-sm">
        <Link href="/reports" className="text-link hover:underline">
          ← Reports hub
        </Link>
      </p>
    </>
  );
}
