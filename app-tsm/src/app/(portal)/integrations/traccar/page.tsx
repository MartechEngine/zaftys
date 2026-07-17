import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getTraccarBridgeDetail } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { TestTraccarButton } from "@/components/app/sprint11-forms";

export default async function TraccarPage() {
  const detail = await getTraccarBridgeDetail();

  return (
    <>
      <PageHeader title="Traccar bridge" description="Self-hosted hardware GPS integration" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Server URL</span> · <span className="font-mono text-xs">{detail.serverUrl}</span></p>
          <p><span className="text-muted-foreground">Devices synced</span> · {detail.devicesSynced}</p>
          <p><span className="text-muted-foreground">Last sync</span> · {detail.lastSync}</p>
          <p><span className="text-muted-foreground">Status</span> · <span className="capitalize">{detail.status}</span></p>
          <TestTraccarButton />
        </CardContent>
      </Card>
    </>
  );
}
