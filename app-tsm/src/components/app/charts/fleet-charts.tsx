"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import { FillGauge, HorizontalBars, StatusDonut } from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { FleetAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function FleetCharts({ initialData }: { initialData?: FleetAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsFleet().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartCard title="Fleet utilization" description="Assets on trip" demo={data.demoSeries}>
        <FillGauge value={data.utilizationPct} color={CHART.success} />
      </ChartCard>
      <ChartCard title="Vehicle status" description="Available / on trip / maintenance" demo={data.demoSeries}>
        <StatusDonut items={data.statusMix} height={200} />
      </ChartCard>
      <ChartCard title="Capacity use" description="Loaded tonnage vs capacity" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.capacity.map((v) => v.label)}
          values={data.capacity.map((v) => v.used)}
          color={CHART.primary}
        />
      </ChartCard>
    </div>
  );
}
