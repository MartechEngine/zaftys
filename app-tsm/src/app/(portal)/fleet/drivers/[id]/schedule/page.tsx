import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getDriverSchedule } from "@/lib/dispatch/calendar";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function DriverSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getDriverSchedule(id);
  if (!result) notFound();

  const { driver, events } = result;

  return (
    <>
      <PageHeader title="Driver schedule" description={driver.name} />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="space-y-3">
        {events.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4 text-sm">
              <Link href={`/shipments/${e.shipmentId}`} className="font-mono font-medium text-link hover:underline">
                {e.shipment}
              </Link>
              <p className="text-muted-foreground">{e.route} · {e.date} {e.time}</p>
              <p className="mt-1 text-xs capitalize text-muted-foreground">Status: {e.status.replace(/_/g, " ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link href={`/fleet/drivers/${id}`} className="text-link hover:underline">← Driver profile</Link>
      </p>
    </>
  );
}
