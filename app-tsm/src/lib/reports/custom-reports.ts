import { getOperationsReport, getDriverScorecards } from "@/lib/reports/operations-report";
import { getFleetUtilizationReport } from "@/lib/reports/fleet-report";
import { listInvoices } from "@/lib/billing/invoice-repository";
import {
  createStoredCustomReport,
  listStoredCustomReports,
} from "@/lib/mutations/fleet-entity-store";

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

  const catalog: CustomReportDefinition[] = [
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

  return [...listStoredCustomReports(), ...catalog];
}

export function validateCreateCustomReportInput(
  body: unknown,
): { name: string; description?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return { error: "Report name is required." };
  return {
    name,
    description: String(data.description ?? "").trim() || undefined,
  };
}

export async function createCustomReport(input: {
  name: string;
  description?: string;
}) {
  return createStoredCustomReport(input);
}

export async function runCustomReport(id: string) {
  const reports = await listCustomReportDefinitions();
  const report = reports.find((r) => r.id === id);
  if (!report) return null;
  if (report.status !== "ready") {
    return { error: "Report is not ready to run." as const };
  }

  const { recordCustomReportRun } = await import("@/lib/mutations/sprint10-store");
  const run = recordCustomReportRun({
    reportId: report.id,
    name: report.name,
    metric: report.metric,
  });
  return { report, run };
}
