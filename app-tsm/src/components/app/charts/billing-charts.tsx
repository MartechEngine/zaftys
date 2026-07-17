"use client";

import { useEffect, useState } from "react";
import { ChartCard } from "@/components/app/charts/chart-card";
import {
  AreaTrend,
  HorizontalBars,
  StatusDonut,
  VerticalBars,
} from "@/components/app/charts/charts";
import { CHART } from "@/lib/analytics/chart-theme";
import type { BillingAnalytics } from "@/lib/analytics/series";
import { api } from "@/lib/api-client";

export function BillingCharts({ initialData }: { initialData?: BillingAnalytics }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    api.getAnalyticsBilling().then(setData).catch(() => {});
  }, [initialData]);

  if (!data) return null;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ChartCard
        title="Revenue trend"
        description="Invoice subtotals (₹)"
        demo={data.demoSeries}
        className="md:col-span-2"
      >
        <AreaTrend
          labels={data.revenueByMonth.map((m) => m.month)}
          series={[{ label: "Revenue", data: data.revenueByMonth.map((m) => m.revenue) }]}
        />
      </ChartCard>
      <ChartCard title="Invoice status" description="Paid vs open" demo={data.demoSeries}>
        <StatusDonut items={data.statusMix} height={200} />
      </ChartCard>
      <ChartCard title="AR aging" description="Outstanding by bucket (₹)" demo={data.demoSeries}>
        <HorizontalBars
          labels={data.arAging.map((a) => a.bucket)}
          values={data.arAging.map((a) => a.amount)}
          height={200}
          color={CHART.warning}
        />
      </ChartCard>
      <ChartCard
        title="Margin bridge"
        description="Revenue to net margin"
        demo={data.demoSeries}
        className="md:col-span-2 xl:col-span-4"
      >
        <VerticalBars
          labels={data.marginBridge.map((m) => m.label)}
          series={[
            {
              label: "Amount (₹)",
              data: data.marginBridge.map((m) => m.value),
              color: CHART.primary,
            },
          ]}
        />
      </ChartCard>
    </div>
  );
}
