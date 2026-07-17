"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import {
  FillGauge,
  HorizontalBars,
  StatusDonut,
} from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { CommandCenterAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function CommandCenterCharts({
  initialData,
}: {
  initialData?: CommandCenterAnalytics;
}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsCommandCenter().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ChartCard title="Trip status mix" description="Live shipment states" demo={data.demoSeries}>
        <StatusDonut items={data.statusMix} height={200} />
      </ChartCard>
      <ChartCard title="Unassigned aging" description="Pending without driver" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.unassignedAging.map((b) => b.bucket)}
          values={data.unassignedAging.map((b) => b.count)}
          height={200}
          color={CHART.warning}
        />
      </ChartCard>
      <ChartCard title="Exception reasons" description="Top open issues" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.exceptionReasons.map((r) => r.label)}
          values={data.exceptionReasons.map((r) => r.value)}
          height={200}
          color={CHART.danger}
        />
      </ChartCard>
      <ChartCard
        title="Network fill rate"
        description={`${data.network.openPosts} open · ${data.network.offersWaiting} offers waiting`}
        demo={data.demoSeries}
      >
        <FillGauge value={data.network.fillRate} />
      </ChartCard>
    </div>
  );
}
