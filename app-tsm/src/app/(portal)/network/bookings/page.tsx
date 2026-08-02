import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { BookingInboxDesk } from "@/components/app/booking-inbox-desk";
import { NETWORK_NAV } from "@/lib/module-nav";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";

export default function NetworkBookingsPage() {
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  return (
    <>
      <PageHeader
        title="Booking inbox"
        description="Approve or reject marketplace booking requests on your TranZfort loads"
        eyebrow="Marketplace"
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {live ? (
        <HonestyNotice title="Live TranZfort bookings">
          Pending requests come from TranZfort for the linked supplier (including loads posted from
          TSM). Approve and Reject run through the TSM bridge. Chat and trip tracking stay in the
          TranZfort app.
        </HonestyNotice>
      ) : (
        <HonestyNotice title="Mock booking inbox">
          Sample pending requests for desk QA. Local accept/reject does not write to TranZfort.
          Separate from the local overflow / NetworkOffer desk.
        </HonestyNotice>
      )}

      <div className="mt-4">
        <BookingInboxDesk />
      </div>
    </>
  );
}
