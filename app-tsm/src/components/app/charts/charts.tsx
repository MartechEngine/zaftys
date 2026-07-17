"use client";

import {
  BarChart,
  Gauge,
  LineChart,
  PieChart,
  ScatterChart,
  SparkLineChart,
} from "@mui/x-charts";
import { ChartThemeProvider } from "@/components/app/charts/chart-theme-provider";
import { CHART, SERIES_COLORS, STATUS_COLORS } from "@/lib/analytics/chart-theme";

const axisSx = {
  tickLabelStyle: { fill: CHART.axis, fontSize: 11 },
  labelStyle: { fill: CHART.axis },
};

export function ActiveSparkline({
  values,
  height = 36,
  color = CHART.primary,
}: {
  values: number[];
  height?: number;
  color?: string;
}) {
  if (!values.length) return null;
  return (
    <ChartThemeProvider>
      <SparkLineChart
        data={values}
        height={height}
        color={color}
        curve="natural"
        area
        sx={{ width: "100%" }}
      />
    </ChartThemeProvider>
  );
}

export function StatusDonut({
  items,
  height = 220,
}: {
  items: { id: string; label: string; value: number }[];
  height?: number;
}) {
  if (!items.length) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No status data</p>;
  }
  return (
    <ChartThemeProvider>
      <PieChart
        height={height}
        series={[
          {
            data: items.map((item, i) => ({
              id: item.id,
              label: item.label,
              value: item.value,
              color: STATUS_COLORS[item.id] ?? SERIES_COLORS[i % SERIES_COLORS.length],
            })),
            innerRadius: 55,
            outerRadius: 90,
            paddingAngle: 2,
            cornerRadius: 4,
            highlightScope: { fade: "global", highlight: "item" },
          },
        ]}
        slotProps={{
          legend: { direction: "horizontal", position: { vertical: "bottom", horizontal: "center" } },
        }}
      />
    </ChartThemeProvider>
  );
}

export function HorizontalBars({
  labels,
  values,
  height = 260,
  color = CHART.primary,
}: {
  labels: string[];
  values: number[];
  height?: number;
  color?: string;
}) {
  if (!labels.length) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No data</p>;
  }
  return (
    <ChartThemeProvider>
      <BarChart
        layout="horizontal"
        height={height}
        yAxis={[{ data: labels, scaleType: "band", width: 100, ...axisSx }]}
        series={[{ data: values, color, type: "bar" }]}
        margin={{ left: 8, right: 24, top: 8, bottom: 24 }}
        grid={{ vertical: true }}
        sx={{
          "& .MuiChartsGrid-line": { stroke: CHART.grid },
        }}
      />
    </ChartThemeProvider>
  );
}

/** Unassigned aging — time buckets left→right with escalating severity colors. */
export function AgingColumnChart({
  buckets,
}: {
  buckets: { bucket: string; count: number }[];
}) {
  if (!buckets.length || buckets.every((b) => b.count === 0)) {
    return (
      <p className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
        No unassigned loads waiting
      </p>
    );
  }

  const max = Math.max(...buckets.map((b) => b.count), 1);
  const ramp = [CHART.success, CHART.primary, CHART.warning, CHART.danger];
  const labelMap: Record<string, string> = {
    "<1h": "< 1h",
    "1–4h": "1–4h",
    "4–24h": "4–24h",
    ">24h": "> 24h",
  };

  return (
    <div className="flex h-[200px] flex-col">
      <div className="flex flex-1 items-end gap-2.5 px-1 pb-1 pt-2">
        {buckets.map((b, i) => {
          const h = Math.max((b.count / max) * 100, b.count > 0 ? 8 : 0);
          const color = ramp[Math.min(i, ramp.length - 1)];
          return (
            <div key={b.bucket} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <span className="text-xs font-semibold tabular-nums text-heading">
                {b.count > 0 ? b.count : "·"}
              </span>
              <div className="flex h-[120px] w-full items-end justify-center">
                <div
                  className="w-full max-w-[44px] rounded-t-lg transition-[height] duration-500 ease-out"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${color}, ${color}99)`,
                    boxShadow: b.count > 0 ? `0 4px 14px ${color}44` : undefined,
                  }}
                  title={`${labelMap[b.bucket] ?? b.bucket}: ${b.count}`}
                />
              </div>
              <span className="truncate text-[11px] font-medium text-muted-foreground">
                {labelMap[b.bucket] ?? b.bucket}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between gap-1 border-t border-white/[0.06] px-1 pt-2 text-[10px] text-subtle-foreground">
        <span>Fresh</span>
        <span>Aging → escalate</span>
      </div>
    </div>
  );
}

/** Exception reasons — ranked proportional bars (better for long labels than MUI h-bars). */
export function RankedBarList({
  items,
  emptyLabel = "No open exceptions",
  accent = CHART.danger,
}: {
  items: { label: string; value: number }[];
  emptyLabel?: string;
  accent?: string;
}) {
  if (!items.length || items.every((i) => i.value === 0)) {
    return (
      <p className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }

  const max = Math.max(...items.map((i) => i.value), 1);
  const total = items.reduce((s, i) => s + i.value, 0);

  return (
    <ul className="flex min-h-[200px] flex-col justify-center gap-3 py-1">
      {items.map((item, index) => {
        const pct = Math.round((item.value / max) * 100);
        const share = total > 0 ? Math.round((item.value / total) * 100) : 0;
        return (
          <li key={`${item.label}-${index}`} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="min-w-0 truncate text-xs font-medium text-heading" title={item.label}>
                <span className="mr-1.5 tabular-nums text-muted-foreground">{index + 1}.</span>
                {item.label}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                <span className="font-semibold text-heading">{item.value}</span>
                <span className="ml-1 text-[10px]">({share}%)</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${Math.max(pct, item.value > 0 ? 6 : 0)}%`,
                  background: `linear-gradient(90deg, ${accent}aa, ${accent})`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function VerticalBars({
  labels,
  series,
  height = 260,
  stacked,
}: {
  labels: string[];
  series: { label: string; data: number[]; color?: string }[];
  height?: number;
  stacked?: boolean;
}) {
  return (
    <ChartThemeProvider>
      <BarChart
        height={height}
        xAxis={[{ data: labels, scaleType: "band", ...axisSx }]}
        series={series.map((s, i) => ({
          ...s,
          type: "bar" as const,
          color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
          stack: stacked ? "total" : undefined,
        }))}
        margin={{ left: 48, right: 16, top: 16, bottom: 32 }}
        grid={{ horizontal: true }}
        sx={{ "& .MuiChartsGrid-line": { stroke: CHART.grid } }}
      />
    </ChartThemeProvider>
  );
}

export function AreaTrend({
  labels,
  series,
  height = 260,
}: {
  labels: string[];
  series: { label: string; data: number[]; color?: string; area?: boolean }[];
  height?: number;
}) {
  return (
    <ChartThemeProvider>
      <LineChart
        height={height}
        xAxis={[{ data: labels, scaleType: "point", ...axisSx }]}
        series={series.map((s, i) => ({
          label: s.label,
          data: s.data,
          color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
          area: s.area ?? true,
          curve: "natural",
          showMark: false,
        }))}
        margin={{ left: 48, right: 16, top: 16, bottom: 32 }}
        grid={{ horizontal: true }}
        sx={{ "& .MuiChartsGrid-line": { stroke: CHART.grid } }}
      />
    </ChartThemeProvider>
  );
}

export function LineTrend({
  labels,
  values,
  height = 240,
  label = "Value",
  color = CHART.success,
}: {
  labels: string[];
  values: number[];
  height?: number;
  label?: string;
  color?: string;
}) {
  return (
    <ChartThemeProvider>
      <LineChart
        height={height}
        xAxis={[{ data: labels, scaleType: "point", ...axisSx }]}
        series={[{ data: values, label, color, curve: "natural", showMark: true }]}
        margin={{ left: 48, right: 16, top: 16, bottom: 32 }}
        grid={{ horizontal: true }}
        sx={{ "& .MuiChartsGrid-line": { stroke: CHART.grid } }}
      />
    </ChartThemeProvider>
  );
}

export function FillGauge({
  value,
  height = 160,
  color = CHART.primary,
}: {
  value: number;
  height?: number;
  color?: string;
}) {
  return (
    <ChartThemeProvider>
      <Gauge
        height={height}
        value={Math.min(100, Math.max(0, value))}
        startAngle={-110}
        endAngle={110}
        cornerRadius="50%"
        sx={{
          "& .MuiGauge-valueText": { fontSize: 28, fill: CHART.tooltipText },
          "& .MuiGauge-valueArc": { fill: color },
          "& .MuiGauge-referenceArc": { fill: CHART.grid },
        }}
        text={({ value: v }) => `${v ?? 0}%`}
      />
    </ChartThemeProvider>
  );
}

export function ScatterPlot({
  points,
  height = 260,
}: {
  points: { id: string; x: number; y: number; label?: string }[];
  height?: number;
}) {
  if (!points.length) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No data</p>;
  }
  return (
    <ChartThemeProvider>
      <ScatterChart
        height={height}
        series={[
          {
            label: "Drivers",
            data: points.map((p) => ({ x: p.x, y: p.y, id: p.id })),
            color: CHART.primary,
          },
        ]}
        xAxis={[{ label: "Trips", min: 0, ...axisSx }]}
        yAxis={[{ label: "Rating", min: 0, max: 5, ...axisSx }]}
        margin={{ left: 56, right: 16, top: 16, bottom: 48 }}
        grid={{ horizontal: true, vertical: true }}
        sx={{ "& .MuiChartsGrid-line": { stroke: CHART.grid } }}
      />
    </ChartThemeProvider>
  );
}
