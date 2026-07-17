import Link from "next/link";
import { AlertTriangle, Plus } from "lucide-react";
import { PageHeader, KpiCard, SectionCard } from "@/components/app/app-shell";
import { SyncStatusBanner } from "@/components/app/sync-status-banner";
import { CommandCenterMap } from "@/components/app/command-center-map";
import { AlertRow } from "@/components/app/ui-primitives";
import { getExceptions, getKpis, listActivities, listShipments } from "@/lib/data/shipment-repository";
import { Button } from "@/components/ui/button";

export default async function CommandCenterPage() {
  const [kpis, exceptions] = await Promise.all([getKpis(), getExceptions()]);
  const activities = listActivities();
  const activeShipments = await listShipments({ tab: "active" });

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        title="Command Center"
        description="Live overview of active operations"
        eyebrow={today}
        action={
          <Button variant="accent" size="sm" asChild>
            <Link href="/shipments/new">
              <Plus className="mr-1.5 size-3.5" />
              New shipment
            </Link>
          </Button>
        }
      />
      <SyncStatusBanner />

      <div className="mb-6 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dispatch">Dispatch board</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/network/overflow">Overflow queue</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/map?mode=dispatch">Dispatch map</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active trips" value={kpis.activeTrips} href="/shipments?tab=active" delta="+12%" deltaUp />
        <KpiCard
          label="Exceptions"
          value={kpis.exceptions}
          href="/shipments?tab=exceptions"
          variant="warning"
          delta={kpis.exceptions > 0 ? `${kpis.exceptions} open` : undefined}
          deltaUp={false}
        />
        <KpiCard label="At plant" value={kpis.atPlant} />
        <KpiCard
          label="Network overflow"
          value={kpis.networkOverflow}
          href="/network/overflow"
          showSparkline={kpis.networkOverflow > 0}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <SectionCard
          eyebrow="Live network"
          title="Map preview"
          className="lg:col-span-3"
          action={
            <Link href="/map" className="text-xs text-primary hover:underline">
              Open full map
            </Link>
          }
        >
          <CommandCenterMap
            initialShipments={activeShipments.map((s) => ({
              id: s.id,
              publicId: s.publicId,
              vehicle: s.vehicle,
              driver: s.driver,
              geo: s.geo,
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Signal"
          title="Exception queue"
          className="lg:col-span-2"
          action={
            <Link href="/shipments?tab=exceptions" className="text-xs text-primary hover:underline">
              View all
            </Link>
          }
        >
          <div className="flex flex-col gap-3">
            {exceptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No exceptions — all clear.</p>
            ) : (
              exceptions.map((ex) => (
                <AlertRow
                  key={ex.id}
                  icon={AlertTriangle}
                  tone="destructive"
                  title={ex.publicId}
                  meta={ex.reason}
                  href={`/shipments/${ex.shipmentId}`}
                />
              ))
            )}
          </div>
          {kpis.networkOverflow > 0 && (
            <div className="mt-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
              <div className="text-[10px] tracking-[0.2em] text-primary uppercase">TranZfort network</div>
              <div className="mt-1 font-display text-sm font-semibold text-heading">
                {kpis.networkOverflow} open overflow load{kpis.networkOverflow === 1 ? "" : "s"}
              </div>
              <Button variant="accent" size="sm" className="mt-3" asChild>
                <Link href="/network/overflow">Browse queue</Link>
              </Button>
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard eyebrow="Operations" title="Recent activity" className="mt-5">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {activities.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <Link href={`/shipments/${a.shipmentId}`} className="text-sm font-medium text-link">
                    {a.message}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  );
}
