import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { CreateWorkOrderForm } from "@/components/app/create-work-order-form";
import { listWorkOrders } from "@/lib/maintenance/work-order-repository";
import { listVendors } from "@/lib/vendors/vendor-repository";
import { listVehicles } from "@/lib/data/shipment-repository";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { WorkOrderStatusActions } from "@/components/app/sprint14-forms";

const woStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default async function WorkOrdersPage() {
  const [workOrders, vendors, vehicles] = await Promise.all([
    listWorkOrders(),
    listVendors(),
    listVehicles(),
  ]);

  return (
    <>
      <PageHeader
        title="Work orders"
        description="Maintenance jobs across the fleet"
        action={
          <CreateWorkOrderForm
            vehicles={vehicles.map((v) => v.registration)}
            vendors={vendors.map((v) => v.name)}
          />
        }
      />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={workOrders}
        emptyMessage="No work orders yet. Create a maintenance job for a vehicle."
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
          { key: "vendor", header: "Vendor", render: (r) => r.vendor },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={woStatus} />,
          },
          { key: "due", header: "Due", render: (r) => r.due },
          { key: "cost", header: "Est. cost", render: (r) => r.cost },
          {
            key: "actions",
            header: "",
            render: (r) => <WorkOrderStatusActions id={r.id} status={r.status} />,
          },
        ]}
      />
    </>
  );
}
