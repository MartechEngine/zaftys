import Link from "next/link";
import { IndianRupee, Network, TrendingUp } from "lucide-react";
import { PageHeader, KpiCard } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HubCard } from "@/components/app/data-table";
import { NetworkHero } from "@/components/app/ui-primitives";
import { demoOverflowLoads, demoPartners } from "@/lib/demo-data";
import { NETWORK_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function NetworkPage() {
  const openLoads = demoOverflowLoads.length;
  const partners = demoPartners.filter((p) => p.verified).length;

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
          title={`${openLoads} open loads · partner marketplace`}
          description="Route excess capacity to trusted partners or claim loads that match your idle fleet in real time."
          stats={[
            { label: "Open loads", value: String(openLoads), icon: Network },
            { label: "Partners", value: String(partners), icon: TrendingUp },
            { label: "Fill rate", value: "94%", icon: IndianRupee },
          ]}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Open overflow"
          value={openLoads}
          href="/network/overflow"
          showSparkline={false}
        />
        <KpiCard
          label="Verified partners"
          value={partners}
          href="/network/partners"
          showSparkline={false}
        />
        <KpiCard label="Active assignments" value={7} href="/network/assignments" showSparkline={false} />
        <KpiCard label="Sync health" value="OK" showSparkline={false} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HubCard
          href="/network/overflow"
          title="Overflow queue"
          description="Unassigned TranZfort bookings"
          stat={`${openLoads} open`}
        />
        <HubCard
          href="/network/partners"
          title="Partner registry"
          description="Verified fleet operators"
          stat={`${demoPartners.length} partners`}
        />
        <HubCard
          href="/network/assignments"
          title="Network assignments"
          description="Accepted overflow loads in your fleet"
          stat="View all"
        />
        <HubCard
          href="/network/sync"
          title="Sync dashboard"
          description="Two-way TranZfort ↔ Fleetbase"
          stat="3m ago"
        />
      </div>
    </>
  );
}
