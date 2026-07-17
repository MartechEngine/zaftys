import Link from "next/link";
import { PageHeader, KpiCard } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, HubCard, StatusPill } from "@/components/app/data-table";
import { getBillingSummary } from "@/lib/billing/billing-summary";
import { BILLING_NAV } from "@/lib/module-nav";
import { CreateInvoiceForm } from "@/components/app/create-invoice-form";

const invStatus = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
};

export default async function BillingPage() {
  const summary = await getBillingSummary();

  return (
    <>
      <PageHeader
        title="Billing"
        description="Trip charges, GST invoices, and rates"
        action={<CreateInvoiceForm />}
      />
      <ModuleSubNav links={BILLING_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total invoices" value={summary.invoiceCount} />
        <KpiCard label="Pending" value={summary.pendingCount} variant="warning" />
        <KpiCard label="Outstanding" value={summary.pendingTotal} />
        <KpiCard label="Collected" value={summary.paidTotal} />
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <HubCard
          href="/billing/invoices"
          title="Invoices"
          description="GST billing documents"
          stat={`${summary.invoiceCount} total`}
        />
        <HubCard
          href="/billing/rates"
          title="Service rates"
          description="Lane & tonnage rules"
          stat={`${summary.rateRuleCount} rules`}
        />
        <HubCard href="/billing/gst" title="GST reports" description="GSTR exports" stat="Jul 2026" />
      </div>
      <h2 className="mb-3 text-lg font-semibold text-navy">Recent invoices</h2>
      <DataTable
        rows={summary.recentInvoices}
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
        ]}
      />
    </>
  );
}
