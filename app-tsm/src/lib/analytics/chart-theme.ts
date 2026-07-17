/** Chart color tokens aligned to ZAFTYS portal (avoid default MUI purple). */

export const CHART = {
  primary: "#5B9BD5",
  primarySoft: "#7BA3D4",
  success: "#3DCFB0",
  warning: "#E8B84A",
  danger: "#F07167",
  muted: "#8B95A8",
  network: "#7BA3D4",
  fleet: "#5B9BD5",
  axis: "#8B95A8",
  grid: "rgba(255,255,255,0.08)",
  tooltipBg: "rgba(18, 24, 38, 0.96)",
  tooltipText: "#E8EEF7",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  pending: CHART.muted,
  dispatched: CHART.primary,
  at_plant: CHART.warning,
  in_transit: CHART.success,
  at_weighbridge: CHART.primarySoft,
  delivered: CHART.success,
  cancelled: CHART.muted,
  exception: CHART.danger,
};

export const SERIES_COLORS = [
  CHART.primary,
  CHART.success,
  CHART.warning,
  CHART.network,
  CHART.danger,
  CHART.muted,
];
