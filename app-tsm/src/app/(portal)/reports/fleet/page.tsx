import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/app/data-table";
import { FleetCharts } from "@/components/app/charts/fleet-charts";
import { getFleetAnalytics } from "@/lib/analytics/series";
import { getFleetUtilizationReport } from "@/lib/reports/fleet-report";
import { REPORTS_NAV } from "@/lib/module-nav";
import { ExportReportCsvButton } from "@/components/app/sprint15-forms";

export default async function ReportsFleetPage() {
  const [report, analytics] = await Promise.all([
    getFleetUtilizationReport(),
    getFleetAnalytics(),
  ]);

  return (
    <>
      <PageHeader
        title="Fleet utilization"
        description="Asset usage and idle time"
        action={<ExportReportCsvButton path="/api/reports/fleet" filename="fleet" />}
      />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Utilization</p><p className="text-3xl font-bold text-navy">{report.utilizationPercent}%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">On trip</p><p className="text-3xl font-bold text-navy">{report.onTrip}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Available</p><p className="text-3xl font-bold text-navy">{report.available}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Avg idle (h/day)</p><p className="text-3xl font-bold text-navy">{report.idleHoursAvg}</p></CardContent></Card>
      </div>
      <FleetCharts initialData={analytics} />
      <DataTable
        rows={report.byVehicle}
        columns={[
          { key: "registration", header: "Vehicle", render: (r) => <span className="font-mono">{r.registration}</span> },
          { key: "status", header: "Status", render: (r) => <span className="capitalize">{r.status.replace(/_/g, " ")}</span> },
          { key: "tripsThisMonth", header: "Trips", render: (r) => r.tripsThisMonth },
          { key: "utilizationPercent", header: "Utilization", render: (r) => `${r.utilizationPercent}%` },
        ]}
      />
    </>
  );
}
