import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getFleetbaseIntegrationDetail } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { RotateFleetbaseKeyButton } from "@/components/app/sprint12-forms";

const connectionLabel = {
  connected: { text: "Connected", className: "bg-emerald-100 text-emerald-800" },
  demo: { text: "Demo mode", className: "bg-emerald-100 text-emerald-800" },
  disconnected: { text: "Disconnected", className: "bg-red-100 text-red-800" },
};

const scheduleStatus = {
  ok: "text-emerald-700",
  warning: "text-amber-700",
  error: "text-red-700",
};

export default async function FleetbaseIntegrationPage() {
  const detail = await getFleetbaseIntegrationDetail();
  const badge = connectionLabel[detail.connection];

  return (
    <>
      <PageHeader title="Fleetbase" description="API keys, health, and schedule monitor" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <div className="grid max-w-2xl gap-4">
        <Card>
          <CardContent className="space-y-3 p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Connection</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>{badge.text}</span>
            </div>
            <div><span className="text-muted-foreground">API URL</span><p className="font-mono text-xs">{detail.apiUrl}</p></div>
            <div><span className="text-muted-foreground">API key</span><p className="font-mono text-xs">{detail.apiKeyMasked}</p></div>
            <div><span className="text-muted-foreground">Data source</span><p>{detail.dataSource}</p></div>
            <div>
              <span className="text-muted-foreground">Last health check</span>
              <p>{detail.latencyMs != null ? `${detail.latencyMs}ms · ${detail.lastHealthCheck}` : detail.lastHealthCheck}</p>
            </div>
            <RotateFleetbaseKeyButton />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Schedule monitor</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {detail.schedules.map((item) => (
                <li key={item.name} className={scheduleStatus[item.status]}>
                  {item.name} · last run {item.lastRun} · {item.status.toUpperCase()}
                </li>
              ))}
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
