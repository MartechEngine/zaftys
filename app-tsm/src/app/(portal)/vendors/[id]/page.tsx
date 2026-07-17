import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoVendors, demoWorkOrders } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

const woStatus = {
  open: { label: "Open", className: "bg-orange/15 text-orange" },
  in_progress: { label: "In progress", className: "bg-navy-accent/15 text-navy-bright" },
  resolved: { label: "Resolved", className: "bg-emerald-500/15 text-emerald-300" },
};

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = demoVendors.find((v) => v.id === id);
  if (!vendor) notFound();

  const workOrders = demoWorkOrders.filter((wo) => wo.vendor === vendor.name);

  return (
    <>
      <PageHeader
        title={vendor.name}
        description={`${vendor.type} · ${vendor.city}`}
        action={<Button variant="outline">Edit vendor</Button>}
      />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Phone</span> · {vendor.contact}
            </p>
            <p>
              <span className="text-muted-foreground">City</span> · {vendor.city}
            </p>
            <p>
              <span className="text-muted-foreground">Category</span> · {vendor.type}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Open work orders</span> ·{" "}
              {workOrders.filter((w) => w.status !== "resolved").length}
            </p>
            <p>
              <span className="text-muted-foreground">Total spend (YTD)</span> · ₹46,600
            </p>
          </CardContent>
        </Card>
      </div>
      <h2 className="mb-3 text-sm font-semibold text-navy">Work orders</h2>
      <DataTable
        rows={workOrders}
        emptyMessage="No work orders linked to this vendor."
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "title", header: "Job", render: (r) => r.title },
          { key: "due", header: "Due", render: (r) => r.due },
          { key: "cost", header: "Cost", render: (r) => r.cost },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={woStatus} />,
          },
          {
            key: "link",
            header: "",
            render: (r) => (
              <Link href={`/maintenance/work-orders/${r.id}`} className="text-link text-xs hover:underline">
                View
              </Link>
            ),
          },
        ]}
      />
      <p className="mt-6 text-sm">
        <Link href="/vendors" className="text-link hover:underline">
          ← Vendors
        </Link>
      </p>
    </>
  );
}
