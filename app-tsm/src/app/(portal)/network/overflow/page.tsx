import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { NetworkCharts } from "@/components/app/charts/network-charts";
import { NetworkOverflowDesk } from "@/components/app/network-overflow-desk";
import { getNetworkAnalytics } from "@/lib/analytics/series";
import { NETWORK_NAV } from "@/lib/module-nav";

export default async function NetworkOverflowPage() {
  const analytics = await getNetworkAnalytics();

  return (
    <>
      <PageHeader
        title="Network overflow"
        description="Inbound marketplace bookings for own-fleet or partner dispatch"
      />
      <ModuleSubNav links={NETWORK_NAV} />
      <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        <p className="font-medium text-amber-50">Outbound vs inbound</p>
        <p className="mt-1 text-amber-100/90">
          Outbound posting to partners is via shipment{" "}
          <strong className="font-medium text-white">Post to TranZfort</strong> / Load Exchange
          listings. This overflow desk is for{" "}
          <strong className="font-medium text-white">inbound</strong> network bookings only.
        </p>
        <p className="mt-2">
          <Link href="/network" className="text-link underline-offset-2 hover:underline">
            Open Network hub
          </Link>
          {" · "}
          <Link href="/shipments" className="text-link underline-offset-2 hover:underline">
            Find a shipment to post
          </Link>
        </p>
      </div>
      <NetworkCharts initialData={analytics} />
      <NetworkOverflowDesk />
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/network" className="text-link hover:underline">
          ← Back to Network
        </Link>
        {" · "}
        <Link href="/network/assignments" className="text-link hover:underline">
          View accepted assignments
        </Link>
      </p>
    </>
  );
}
