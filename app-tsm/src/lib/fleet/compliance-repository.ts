import { demoComplianceDocs, demoFleetIssues } from "@/lib/demo-data";
import { listVehicles } from "@/lib/data/shipment-repository";
import { listFaultReports } from "@/lib/maintenance/fault-repository";

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

  const merged = [...demoComplianceDocs, ...fromVehicles];
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

export async function listFleetIssues(): Promise<FleetIssue[]> {
  const faults = await listFaultReports({ status: "active" });
  const fromFaults: FleetIssue[] = faults.map((f) => ({
    id: f.id,
    vehicle: f.vehicle,
    driver: f.driver,
    issue: f.issue,
    severity: f.status === "open" ? ("high" as const) : ("medium" as const),
    reported: f.reported,
    source: "maintenance" as const,
  }));

  const fromDemo: FleetIssue[] = demoFleetIssues.map((f) => ({
    ...f,
    source: "navigator" as const,
  }));

  const seen = new Set<string>();
  return [...fromDemo, ...fromFaults].filter((f) => {
    if (seen.has(f.id)) return false;
    seen.add(f.id);
    return true;
  });
}
