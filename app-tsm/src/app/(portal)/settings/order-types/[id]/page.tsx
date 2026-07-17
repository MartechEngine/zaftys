import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { SettingsNav } from "@/components/app/settings-nav";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { getOrderType } from "@/lib/settings/order-types-repository";
import { Button } from "@/components/ui/button";

export default async function OrderTypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderType(id);
  if (!result) notFound();

  const { orderType, statusFlow, customFields, recentShipments } = result;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Settings", href: "/settings" },
          { label: "Order types", href: "/settings/order-types" },
          { label: orderType.name },
        ]}
      />
      <PageHeader
        title={orderType.name}
        description="Status flow and custom fields"
        action={
          <Button variant="outline" asChild>
            <Link href={`/settings/order-types/${id}/flow`}>Edit flow</Link>
          </Button>
        }
      />
      <SettingsNav />
      <div className="mb-4 flex gap-2 text-sm">
        <Link
          href={`/settings/order-types/${id}/flow`}
          className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80"
        >
          Flow designer
        </Link>
        <Link
          href={`/settings/order-types/${id}/fields`}
          className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80"
        >
          Custom fields
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Status flow</h3>
            <p className="mt-2 text-muted-foreground">{statusFlow}</p>
            <p className="mt-3 text-muted-foreground">
              {orderType.activeShipments} active shipment
              {orderType.activeShipments === 1 ? "" : "s"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Custom fields</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {customFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      {recentShipments.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Recent shipments</h3>
            <ul className="mt-3 divide-y divide-border text-sm">
              {recentShipments.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2">
                  <Link href={`/shipments/${s.id}`} className="text-link hover:underline">
                    {s.publicId}
                  </Link>
                  <ShipmentStatusChip status={s.status} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      <p className="mt-4 text-sm">
        <Link href="/settings/order-types" className="text-link hover:underline">
          ← Order types
        </Link>
      </p>
    </>
  );
}
