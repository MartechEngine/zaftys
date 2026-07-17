import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoMaintenanceSchedules } from "@/lib/demo-data";
import { MAINTENANCE_NAV } from "@/lib/module-nav";

export default function MaintenanceSchedulesPage() {
  return (
    <>
      <PageHeader title="Maintenance schedules" description="Preventive triggers by mileage, hours, or calendar" />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={demoMaintenanceSchedules}
        columns={[
          { key: "vehicle", header: "Vehicle", render: (r) => <span className="font-mono">{r.vehicle}</span> },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "trigger", header: "Trigger", render: (r) => r.trigger },
          { key: "nextDue", header: "Next due", render: (r) => r.nextDue },
        ]}
      />
    </>
  );
}
