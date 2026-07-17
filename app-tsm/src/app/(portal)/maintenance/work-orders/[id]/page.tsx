import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/app/data-table";
import { getWorkOrder } from "@/lib/maintenance/work-order-repository";
import { listVendors } from "@/lib/vendors/vendor-repository";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { WorkOrderStatusActions } from "@/components/app/work-order-status-actions";

const woStatus = {
  open: { label: "Open", className: "bg-amber-100 text-amber-800" },
  in_progress: { label: "In progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-800" },
};

export default async function WorkOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wo = await getWorkOrder(id);
  if (!wo) notFound();

  const vendors = await listVendors();
  const vendor = vendors.find((v) => v.name === wo.vendor);

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Maintenance", href: "/maintenance" },
          { label: "Work orders", href: "/maintenance/work-orders" },
          { label: wo.title },
        ]}
      />
      <PageHeader
        title={wo.title}
        description={`${wo.vehicle} · ${wo.vendor}`}
        action={<WorkOrderStatusActions id={wo.id} status={wo.status} />}
      />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-2 p-5 text-sm">
            <p>
              <span className="text-muted-foreground">Status</span> ·{" "}
              <StatusPill status={wo.status} map={woStatus} />
            </p>
            <p>
              <span className="text-muted-foreground">Due</span> · {wo.due}
            </p>
            <p>
              <span className="text-muted-foreground">Est. cost</span> · {wo.cost}
            </p>
            <p>
              <span className="text-muted-foreground">Notes</span> · {wo.notes}
            </p>
            {vendor && (
              <p>
                <span className="text-muted-foreground">Vendor</span> ·{" "}
                <Link href={`/vendors/${vendor.id}`} className="text-link hover:underline">
                  {vendor.name}
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Parts & labor</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>Parts estimate · {formatInr(Math.round(wo.costInr * 0.65))}</li>
              <li>Labor estimate · {formatInr(Math.round(wo.costInr * 0.35))}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/maintenance/work-orders" className="text-link hover:underline">
          ← Work orders
        </Link>
      </p>
    </>
  );
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
