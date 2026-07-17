import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVendor } from "@/lib/vendors/vendor-repository";
import { EditVendorForm } from "@/components/app/sprint7-forms";

const woStatus = {
  open: { label: "Open", className: "bg-orange/15 text-orange" },
  in_progress: { label: "In progress", className: "bg-navy-accent/15 text-navy-bright" },
  resolved: { label: "Resolved", className: "bg-emerald-500/15 text-emerald-300" },
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getVendor(id);
  if (!result) notFound();

  const { vendor, workOrders } = result;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Vendors", href: "/vendors" },
          { label: vendor.name },
        ]}
      />
      <PageHeader
        title={vendor.name}
        description={`${vendor.type} · ${vendor.city}`}
        action={<EditVendorForm vendor={vendor} />}
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
              {vendor.openWorkOrders}
            </p>
            <p>
              <span className="text-muted-foreground">Total spend (YTD)</span> ·{" "}
              {formatInr(vendor.totalSpendInr)}
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
              <Link
                href={`/maintenance/work-orders/${r.id}`}
                className="text-xs text-link hover:underline"
              >
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
