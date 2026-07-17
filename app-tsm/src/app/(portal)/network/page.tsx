import Link from "next/link";
import { IndianRupee, Network, TrendingUp } from "lucide-react";
import { PageHeader, KpiCard } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HubCard } from "@/components/app/data-table";
import { NetworkHero } from "@/components/app/ui-primitives";
import { getNetworkSummary } from "@/lib/network/partners-repository";
import { NETWORK_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  return `${Math.round(mins / 60)}h ago`;
}

export default async function NetworkPage() {
  const summary = await getNetworkSummary();

  return (
    <>
      <PageHeader
        title="TranZfort Network"
        description="Overflow capacity, partner assignments, and sync health"
        eyebrow="Network"
        action={
          <Button asChild variant="accent">
            <Link href="/network/overflow">Browse overflow</Link>
          </Button>
        }
      />
      <ModuleSubNav links={NETWORK_NAV} />

      <div className="mb-6">
        <NetworkHero
          eyebrow="Overflow network"
          title={`${summary.openOverflow} open loads · partner marketplace`}
          description="Route excess capacity to trusted partners or claim loads that match your idle fleet in real time."
          stats={[
            { label: "Open loads", value: String(summary.openOverflow), icon: Network },
            { label: "Partners", value: String(summary.verifiedPartners), icon: TrendingUp },
            { label: "Fill rate", value: summary.fillRate, icon: IndianRupee },
          ]}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Open overflow"
          value={summary.openOverflow}
          href="/network/overflow"
          showSparkline={false}
        />
        <KpiCard
          label="Verified partners"
          value={summary.verifiedPartners}
          href="/network/partners"
          showSparkline={false}
        />
        <KpiCard
          label="Active assignments"
          value={summary.activeAssignments}
          href="/network/assignments"
          showSparkline={false}
        />
        <KpiCard
          label="Sync health"
          value={summary.syncLabel}
          href="/network/sync"
          showSparkline={false}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HubCard
          href="/network/overflow"
          title="Overflow queue"
          description="Unassigned TranZfort bookings"
          stat={`${summary.openOverflow} open`}
        />
        <HubCard
          href="/network/partners"
          title="Partner registry"
          description="Verified fleet operators"
          stat={`${summary.totalPartners} partners`}
        />
        <HubCard
          href="/network/assignments"
          title="Network assignments"
          description="Accepted overflow loads in your fleet"
          stat={`${summary.activeAssignments} active`}
        />
        <HubCard
          href="/network/sync"
          title="Sync dashboard"
          description="Two-way TranZfort ↔ Fleetbase"
          stat={formatRelative(summary.lastSyncAt)}
        />
      </div>
    </>
  );
}
