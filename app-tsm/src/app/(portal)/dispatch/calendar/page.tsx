import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import type { ShipmentStatus } from "@/lib/constants";
import { getDispatchCalendar } from "@/lib/dispatch/calendar";
import { DISPATCH_NAV } from "@/lib/module-nav";
import { RescheduleShipmentButton } from "@/components/app/sprint17-forms";

export default async function DispatchCalendarPage() {
  const events = await getDispatchCalendar();

  return (
    <>
      <PageHeader
        title="Scheduler"
        description={`${events.length} planned dispatch${events.length === 1 ? "" : "es"} from live shipments`}
      />
      <ModuleSubNav links={DISPATCH_NAV} />
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No scheduled dispatches right now.</p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <Card key={e.id}>
              <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href={`/shipments/${e.shipmentId}`}
                    className="font-mono text-sm font-medium text-link hover:underline"
                  >
                    {e.shipment}
                  </Link>
                  <p className="text-sm text-muted-foreground">{e.route}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span>
                    <span className="font-medium">{e.date}</span> · {e.time} · {e.driver}
                  </span>
                  <ShipmentStatusChip status={e.status as ShipmentStatus} />
                  <RescheduleShipmentButton shipmentId={e.shipmentId} eta={e.time} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm">
        <Link href="/dispatch" className="text-link hover:underline">
          ← Dispatch board
        </Link>
      </p>
    </>
  );
}
