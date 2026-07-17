import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoFaultReports } from "@/lib/demo-data";
import { MAINTENANCE_NAV } from "@/lib/module-nav";

const faultStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  linked: { label: "Work order linked", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default function MaintenanceFaultsPage() {
  return (
    <>
      <PageHeader title="Fault reports" description="Driver-reported issues from Navigator app" />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={demoFaultReports}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "driver", header: "Driver", render: (r) => r.driver },
          { key: "issue", header: "Issue", render: (r) => r.issue },
          { key: "reported", header: "Reported", render: (r) => r.reported },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={faultStatus} /> },
        ]}
      />
    </>
  );
}
