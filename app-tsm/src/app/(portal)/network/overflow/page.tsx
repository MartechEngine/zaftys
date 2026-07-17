import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { OverflowQueue } from "@/components/app/overflow-queue";
import { NETWORK_NAV } from "@/lib/module-nav";

export default function NetworkOverflowPage() {
  return (
    <>
      <PageHeader
        title="Overflow queue"
        description="Marketplace loads awaiting own-fleet or partner dispatch"
      />
      <ModuleSubNav links={NETWORK_NAV} />
      <OverflowQueue />
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
