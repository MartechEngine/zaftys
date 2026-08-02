import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, HubCard, StatusPill } from "@/components/app/data-table";
import { getMaintenanceSummary } from "@/lib/maintenance/work-order-repository";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { CreateWorkOrderForm } from "@/components/app/create-work-order-form";
import { listVehicles } from "@/lib/data/shipment-repository";
import { listVendors } from "@/lib/vendors/vendor-repository";

const woStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default async function MaintenancePage() {
  const [summary, vehicles, vendors] = await Promise.all([
    getMaintenanceSummary(),
    listVehicles(),
    listVendors(),
  ]);

  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Work orders, schedules, and parts"
        action={
          <CreateWorkOrderForm
            vehicles={vehicles.map((v) => v.registration)}
            vendors={vendors.map((v) => v.name)}
          />
        }
      />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <HubCard
          href="/maintenance/schedules"
          title="Schedules"
          description="Preventive maintenance"
          stat={`${summary.scheduleCount} due`}
        />
        <HubCard
          href="/maintenance/work-orders"
          title="Work orders"
          description="Open jobs"
          stat={`${summary.openWorkOrders} open`}
        />
        <HubCard
          href="/maintenance/parts"
          title="Parts"
          description="Inventory"
          stat={`${summary.partsSkuCount} SKUs`}
        />
      </div>
      {summary.openFaults > 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          {summary.openFaults} open fault report{summary.openFaults === 1 ? "" : "s"} ·{" "}
          <Link href="/maintenance/faults" className="text-link hover:underline">
            View faults
          </Link>
        </p>
      )}
      <h2 className="mb-3 text-lg font-semibold text-navy">Recent work orders</h2>
      <DataTable
        rows={summary.recentWorkOrders}
        emptyMessage="No work orders yet. Create a job from Maintenance or link a fault."
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          {
            key: "title",
            header: "Job",
            render: (r) => (
              <Link href={`/maintenance/work-orders/${r.id}`} className="font-medium text-link">
                {r.title}
              </Link>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={woStatus} />,
          },
          { key: "due", header: "Due", render: (r) => r.due },
          { key: "cost", header: "Est. cost", render: (r) => r.cost },
        ]}
      />
    </>
  );
}
