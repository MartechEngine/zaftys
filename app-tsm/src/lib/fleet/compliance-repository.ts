import { demoComplianceDocs, demoFleetIssues } from "@/lib/demo-data";
import { listVehicles } from "@/lib/data/shipment-repository";
import { listFaultReports } from "@/lib/maintenance/fault-repository";
import {
  createStoredFleetIssue,
  getCompliancePatch,
  isIssueResolved,
  listStoredFleetIssues,
  patchComplianceDoc,
  resolveStoredIssue,
} from "@/lib/mutations/sprint10-store";

export type ComplianceDocStatus = "valid" | "expiring" | "expired";

export type ComplianceDoc = {
  id: string;
  vehicle: string;
  doc: string;
  expires: string;
  status: ComplianceDocStatus;
};

export type FleetIssue = {
  id: string;
  vehicle: string;
  driver: string;
  issue: string;
  severity: "high" | "medium" | "low";
  reported: string;
  source: "navigator" | "maintenance";
  resolved?: boolean;
};

export async function listComplianceDocs(): Promise<ComplianceDoc[]> {
  const vehicles = await listVehicles();
  const fromVehicles: ComplianceDoc[] = vehicles
    .filter((v) => v.docs !== "valid")
    .map((v, index) => ({
      id: `cv-${index}`,
      vehicle: v.registration,
      doc: v.docs === "expired" ? "Registration / permit" : "Document renewal",
      expires: v.docs === "expired" ? "Overdue" : "Within 30 days",
      status: v.docs === "expired" ? ("expired" as const) : ("expiring" as const),
    }));

  const merged = [...demoComplianceDocs, ...fromVehicles].map((d) => {
    const patch = getCompliancePatch(d.id);
    return patch ? { ...d, ...patch } : d;
  });
  const seen = new Set<string>();
  return merged.filter((d) => {
    const key = `${d.vehicle}-${d.doc}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getComplianceSummary() {
  const docs = await listComplianceDocs();
  return {
    total: docs.length,
    needsAttention: docs.filter((d) => d.status !== "valid").length,
    expired: docs.filter((d) => d.status === "expired").length,
    expiring: docs.filter((d) => d.status === "expiring").length,
  };
}

export async function updateComplianceDoc(
  id: string,
  status: ComplianceDocStatus,
): Promise<ComplianceDoc | undefined> {
  const docs = await listComplianceDocs();
  const found = docs.find((d) => d.id === id);
  if (!found) return undefined;
  const expires =
    status === "valid"
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : found.expires;
  patchComplianceDoc(id, { status, expires });
  return { ...found, status, expires };
}

export async function listFleetIssues(includeResolved = false): Promise<FleetIssue[]> {
  const faults = await listFaultReports({ status: "active" });
  const fromFaults: FleetIssue[] = faults.map((f) => ({
    id: f.id,
    vehicle: f.vehicle,
    driver: f.driver,
    issue: f.issue,
    severity: f.status === "open" ? ("high" as const) : ("medium" as const),
    reported: f.reported,
    source: "maintenance" as const,
    resolved: isIssueResolved(f.id),
  }));

  const fromDemo: FleetIssue[] = demoFleetIssues.map((f) => ({
    ...f,
    source: "navigator" as const,
    resolved: isIssueResolved(f.id),
  }));

  const fromStore = listStoredFleetIssues().map((f) => ({
    ...f,
    resolved: isIssueResolved(f.id),
  }));

  const seen = new Set<string>();
  const merged = [...fromStore, ...fromDemo, ...fromFaults].filter((f) => {
    if (seen.has(f.id)) return false;
    seen.add(f.id);
    return true;
  });

  if (includeResolved) return merged;
  return merged.filter((f) => !f.resolved);
}

export function validateCreateIssueInput(
  body: unknown,
):
  | { vehicle: string; driver: string; issue: string; severity: FleetIssue["severity"] }
  | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const vehicle = String(data.vehicle ?? "").trim();
  const driver = String(data.driver ?? "").trim();
  const issue = String(data.issue ?? "").trim();
  const severityRaw = String(data.severity ?? "medium");
  const severity = (["high", "medium", "low"].includes(severityRaw)
    ? severityRaw
    : "medium") as FleetIssue["severity"];
  if (!vehicle) return { error: "Vehicle is required." };
  if (!driver) return { error: "Driver is required." };
  if (!issue) return { error: "Issue description is required." };
  return { vehicle, driver, issue, severity };
}

export async function createFleetIssue(input: {
  vehicle: string;
  driver: string;
  issue: string;
  severity?: FleetIssue["severity"];
}) {
  return createStoredFleetIssue(input);
}

export async function resolveFleetIssue(id: string): Promise<FleetIssue | undefined> {
  const issues = await listFleetIssues(true);
  const found = issues.find((i) => i.id === id);
  if (!found) return undefined;
  resolveStoredIssue(id);
  return { ...found, resolved: true };
}
