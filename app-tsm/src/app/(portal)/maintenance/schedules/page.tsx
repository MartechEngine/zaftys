import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listMaintenanceSchedules } from "@/lib/maintenance/work-order-repository";
import { MAINTENANCE_NAV } from "@/lib/module-nav";
import { CreateScheduleForm } from "@/components/app/module-create-forms";
import { EditMaintenanceScheduleButton } from "@/components/app/sprint14-forms";

export default async function MaintenanceSchedulesPage() {
  const schedules = await listMaintenanceSchedules();

  return (
    <>
      <PageHeader
        title="Maintenance schedules"
        description="Preventive triggers by mileage, hours, or calendar"
        action={<CreateScheduleForm />}
      />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={schedules}
        columns={[
          {
            key: "vehicle",
            header: "Vehicle",
            render: (r) => <span className="font-mono">{r.vehicle}</span>,
          },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "trigger", header: "Trigger", render: (r) => r.trigger },
          { key: "nextDue", header: "Next due", render: (r) => r.nextDue },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <EditMaintenanceScheduleButton
                id={r.id}
                vehicle={r.vehicle}
                trigger={r.trigger}
                nextDue={r.nextDue}
                type={r.type}
              />
            ),
          },
        ]}
      />
    </>
  );
}
