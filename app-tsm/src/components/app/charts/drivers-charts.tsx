"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import { HorizontalBars, ScatterPlot } from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { DriversAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function DriversCharts({ initialData }: { initialData?: DriversAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsDrivers().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mb-6 grid gap-4 lg:grid-cols-2">
      <ChartCard title="Driver leaderboard" description="Trips this period" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.leaderboard.map((d) => d.name)}
          values={data.leaderboard.map((d) => d.trips)}
          color={CHART.primary}
        />
      </ChartCard>
      <ChartCard title="Trips vs rating" description="Performance scatter" demo={data.demoSeries}>
        <ScatterPlot
          points={data.scatter.map((d) => ({
            id: d.id,
            x: d.trips,
            y: d.rating,
            label: d.name,
          }))}
        />
      </ChartCard>
    </div>
  );
}
