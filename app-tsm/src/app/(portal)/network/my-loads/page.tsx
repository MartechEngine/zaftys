import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { MyLoadsDesk } from "@/components/app/my-loads-desk";
import { NETWORK_NAV } from "@/lib/module-nav";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";

export default function NetworkMyLoadsPage() {
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  return (
    <>
      <PageHeader
        title="My Loads"
        description="Same marketplace loads as TranZfort — read-through, not a second database"
        eyebrow="Marketplace"
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {live ? (
        <HonestyNotice title="Live My Loads">
          Listing comes from TranZfort for the linked supplier. Use <strong>Cancel</strong> on an
          active listing to take it off the marketplace (pending bookings are superseded).
        </HonestyNotice>
      ) : (
        <HonestyNotice title="Mock My Loads desk">
          Showing sample history plus any TSM mock publishes. Add Supabase keys and set bridge to{" "}
          <code className="text-xs">live</code> for real Tabish loads.
        </HonestyNotice>
      )}

      <div className="mt-4">
        <MyLoadsDesk />
      </div>
    </>
  );
}
