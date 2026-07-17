import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function TraccarPage() {
  return (
    <>
      <PageHeader title="Traccar bridge" description="Self-hosted hardware GPS integration" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Server URL</span> · <span className="font-mono text-xs">https://gps.zaftys.internal</span></p>
          <p><span className="text-muted-foreground">Devices synced</span> · 5</p>
          <p><span className="text-muted-foreground">Last sync</span> · 3 min ago</p>
          <Button variant="outline" size="sm">Test connection</Button>
        </CardContent>
      </Card>
    </>
  );
}
