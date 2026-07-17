import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoTelematicsProviders } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const connStatus = {
  connected: { label: "Connected", className: "bg-emerald-100 text-emerald-800" },
  disconnected: { label: "Not configured", className: "bg-muted text-muted-foreground" },
};

export default function TelematicsPage() {
  return (
    <>
      <PageHeader title="Telematics providers" description="Samsara, Geotab, Flespi, and Traccar" action={<Button variant="accent">Add provider</Button>} />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoTelematicsProviders}
        columns={[
          { key: "name", header: "Provider", render: (r) => r.name },
          { key: "vehicles", header: "Vehicles", render: (r) => r.vehicles },
          { key: "lastPing", header: "Last ping", render: (r) => r.lastPing },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={connStatus} /> },
        ]}
      />
    </>
  );
}
