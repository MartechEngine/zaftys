import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function FleetbaseIntegrationPage() {
  return (
    <>
      <PageHeader title="Fleetbase" description="API keys, health, and schedule monitor" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <div className="grid max-w-2xl gap-4">
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Connection</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Demo mode</span>
            </div>
            <div><span className="text-muted-foreground">API URL</span><p className="font-mono text-xs">http://localhost:8000/v1</p></div>
            <div><span className="text-muted-foreground">API key</span><p className="font-mono text-xs">••••••••••••demo</p></div>
            <div><span className="text-muted-foreground">Last health check</span><p>42ms · 2 min ago</p></div>
            <Button variant="outline" size="sm" disabled>Rotate key</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Schedule monitor</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>TranZfort sync · last run 3 min ago · OK</li>
              <li>Document expiry scan · daily 06:00 · OK</li>
              <li>Webhook retry queue · every 5 min · OK</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/integrations" className="text-link hover:underline">← Integrations</Link>
      </p>
    </>
  );
}
