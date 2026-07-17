import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoice } from "@/lib/billing/invoice-repository";
import { BILLING_NAV } from "@/lib/module-nav";
import { InvoiceStatusActions } from "@/components/app/invoice-status-actions";
import { InvoicePdfButton } from "@/components/app/sprint8-forms";

const invStatus = {
  pending: { label: "Pending", className: "bg-amber-500/15 text-amber-200" },
  paid: { label: "Paid", className: "bg-emerald-500/15 text-emerald-300" },
};

export default async function BillingInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) notFound();

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Billing", href: "/billing" },
          { label: "Invoices", href: "/billing/invoices" },
          { label: invoice.number },
        ]}
      />
      <PageHeader
        title={invoice.number}
        description={`${invoice.client} · due ${invoice.due}`}
        action={
          <div className="flex gap-2">
            <InvoicePdfButton invoiceId={invoice.id} number={invoice.number} />
            <InvoiceStatusActions id={invoice.id} status={invoice.status} />
          </div>
        }
      />
      <ModuleSubNav links={BILLING_NAV} />
      <div className="mb-4">
        <StatusPill status={invoice.status} map={invStatus} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Line items</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              rows={invoice.lineItems.map((line, idx) => ({ id: `line-${idx}`, ...line }))}
              columns={[
                { key: "description", header: "Description", render: (r) => r.description },
                { key: "amount", header: "Amount", render: (r) => r.amount },
              ]}
            />
            {invoice.shipmentId && (
              <p className="mt-4 text-sm">
                <Link href={`/shipments/${invoice.shipmentId}`} className="text-link hover:underline">
                  View shipment →
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>GST summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{invoice.subtotalInr.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>{invoice.gst}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
              <span>Total</span>
              <span>{invoice.amount}</span>
            </div>
            <p className="pt-2 text-xs text-muted-foreground">
              GSTIN 27AABCU9603R1ZM · Place of supply Maharashtra
            </p>
          </CardContent>
        </Card>
      </div>
      <p className="mt-6 text-sm">
        <Link href="/billing/invoices" className="text-link hover:underline">
          ← Invoices
        </Link>
      </p>
    </>
  );
}
