import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listFleetIssues } from "@/lib/fleet/compliance-repository";
import { FLEET_NAV } from "@/lib/module-nav";

const severityMap = {
  high: { label: "High", className: "bg-red-100 text-red-800" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-800" },
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
};

export default async function FleetIssuesPage() {
  const issues = await listFleetIssues();

  return (
    <>
      <PageHeader
        title="Issues & faults"
        description="Driver-reported defects and linked maintenance faults"
      />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={issues}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "driver", header: "Driver", render: (r) => r.driver },
          { key: "issue", header: "Issue", render: (r) => r.issue },
          { key: "reported", header: "Reported", render: (r) => r.reported },
          {
            key: "severity",
            header: "Severity",
            render: (r) => <StatusPill status={r.severity} map={severityMap} />,
          },
          { key: "source", header: "Source", render: (r) => r.source },
        ]}
      />
    </>
  );
}
