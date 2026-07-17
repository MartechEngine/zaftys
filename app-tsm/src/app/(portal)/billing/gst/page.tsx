import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { demoGstSummary } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const filingStatus = {
  filed: { label: "Filed", className: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
};

export default function BillingGstPage() {
  const s = demoGstSummary;
  return (
    <>
      <PageHeader title="GST reports" description="India compliance — GSTR exports and summaries" action={<Button variant="outline">Export CSV</Button>} />
      <ModuleSubNav links={BILLING_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Period</p><p className="font-semibold text-navy">{s.period}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Taxable value</p><p className="font-semibold text-navy">{s.taxableValue}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">CGST + SGST</p><p className="font-semibold text-navy">{s.cgst} + {s.sgst}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">IGST</p><p className="font-semibold text-navy">{s.igst}</p></CardContent></Card>
      </div>
      <DataTable
        rows={s.filings}
        columns={[
          { key: "return", header: "Return", render: (r) => r.return },
          { key: "period", header: "Period", render: (r) => r.period },
          { key: "due", header: "Due date", render: (r) => r.due },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={filingStatus} /> },
        ]}
      />
    </>
  );
}
