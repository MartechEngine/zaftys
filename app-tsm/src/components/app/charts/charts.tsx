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
        yAxis={[{ data: labels, scaleType: "band", ...axisSx }]}
        series={[{ data: values, color, type: "bar" }]}
        margin={{ left: 120, right: 16, top: 8, bottom: 24 }}
        grid={{ vertical: true }}
        sx={{
          "& .MuiChartsGrid-line": { stroke: CHART.grid },
        }}
      />
    </ChartThemeProvider>
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
