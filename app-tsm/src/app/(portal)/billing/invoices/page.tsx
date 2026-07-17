import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listInvoices } from "@/lib/billing/invoice-repository";
import { BILLING_NAV } from "@/lib/module-nav";
import { CreateInvoiceForm } from "@/components/app/create-invoice-form";
import { InvoiceStatusActions } from "@/components/app/sprint14-forms";

const invStatus = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
};

export default async function BillingInvoicesPage() {
  const invoices = await listInvoices();

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Billing documents with GST breakdown"
        action={<CreateInvoiceForm />}
      />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={invoices}
        columns={[
          {
            key: "number",
            header: "Invoice",
            render: (r) => (
              <Link href={`/billing/invoices/${r.id}`} className="font-mono text-link hover:underline">
                {r.number}
              </Link>
            ),
          },
          { key: "client", header: "Client", render: (r) => r.client },
          { key: "amount", header: "Amount", render: (r) => r.amount },
          { key: "gst", header: "GST", render: (r) => r.gst },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={invStatus} />,
          },
          { key: "due", header: "Due", render: (r) => r.due },
          {
            key: "actions",
            header: "",
            render: (r) => <InvoiceStatusActions id={r.id} status={r.status} />,
          },
        ]}
      />
    </>
  );
}
