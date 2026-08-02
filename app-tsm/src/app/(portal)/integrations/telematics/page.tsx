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
  const demoUi = process.env.TSM_DEMO_UI === "1";

  return (
    <>
      <PageHeader
        title="Telematics providers"
        description="Samsara, Geotab, Flespi, and Traccar"
        action={<CreateTelematicsForm />}
      />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      {!demoUi && providers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-10 text-center text-sm text-muted-foreground">
          No telematics providers connected. Add a provider above or set integration credentials.
        </div>
      ) : (
        <DataTable
          rows={providers}
          emptyMessage="No telematics providers configured."
          columns={[
            {
              key: "name",
              header: "Provider",
              render: (r) => r.name,
            },
            { key: "vehicles", header: "Vehicles", render: (r) => r.vehicles },
            { key: "lastPing", header: "Last ping", render: (r) => r.lastPing },
            {
              key: "status",
              header: "Status",
              render: (r) => <StatusPill status={r.status} map={connStatus} />,
            },
            {
              key: "actions",
              header: "",
              render: (r) => <TestTelematicsButton id={r.id} />,
            },
          ]}
        />
      )}
    </>
  );
}
