import Link from "next/link";
import { IndianRupee, Network, TrendingUp } from "lucide-react";
import { PageHeader, KpiCard } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HubCard } from "@/components/app/data-table";
import { NetworkHero } from "@/components/app/ui-primitives";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { PublishToTranzfortActions } from "@/components/app/publish-to-tranzfort-actions";
import { getNetworkSummary } from "@/lib/network/partners-repository";
import { NETWORK_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";
import { listPublishAudit } from "@/lib/tsm/publish-audit-store";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  return `${Math.round(mins / 60)}h ago`;
}

export default async function NetworkPage() {
  const summary = await getNetworkSummary();
  const bridgeMode = getBridgeMode();
  const liveReady = bridgeMode === "live" && isBridgeLiveConfigured();
  await ensureTsmOrgHydrated();
  const recentPosts = listPublishAudit(5);
  const recentErrors = listPublishAudit(20).filter((r) => r.status === "error").slice(0, 3);

  return (
    <>
      <PageHeader
        title="Marketplace"
        description="TranZfort supplier desk — My Loads, bookings, trips, analytics, and Super Load publish"
        eyebrow="Marketplace"
        action={
          <Button asChild variant="accent">
            <Link href="/network/my-loads">Open My Loads</Link>
          </Button>
        }
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {liveReady ? (
        <HonestyNotice title="Live TranZfort marketplace">
          My Loads and Bookings read/write the linked supplier on TranZfort. Shipments, fleet, and
          dispatch below are separate TMS tools — not a second marketplace.
        </HonestyNotice>
      ) : (
        <HonestyNotice title="TranZfort publish is in mock / setup mode.">
          Auth-lite org + seat gates are on. Set{" "}
          <code className="text-xs">TSM_TRANZFORT_BRIDGE_MODE=live</code> and TranZfort service
          keys to hit prod RPCs.
        </HonestyNotice>
      )}

      <PublishToTranzfortActions />

      {recentErrors.length > 0 && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">Last publish errors</p>
          <p className="mt-1 text-xs text-muted-foreground">
            From the TSM publish audit — fix and retry from the shipment or Post wizard.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {recentErrors.map((row) => (
              <li key={row.id} className="border-b border-destructive/10 pb-2 last:border-0">
                <span className="text-heading">
                  {row.postedByName || row.postedByUserId}
                </span>
                <span className="text-muted-foreground"> · {row.roleAtPost}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatRelative(row.createdAt)}
                </span>
                <p className="mt-1 text-xs text-destructive/90">
                  {row.error || "Publish failed (no detail stored)."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <HubCard
          href="/network/my-loads"
          title="My Loads"
          description="Same loads as TranZfort marketplace (live read-through)"
          stat="Live"
        />
        <HubCard
          href="/network/bookings"
          title="Booking inbox"
          description="Approve / reject trucker requests on your loads"
          stat="Live"
        />
        <HubCard
          href="/network/trips"
          title="Trips"
          description="Active & completed hauls after Approve (read-only)"
          stat="Live"
        />
        <HubCard
          href="/network/analytics"
          title="Analytics"
          description="Supplier KPIs + load funnel (impressions / views)"
          stat="Live"
        />
        <HubCard
          href="/network/chat"
          title="Chat inbox"
          description="Read-only threads — reply in TranZfort app"
          stat="Live"
        />
        <HubCard
          href="/shipments?status=pending"
          title="Post Super Load"
          description="Open a shipment and publish to TranZfort"
          stat="Publish"
        />
      </div>

      {recentPosts.length > 0 && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-medium text-heading">Recent Super Load posts</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Marketplace ownership is the company supplier; names below are who clicked Publish.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {recentPosts.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 pb-2 last:border-0"
              >
                <span>
                  <span className="text-heading">
                    {row.postedByName || row.postedByUserId}
                  </span>
                  <span className="text-muted-foreground"> · {row.roleAtPost}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{row.status}</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {row.loadId ? `${row.loadId.slice(0, 8)}…` : "—"} · {formatRelative(row.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <NetworkHero
          eyebrow="Partner / local desk"
          title={`${summary.outboundOpenPosts || summary.openOverflow} local posts · partner tools`}
          description="Local overflow and partner registry stay here. Live marketplace posts are under My Loads."
          stats={[
            {
              label: "Local outbound",
              value: String(summary.outboundOpenPosts),
              icon: Network,
            },
            {
              label: "Local offers",
              value: String(summary.outboundOffersWaiting),
              icon: TrendingUp,
            },
            { label: "Fill rate", value: summary.fillRate, icon: IndianRupee },
          ]}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Local outbound posts"
          value={summary.outboundOpenPosts}
          href="/network/overflow"
          showSparkline={false}
        />
        <KpiCard
          label="Local offers waiting"
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
          title="Local overflow / listings"
          description="TSM-local NetworkOffer desk — not live Find Loads"
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
