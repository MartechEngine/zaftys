import { getOperationsReport, getDriverScorecards } from "@/lib/reports/operations-report";
import { getFleetUtilizationReport } from "@/lib/reports/fleet-report";
import { listInvoices } from "@/lib/billing/invoice-repository";

export type CustomReportDefinition = {
  id: string;
  name: string;
  description: string;
  href: string;
  metric: string;
  status: "ready" | "planned";
};

export async function listCustomReportDefinitions(): Promise<CustomReportDefinition[]> {
  const [ops, drivers, fleet, invoices] = await Promise.all([
    getOperationsReport(),
    getDriverScorecards(),
    getFleetUtilizationReport(),
    listInvoices(),
  ]);

  return [
    {
      id: "cr-ops",
      name: "Operations summary",
      description: "Trips, on-time %, exceptions, corridors",
      href: "/reports/operations",
      metric: `${ops.totalTrips} trips · ${ops.onTimePercent}% on-time`,
      status: "ready",
    },
    {
      id: "cr-drivers",
      name: "Driver scorecards",
      description: "Trips, on-time, safety rating",
      href: "/reports/drivers",
      metric: `${drivers.length} drivers scored`,
      status: "ready",
    },
    {
      id: "cr-fleet",
      name: "Fleet utilization",
      description: "Asset usage and idle time",
      href: "/reports/fleet",
      metric: `${fleet.utilizationPercent}% utilization`,
      status: "ready",
    },
    {
      id: "cr-billing",
      name: "Billing & GST pack",
      description: "Invoices pending and paid",
      href: "/billing/gst",
      metric: `${invoices.length} invoices`,
      status: "ready",
    },
    {
      id: "cr-builder",
      name: "Drag-and-drop builder",
      description: "Custom columns + scheduled email delivery",
      href: "/settings/reports",
      metric: "P5",
      status: "planned",
    },
  ];
}
