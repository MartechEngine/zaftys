import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { LiveMapPageClient } from "@/components/app/live-map-page-client";
import { listShipments } from "@/lib/data/shipment-repository";
import { Button } from "@/components/ui/button";

export default async function LiveMapPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const dispatchMode = mode === "dispatch";
  const shipments = await listShipments({ tab: dispatchMode ? undefined : "active" });
  const display = dispatchMode
    ? shipments.filter((s) => ["pending", "dispatched", "in_transit", "exception"].includes(s.status))
    : shipments;

  return (
    <>
      <PageHeader
        title={dispatchMode ? "Dispatch map" : "Live map"}
        description={
          dispatchMode
            ? "Unassigned and in-progress orders on the map"
            : process.env.TSM_DEMO_UI === "0"
              ? "Fleet positions from Fleetbase when GPS is available; no simulated motion"
              : "Demo GPS along corridor routes — set TSM_DEMO_UI=0 for live Fleetbase positions"
        }
        action={
          <div className="flex gap-2">
            <Button variant={dispatchMode ? "outline" : "accent"} size="sm" asChild>
              <Link href="/map">Live</Link>
            </Button>
            <Button variant={dispatchMode ? "accent" : "outline"} size="sm" asChild>
              <Link href="/map?mode=dispatch">Dispatch</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/map/replay">Replay</Link>
            </Button>
          </div>
        }
      />
      <LiveMapPageClient
        initialShipments={display.map((s) => ({
          id: s.id,
          publicId: s.publicId,
          status: s.status,
          originType: s.originType,
          vehicle: s.vehicle,
          driver: s.driver,
          geo: s.geo,
        }))}
      />
    </>
  );
}
