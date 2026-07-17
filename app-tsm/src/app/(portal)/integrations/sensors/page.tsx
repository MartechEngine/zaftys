import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoSensors } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default function SensorsPage() {
  return (
    <>
      <PageHeader title="Sensors" description="Latest readings from connected devices" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoSensors}
        columns={[
          { key: "device", header: "Device", render: (r) => <span className="font-mono text-xs">{r.device}</span> },
          { key: "type", header: "Sensor", render: (r) => r.type },
          { key: "value", header: "Value", render: (r) => r.value },
          { key: "updated", header: "Updated", render: (r) => r.updated },
        ]}
      />
    </>
  );
}
