import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { NetworkSyncPanel } from "@/components/app/network-sync-panel";
import { SyncDlqPanel } from "@/components/app/sync-dlq-panel";
import { SyncStatusBanner } from "@/components/app/sync-status-banner";
import { NETWORK_NAV } from "@/lib/module-nav";

export default function NetworkSyncPage() {
  return (
    <>
      <PageHeader
        title="Sync health"
        description="Status banner, last run, and local dead-letter queue (TranZfort adapters deferred)"
      />
      <ModuleSubNav links={NETWORK_NAV} />
      <SyncStatusBanner />
      <div className="mt-6">
        <NetworkSyncPanel />
      </div>
      <SyncDlqPanel />
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/network" className="text-link hover:underline">
          ← Back to Network
        </Link>
      </p>
    </>
  );
}
