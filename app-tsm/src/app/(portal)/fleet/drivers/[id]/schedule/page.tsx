import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoCalendarEvents } from "@/lib/demo-data";
import { listDrivers } from "@/lib/data/shipment-repository";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function DriverSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const driver = (await listDrivers()).find((d) => d.id === id);
  if (!driver) notFound();

  const events = demoCalendarEvents.filter((e) => e.driver.includes(driver.name.split(" ").pop() ?? ""));

  return (
    <>
      <PageHeader title="Driver schedule" description={driver.name} />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="space-y-3">
        {(events.length ? events : demoCalendarEvents.slice(0, 2)).map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4 text-sm">
              <p className="font-mono font-medium text-navy">{e.shipment}</p>
              <p className="text-muted-foreground">{e.route} · {e.date} {e.time}</p>
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
