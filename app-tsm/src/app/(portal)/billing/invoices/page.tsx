import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoInvoices } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const invStatus = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
};

export default function BillingInvoicesPage() {
  return (
    <>
      <PageHeader title="Invoices" description="Billing documents with GST breakdown" action={<Button variant="accent">Create invoice</Button>} />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={demoInvoices}
        columns={[
          { key: "number", header: "Invoice", render: (r) => (
            <Link href={`/billing/invoices/${r.id}`} className="font-mono text-link hover:underline">
              {r.number}
            </Link>
          ) },
          { key: "client", header: "Client", render: (r) => r.client },
          { key: "amount", header: "Amount", render: (r) => r.amount },
          { key: "gst", header: "GST", render: (r) => r.gst },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={invStatus} /> },
          { key: "due", header: "Due", render: (r) => r.due },
        ]}
      />
    </>
  );
}
