import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HubCard } from "@/components/app/data-table";
import { ReportsSummaryCharts } from "@/components/app/charts/reports-summary-charts";
import {
  getCommandCenterAnalytics,
  getOperationsAnalytics,
} from "@/lib/analytics/series";
import { getOperationsReport } from "@/lib/reports/operations-report";
import { listDrivers, listVehicles } from "@/lib/data/shipment-repository";
import { KpiCard } from "@/components/app/app-shell";
import { REPORTS_NAV } from "@/lib/module-nav";

export default async function ReportsPage() {
  const [report, drivers, vehicles, operationsAnalytics, commandCenterAnalytics] =
    await Promise.all([
      getOperationsReport(),
      listDrivers(),
      listVehicles(),
      getOperationsAnalytics(),
      getCommandCenterAnalytics(),
    ]);
  const onTrip = vehicles.filter((v) => v.status === "on_trip").length;
  const utilization =
    vehicles.length > 0 ? Math.round((onTrip / vehicles.length) * 100) : 0;

  return (
    <>
      <PageHeader title="Reports" description="Operations, lanes, fleet, and client analytics" />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Trips (30d)" value={report.totalTrips} />
        <KpiCard label="On-time %" value={`${report.onTimePercent}%`} />
        <KpiCard label="Avg transit (h)" value={report.avgTransitHours} />
        <KpiCard label="Exceptions" value={report.exceptions} variant="warning" showSparkline={false} />
      </div>
      <ReportsSummaryCharts
        operations={operationsAnalytics}
        commandCenter={commandCenterAnalytics}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HubCard
          href="/reports/operations"
          title="Operations"
          description="Trips, SLA, exceptions"
          stat={`${report.byCorridor.length} corridors`}
        />
        <HubCard
          href="/reports/lanes"
          title="Lane performance"
          description="Corridor benchmarks"
          stat={`${report.byCorridor.length} corridors`}
        />
        <HubCard
          href="/reports/drivers"
          title="Driver scorecards"
          description="Performance ranking"
          stat={`${drivers.length} drivers`}
        />
        <HubCard
          href="/reports/fleet"
          title="Fleet utilization"
          description="Asset usage"
          stat={`${utilization}%`}
        />
        <HubCard href="/reports/custom" title="Custom reports" description="Report builder" stat="P5" />
      </div>
    </>
  );
}
