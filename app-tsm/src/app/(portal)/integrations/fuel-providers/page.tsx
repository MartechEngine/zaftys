import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoFuelProviders } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

const connStatus = {
  connected: { label: "Connected", className: "bg-emerald-100 text-emerald-800" },
  disconnected: { label: "Not configured", className: "bg-muted text-muted-foreground" },
};

export default function FuelProvidersPage() {
  return (
    <>
      <PageHeader title="Fuel providers" description="Fuel card and pump integrations" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoFuelProviders}
        columns={[
          { key: "name", header: "Provider", render: (r) => r.name },
          { key: "stations", header: "Linked stations", render: (r) => r.stations },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={connStatus} /> },
        ]}
      />
    </>
  );
}
