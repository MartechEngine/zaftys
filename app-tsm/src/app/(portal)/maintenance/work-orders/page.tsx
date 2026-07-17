import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoWorkOrders } from "@/lib/demo-data";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const woStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default function WorkOrdersPage() {
  return (
    <>
      <PageHeader title="Work orders" description="Maintenance jobs across the fleet" action={<Button variant="accent">New work order</Button>} />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={demoWorkOrders}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "title", header: "Job", render: (r) => <Link href={`/maintenance/work-orders/${r.id}`} className="font-medium text-link font-medium">{r.title}</Link> },
          { key: "vendor", header: "Vendor", render: (r) => r.vendor },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={woStatus} /> },
          { key: "due", header: "Due", render: (r) => r.due },
          { key: "cost", header: "Est. cost", render: (r) => r.cost },
        ]}
      />
    </>
  );
}
