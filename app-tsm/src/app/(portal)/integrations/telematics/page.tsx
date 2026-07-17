import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listTelematicsProviders } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { CreateTelematicsForm } from "@/components/app/module-create-forms";
import { TestTelematicsButton } from "@/components/app/sprint12-forms";

const connStatus = {
  connected: { label: "Connected", className: "bg-emerald-100 text-emerald-800" },
  disconnected: { label: "Not configured", className: "bg-muted text-muted-foreground" },
};

export default async function TelematicsPage() {
  const providers = await listTelematicsProviders();

  return (
    <>
      <PageHeader
        title="Telematics providers"
        description="Samsara, Geotab, Flespi, and Traccar"
        action={<CreateTelematicsForm />}
      />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={providers}
        columns={[
          { key: "name", header: "Provider", render: (r) => r.name },
          { key: "vehicles", header: "Vehicles", render: (r) => r.vehicles },
          { key: "lastPing", header: "Last ping", render: (r) => r.lastPing },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={connStatus} /> },
          {
            key: "actions",
            header: "",
            render: (r) => <TestTelematicsButton id={r.id} />,
          },
        ]}
      />
    </>
  );
}
