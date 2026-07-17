"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import { FillGauge, HorizontalBars, VerticalBars } from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { NetworkAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function NetworkCharts({ initialData }: { initialData?: NetworkAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsNetwork().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartCard title="Listing pipeline" description="Draft → assigned" demo={data.demoSeries}>
        <VerticalBars
          labels={data.pipeline.map((p) => p.stage.replace(/_/g, " "))}
          series={[{ label: "Listings", data: data.pipeline.map((p) => p.count) }]}
          height={220}
        />
      </ChartCard>
      <ChartCard title="Time to first offer" description="Minutes from post" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.ttfBuckets.map((b) => b.bucket)}
          values={data.ttfBuckets.map((b) => b.count)}
          height={220}
          color={CHART.network}
        />
      </ChartCard>
      <ChartCard
        title="Fill rate"
        description={`${data.openPosts} open · ${data.offersWaiting} offers waiting`}
        demo={data.demoSeries}
      >
        <FillGauge value={data.fillRate} />
      </ChartCard>
    </div>
  );
}
