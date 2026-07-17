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
        description="Post outbound loads to TranZfort, or review inbound marketplace bookings"
      />
      <ModuleSubNav links={NETWORK_NAV} />
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
