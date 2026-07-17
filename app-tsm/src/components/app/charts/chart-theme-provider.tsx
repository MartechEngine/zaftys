"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { CHART } from "@/lib/analytics/chart-theme";

const chartTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: CHART.primary },
    success: { main: CHART.success },
    warning: { main: CHART.warning },
    error: { main: CHART.danger },
    text: { primary: CHART.tooltipText, secondary: CHART.axis },
    background: { paper: CHART.tooltipBg, default: "transparent" },
    divider: CHART.grid,
  },
  typography: {
    fontFamily: "inherit",
    fontSize: 12,
  },
});

export function ChartThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={chartTheme}>{children}</ThemeProvider>;
}
