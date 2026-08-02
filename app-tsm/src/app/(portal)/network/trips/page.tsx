import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { TripsDesk } from "@/components/app/trips-desk";
import { NETWORK_NAV } from "@/lib/module-nav";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";

export default function NetworkTripsPage() {
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  return (
    <>
      <PageHeader
        title="Trips"
        description="Same supplier trips as TranZfort — read-through after booking Approve"
        eyebrow="Marketplace"
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {live ? (
        <HonestyNotice title="Live trips">
          Listing comes from TranZfort for the linked supplier. Advancing stages, POD, and chat stay
          in the TranZfort app for now.
        </HonestyNotice>
      ) : (
        <HonestyNotice title="Mock trips desk">
          Showing sample trips. Add Supabase keys and set bridge to{" "}
          <code className="text-xs">live</code> for real Tabish trips.
        </HonestyNotice>
      )}

      <div className="mt-4">
        <TripsDesk />
      </div>
    </>
  );
}
