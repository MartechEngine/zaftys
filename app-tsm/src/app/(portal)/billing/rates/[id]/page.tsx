import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoServiceRates } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";

export default async function BillingRateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rate = demoServiceRates.find((r) => r.id === id);
  if (!rate) notFound();

  return (
    <>
      <PageHeader title={rate.name} description={rate.basis} />
      <ModuleSubNav links={BILLING_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Rate</span> · {rate.rate}</p>
          <p><span className="text-muted-foreground">Minimum charge</span> · {rate.minCharge}</p>
          <p><span className="text-muted-foreground">Applied to</span> · Standard freight order type</p>
          <p><span className="text-muted-foreground">Zones</span> · Vidarbha corridor</p>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href="/billing/rates" className="text-link hover:underline">← Service rates</Link>
      </p>
    </>
  );
}
