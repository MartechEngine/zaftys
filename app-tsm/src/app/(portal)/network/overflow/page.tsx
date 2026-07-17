import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { NetworkOverflowDesk } from "@/components/app/network-overflow-desk";
import { NETWORK_NAV } from "@/lib/module-nav";

export default function NetworkOverflowPage() {
  return (
    <>
      <PageHeader
        title="Network overflow"
        description="Post outbound loads to TranZfort, or review inbound marketplace bookings"
      />
      <ModuleSubNav links={NETWORK_NAV} />
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
