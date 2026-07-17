"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import { HorizontalBars, VerticalBars } from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { LanesAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function LanesCharts({ initialData }: { initialData?: LanesAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsLanes().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  const labels = data.corridors.map((c) => c.corridor);

  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-2">
      <ChartCard title="Trips by corridor" description="Volume ranking" demo={data.demoSeries}>
        <VerticalBars
          labels={labels}
          series={[{ label: "Trips", data: data.corridors.map((c) => c.trips) }]}
        />
      </ChartCard>
      <ChartCard title="On-time by corridor" description="SLA % per lane" demo={data.demoSeries}>
        <HorizontalBars
          labels={labels}
          values={data.corridors.map((c) => c.onTimePct)}
          color={CHART.success}
        />
      </ChartCard>
    </div>
  );
}
