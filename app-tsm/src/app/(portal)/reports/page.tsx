import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HubCard } from "@/components/app/data-table";
import { demoReportOps } from "@/lib/demo-data";
import { KpiCard } from "@/components/app/app-shell";
import { REPORTS_NAV } from "@/lib/module-nav";

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Operations, lanes, fleet, and client analytics" />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Trips (30d)" value={demoReportOps.totalTrips} />
        <KpiCard label="On-time %" value={`${demoReportOps.onTimePercent}%`} />
        <KpiCard label="Avg transit (h)" value={demoReportOps.avgTransitHours} />
        <KpiCard label="Exceptions" value={demoReportOps.exceptions} variant="warning" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HubCard href="/reports/operations" title="Operations" description="Trips, SLA, exceptions" />
        <HubCard href="/reports/lanes" title="Lane performance" description="Corridor benchmarks" stat="4 corridors" />
        <HubCard href="/reports/drivers" title="Driver scorecards" description="Performance ranking" stat="4 drivers" />
        <HubCard href="/reports/fleet" title="Fleet utilization" description="Asset usage" stat="72%" />
        <HubCard href="/reports/custom" title="Custom reports" description="Report builder" stat="P5" />
      </div>
    </>
  );
}
