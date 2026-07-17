import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceRate } from "@/lib/billing/rates-repository";
import { BILLING_NAV } from "@/lib/module-nav";
import { EditRateForm } from "@/components/app/sprint8-forms";

export default async function BillingRateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getServiceRate(id);
  if (!result) notFound();

  const { rate, appliedShipments } = result;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Billing", href: "/billing" },
          { label: "Rates", href: "/billing/rates" },
          { label: rate.name },
        ]}
      />
      <PageHeader
        title={rate.name}
        description={rate.basis}
        action={<EditRateForm rate={rate} />}
      />
      <ModuleSubNav links={BILLING_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="max-w-lg">
          <CardContent className="space-y-3 p-5 text-sm">
            <p>
              <span className="text-muted-foreground">Rate</span> · {rate.rate}
            </p>
            <p>
              <span className="text-muted-foreground">Minimum charge</span> · {rate.minCharge}
            </p>
            <p>
              <span className="text-muted-foreground">Matching trips</span> · {rate.shipmentCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Applied shipments</h3>
            {appliedShipments.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No matching trips yet.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border text-sm">
                {appliedShipments.map((s) => (
                  <li key={s.id} className="flex items-center justify-between py-2">
                    <Link href={`/shipments/${s.id}`} className="text-link hover:underline">
                      {s.publicId}
                    </Link>
                    <ShipmentStatusChip status={s.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/billing/rates" className="text-link hover:underline">
          ← Service rates
        </Link>
      </p>
    </>
  );
}
