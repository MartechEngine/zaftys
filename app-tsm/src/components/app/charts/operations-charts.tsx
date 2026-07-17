"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import { AreaTrend, HorizontalBars, LineTrend } from "@/components/app/charts/charts";
import { ExportSeriesCsvButton } from "@/components/app/charts/export-series-csv";
import { CHART } from "@/lib/analytics/chart-theme";
import type { OperationsAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function OperationsCharts({ initialData }: { initialData?: OperationsAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsOperations().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-3">
      <ChartCard
        title="Trips over time"
        description="Fleet vs network (30d)"
        demo={data.demoSeries}
        className="lg:col-span-2"
        action={
          <ExportSeriesCsvButton
            filename="trips-over-time"
            headers={["date", "fleet", "network", "trips"]}
            rows={data.tripsOverTime.map((d) => [d.date, d.fleet, d.network, d.trips])}
          />
        }
      >
        <AreaTrend
          labels={data.tripsOverTime.map((d) => d.date)}
          series={[
            { label: "Fleet", data: data.tripsOverTime.map((d) => d.fleet), area: true },
            { label: "Network", data: data.tripsOverTime.map((d) => d.network), area: true },
          ]}
        />
      </ChartCard>
      <ChartCard title="On-time trend" description="Weekly SLA %" demo={data.demoSeries}>
        <LineTrend
          labels={data.onTimeByWeek.map((w) => w.week)}
          values={data.onTimeByWeek.map((w) => w.pct)}
          label="On-time %"
        />
      </ChartCard>
      <ChartCard
        title="Corridor ranking"
        description="Trips by lane"
        demo={data.demoSeries}
        className="lg:col-span-3"
        action={
          <ExportSeriesCsvButton
            filename="corridor-ranking"
            headers={["corridor", "trips", "on_time_pct"]}
            rows={data.byCorridor.map((c) => [c.corridor, c.trips, c.onTimePct])}
          />
        }
      >
        <HorizontalBars
          labels={data.byCorridor.map((c) => c.corridor)}
          values={data.byCorridor.map((c) => c.trips)}
          color={CHART.primary}
        />
      </ChartCard>
    </div>
  );
}
