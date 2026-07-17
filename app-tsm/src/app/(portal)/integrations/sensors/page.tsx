import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listSensors } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default async function SensorsPage() {
  const sensors = await listSensors();
  const demoUi = process.env.TSM_DEMO_UI !== "0";

  return (
    <>
      <PageHeader title="Sensors" description="Latest readings from connected devices" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      {!demoUi && sensors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-10 text-center text-sm text-muted-foreground">
          No sensor feeds connected. Link telematics devices to see live readings.
        </div>
      ) : (
        <DataTable
          rows={sensors}
          emptyMessage="No sensor readings available."
          columns={[
            {
              key: "device",
              header: "Device",
              render: (r) => (
                <span className="inline-flex items-center gap-2 font-mono text-xs">
                  {r.device}
                  {r.demo ? (
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-sans uppercase tracking-wide text-amber-200">
                      Demo sample
                    </span>
                  ) : null}
                </span>
              ),
            },
            { key: "type", header: "Sensor", render: (r) => r.type },
            { key: "value", header: "Value", render: (r) => r.value },
            { key: "updated", header: "Updated", render: (r) => r.updated },
          ]}
        />
      )}
    </>
  );
}
