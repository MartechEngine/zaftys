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
          eyebrow="Load exchange"
          title={`${summary.outboundOpenPosts || summary.openOverflow} open posts · partner marketplace`}
          description="Post outbound loads to verified partners, review offers, or claim inbound overflow capacity."
          stats={[
            {
              label: "Outbound posts",
              value: String(summary.outboundOpenPosts),
              icon: Network,
            },
            {
              label: "Offers waiting",
              value: String(summary.outboundOffersWaiting),
              icon: TrendingUp,
            },
            { label: "Fill rate", value: summary.fillRate, icon: IndianRupee },
          ]}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Outbound posts"
          value={summary.outboundOpenPosts}
          href="/network/overflow"
          showSparkline={false}
        />
        <KpiCard
          label="Offers waiting"
          value={summary.outboundOffersWaiting}
          href="/network/overflow"
          showSparkline={false}
        />
        <KpiCard
          label="Inbound overflow"
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HubCard
          href="/network/overflow"
          title="Outbound desk"
          description="ZAFTYS-posted TranZfort listings"
          stat={`${summary.outboundOpenPosts} open · ${summary.outboundDrafts} drafts`}
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
