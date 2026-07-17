import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoCalendarEvents } from "@/lib/demo-data";
import { DISPATCH_NAV } from "@/lib/module-nav";

export default function DispatchCalendarPage() {
  return (
    <>
      <PageHeader title="Scheduler" description="Planned dispatches and delivery windows" />
      <ModuleSubNav links={DISPATCH_NAV} />
      <div className="space-y-3">
        {demoCalendarEvents.map((e) => (
          <Card key={e.id}>
            <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-sm font-medium text-navy">{e.shipment}</p>
                <p className="text-sm text-muted-foreground">{e.route}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">{e.date}</span> · {e.time} · {e.driver}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link href="/dispatch" className="text-link hover:underline">← Dispatch board</Link>
      </p>
    </>
  );
}
