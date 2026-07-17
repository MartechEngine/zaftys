import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, HubCard, StatusPill } from "@/components/app/data-table";
import { demoIntegrations, demoWebhooks } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

const connStatus = {
  connected: { label: "Connected", className: "bg-emerald-100 text-emerald-800" },
  disconnected: { label: "Not configured", className: "bg-muted text-muted-foreground" },
};

const whStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  failed: { label: "Failed", className: "bg-red-100 text-red-800" },
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader title="Integrations" description="Fleetbase, TranZfort, webhooks, and third-party services" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoIntegrations.map((i) => (
          <div key={i.id} className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy">{i.name}</h3>
              <StatusPill status={i.status} map={connStatus} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{i.detail}</p>
            {i.latency !== "—" && <p className="mt-2 text-xs text-muted-foreground">Latency {i.latency}</p>}
          </div>
        ))}
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <HubCard href="/integrations/telematics" title="Telematics" description="GPS providers" stat="2 connected" />
        <HubCard href="/integrations/devices" title="Devices" description="Modems & trackers" stat="3 devices" />
        <HubCard href="/integrations/sockets" title="Sockets" description="Realtime channels" stat="3 active" />
      </div>
      <h2 className="mb-3 text-lg font-semibold text-navy">Webhooks</h2>
      <DataTable
        rows={demoWebhooks}
        columns={[
          { key: "url", header: "Endpoint", render: (r) => <span className="font-mono text-xs">{r.url}</span> },
          { key: "events", header: "Events", render: (r) => r.events },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={whStatus} /> },
          { key: "last", header: "Last delivery", render: (r) => r.lastDelivery },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/integrations/webhooks" className="text-link hover:underline">Manage webhooks →</Link>
      </p>
    </>
  );
}
