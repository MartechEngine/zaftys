import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getTraccarBridgeDetail } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { TestTraccarButton } from "@/components/app/sprint11-forms";

export default async function TraccarPage() {
  const detail = await getTraccarBridgeDetail();
  const disconnected = detail.status === "disconnected";

  return (
    <>
      <PageHeader title="Traccar bridge" description="Self-hosted hardware GPS integration" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          {disconnected ? (
            <p className="rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-3 py-2 text-muted-foreground">
              Disconnected — set <code className="text-xs text-navy-bright">TRACCAR_SERVER_URL</code>{" "}
              and sync devices to enable the bridge.
            </p>
          ) : null}
          <p>
            <span className="text-muted-foreground">Server URL</span> ·{" "}
            <span className="font-mono text-xs">{detail.serverUrl}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Devices synced</span> · {detail.devicesSynced}
          </p>
          <p>
            <span className="text-muted-foreground">Last sync</span> · {detail.lastSync}
          </p>
          <p>
            <span className="text-muted-foreground">Status</span> ·{" "}
            <span className="capitalize">{detail.status}</span>
          </p>
          <TestTraccarButton />
        </CardContent>
      </Card>
    </>
  );
}
