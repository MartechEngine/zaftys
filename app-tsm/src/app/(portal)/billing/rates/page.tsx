import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { CreateRateForm } from "@/components/app/create-rate-form";
import { listServiceRates } from "@/lib/billing/rates-repository";
import { BILLING_NAV } from "@/lib/module-nav";

export default async function BillingRatesPage() {
  const rates = await listServiceRates();

  return (
    <>
      <PageHeader
        title="Service rates"
        description="Pricing rules by lane, weight, and zone"
        action={<CreateRateForm />}
      />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={rates}
        columns={[
          {
            key: "name",
            header: "Rate",
            render: (r) => (
              <Link href={`/billing/rates/${r.id}`} className="font-medium text-link">
                {r.name}
              </Link>
            ),
          },
          { key: "basis", header: "Basis", render: (r) => r.basis },
          { key: "rate", header: "Rate", render: (r) => r.rate },
          { key: "minCharge", header: "Min charge", render: (r) => r.minCharge },
          { key: "shipments", header: "Matching trips", render: (r) => r.shipmentCount },
        ]}
      />
    </>
  );
}
