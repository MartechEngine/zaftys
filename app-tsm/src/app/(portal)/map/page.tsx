import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { HonestyNotice } from "@/components/app/honesty-notice";
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
  let shipments: Awaited<ReturnType<typeof listShipments>> = [];
  let degraded = false;
  try {
    shipments = await listShipments({ tab: dispatchMode ? undefined : "active" });
  } catch (e) {
    // Rate-limit / transient Fleetbase: keep map shell, empty pins
    console.warn("[map] degraded:", e instanceof Error ? e.message : e);
    degraded = true;
  }
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
            : process.env.TSM_DEMO_UI === "1"
              ? "Demo GPS along corridor routes — unset TSM_DEMO_UI or set 0 for live Fleetbase"
              : "Fleet positions from Fleetbase when GPS is available; no simulated motion"
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
      {degraded ? (
        <HonestyNotice title="Map data temporarily unavailable.">
          Fleetbase rate-limited or unreachable — showing an empty map. Refresh shortly.
        </HonestyNotice>
      ) : null}
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
