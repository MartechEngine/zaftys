import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, HubCard, StatusPill } from "@/components/app/data-table";
import { demoInvoices } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const invStatus = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
};

export default function BillingPage() {
  return (
    <>
      <PageHeader title="Billing" description="Trip charges, GST invoices, and rates" action={<Button variant="accent">Create invoice</Button>} />
      <ModuleSubNav links={BILLING_NAV} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <HubCard href="/billing/invoices" title="Invoices" description="GST billing documents" stat={`${demoInvoices.length} recent`} />
        <HubCard href="/billing/rates" title="Service rates" description="Lane & tonnage rules" stat="4 rules" />
        <HubCard href="/billing/gst" title="GST reports" description="GSTR exports" stat="Jul 2026" />
      </div>
      <h2 className="mb-3 text-lg font-semibold text-navy">Recent invoices</h2>
      <DataTable
        rows={demoInvoices}
        columns={[
          { key: "number", header: "Invoice", render: (r) => <span className="font-mono">{r.number}</span> },
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
