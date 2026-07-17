import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, HubCard, StatusPill } from "@/components/app/data-table";
import { demoWorkOrders } from "@/lib/demo-data";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const woStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default function MaintenancePage() {
  const openCount = demoWorkOrders.filter((w) => w.status !== "resolved").length;

  return (
    <>
      <PageHeader title="Maintenance" description="Work orders, schedules, and parts" action={<Button variant="accent">New work order</Button>} />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <HubCard href="/maintenance/schedules" title="Schedules" description="Preventive maintenance" stat="12 due" />
        <HubCard href="/maintenance/work-orders" title="Work orders" description="Open jobs" stat={`${openCount} open`} />
        <HubCard href="/maintenance/parts" title="Parts" description="Inventory" stat="48 SKUs" />
      </div>
      <h2 className="mb-3 text-lg font-semibold text-navy">Recent work orders</h2>
      <DataTable
        rows={demoWorkOrders}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "title", header: "Job", render: (r) => <Link href={`/maintenance/work-orders/${r.id}`} className="text-link font-medium">{r.title}</Link> },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={woStatus} /> },
          { key: "due", header: "Due", render: (r) => r.due },
          { key: "cost", header: "Est. cost", render: (r) => r.cost },
        ]}
      />
    </>
  );
}
