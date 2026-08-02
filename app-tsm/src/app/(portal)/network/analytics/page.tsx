import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { MarketplaceAnalyticsDesk } from "@/components/app/marketplace-analytics-desk";
import { NETWORK_NAV } from "@/lib/module-nav";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";

export default function NetworkAnalyticsPage() {
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Same supplier KPIs as the TranZfort dashboard — read-only"
        eyebrow="Marketplace"
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {live ? (
        <HonestyNotice title="Live marketplace analytics">
          Counts come from TranZfort for the linked supplier. Impressions / detail views use{" "}
          <code className="text-xs">load_analytics_daily</code>. Chat and dispute analytics stay in
          the TranZfort app.
        </HonestyNotice>
      ) : (
        <HonestyNotice title="Mock analytics desk">
          Showing sample KPIs. Set bridge to <code className="text-xs">live</code> with Supabase keys
          for Tabish dashboard numbers.
        </HonestyNotice>
      )}

      <div className="mt-4">
        <MarketplaceAnalyticsDesk />
      </div>
    </>
  );
}
