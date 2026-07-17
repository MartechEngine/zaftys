import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoOrderTypes } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default async function OrderTypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ot = demoOrderTypes.find((o) => o.id === id);
  if (!ot) notFound();

  return (
    <>
      <PageHeader title={ot.name} description="Status flow and custom fields" action={
        <Button variant="outline" asChild>
          <Link href={`/settings/order-types/${id}/flow`}>Edit flow</Link>
        </Button>
      } />
      <SettingsNav />
      <div className="mb-4 flex gap-2 text-sm">
        <Link href={`/settings/order-types/${id}/flow`} className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80">Flow designer</Link>
        <Link href={`/settings/order-types/${id}/fields`} className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80">Custom fields</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Status flow</h3>
            <p className="mt-2 text-muted-foreground">pending → dispatched → at_plant → in_transit → at_weighbridge → delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Custom fields</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>LR number · text · required</li>
              <li>Tonnage (MT) · number · required</li>
              <li>e-way bill · text · optional</li>
              <li>Weighbridge slip · file · optional</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/settings/order-types" className="text-link hover:underline">← Order types</Link>
      </p>
    </>
  );
}
