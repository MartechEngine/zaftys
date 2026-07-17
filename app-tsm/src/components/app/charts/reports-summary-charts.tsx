"use client";

import { ChartCard } from "@/components/app/charts/chart-card";
import { AreaTrend, StatusDonut } from "@/components/app/charts/charts";
import type { CommandCenterAnalytics, OperationsAnalytics } from "@/lib/analytics/series";

export function ReportsSummaryCharts({
  operations,
  commandCenter,
}: {
  operations: OperationsAnalytics;
  commandCenter: CommandCenterAnalytics;
}) {
  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-2">
      <ChartCard title="Trip volume (30d)" description="Fleet + network" demo={operations.demoSeries}>
        <AreaTrend
          labels={operations.tripsOverTime.map((d) => d.date)}
          series={[
            {
              label: "Trips",
              data: operations.tripsOverTime.map((d) => d.trips),
            },
          ]}
          height={200}
        />
      </ChartCard>
      <ChartCard title="Status mix" description="Current shipment states" demo={commandCenter.demoSeries}>
        <StatusDonut items={commandCenter.statusMix} height={200} />
      </ChartCard>
    </div>
  );
}
