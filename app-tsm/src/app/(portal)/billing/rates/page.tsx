import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoServiceRates } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function BillingRatesPage() {
  return (
    <>
      <PageHeader title="Service rates" description="Pricing rules by lane, weight, and zone" action={<Button variant="accent">Add rate</Button>} />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={demoServiceRates}
        columns={[
          { key: "name", header: "Rate", render: (r) => <Link href={`/billing/rates/${r.id}`} className="font-medium text-link font-medium">{r.name}</Link> },
          { key: "basis", header: "Basis", render: (r) => r.basis },
          { key: "rate", header: "Rate", render: (r) => r.rate },
          { key: "minCharge", header: "Min charge", render: (r) => r.minCharge },
        ]}
      />
    </>
  );
}
