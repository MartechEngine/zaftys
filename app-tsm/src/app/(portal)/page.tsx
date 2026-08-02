import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, KpiCard, SectionCard } from "@/components/app/app-shell";
import { SyncStatusBanner } from "@/components/app/sync-status-banner";
import { CommandCenterMap } from "@/components/app/command-center-map";
import {
  CommandCenterActivityFeed,
  CommandCenterExceptionQueue,
} from "@/components/app/command-center-live-panels";
import { getCommandCenterAnalytics } from "@/lib/analytics/series";
import { CommandCenterCharts } from "@/components/app/charts/command-center-charts";
import { getExceptions, getKpis, listActivities, listShipments } from "@/lib/data/shipment-repository";
import { Button } from "@/components/ui/button";

export default async function CommandCenterPage() {
  const [kpis, exceptions, analytics] = await Promise.all([
    getKpis(),
    getExceptions(),
    getCommandCenterAnalytics(),
  ]);
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
        <KpiCard
          label="Active trips"
          value={kpis.activeTrips}
          href="/shipments?tab=active"
          sparklineValues={analytics.activeTripsSpark.values}
        />
        <KpiCard
          label="Exceptions"
          value={kpis.exceptions}
          href="/shipments?tab=exceptions"
          variant="warning"
          delta={kpis.exceptions > 0 ? `${kpis.exceptions} open` : undefined}
          deltaUp={false}
          sparklineValues={analytics.exceptionsSpark.values}
        />
        <KpiCard label="At plant" value={kpis.atPlant} showSparkline={false} />
        <KpiCard
          label="TranZfort posts"
          value={kpis.outboundOpenPosts || kpis.networkOverflow}
          href="/network/overflow"
          showSparkline={false}
          delta={
            kpis.outboundOffersWaiting > 0
              ? `${kpis.outboundOffersWaiting} offers waiting`
              : kpis.inboundOverflow > 0
                ? `${kpis.inboundOverflow} inbound`
                : undefined
          }
        />
      </div>

      <CommandCenterCharts initialData={analytics} />

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

        <CommandCenterExceptionQueue
          initialExceptions={exceptions}
          initialKpis={{
            outboundOpenPosts: kpis.outboundOpenPosts,
            outboundOffersWaiting: kpis.outboundOffersWaiting,
            inboundOverflow: kpis.inboundOverflow,
          }}
        />
      </div>

      <CommandCenterActivityFeed initialActivities={activities} />
    </>
  );
}
