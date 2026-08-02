import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { listDevices } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { CreateDeviceForm } from "@/components/app/module-create-forms";
import { UnassignDeviceButton } from "@/components/app/sprint12-forms";
import { AssignDeviceButton } from "@/components/app/sprint13-forms";

const deviceStatus = {
  online: { label: "Online", className: "bg-emerald-100 text-emerald-800" },
  offline: { label: "Offline", className: "bg-red-100 text-red-800" },
};

export default async function DevicesPage() {
  const devices = await listDevices();

  return (
    <>
      <PageHeader
        title="Device registry"
        description="GPS modems and telematics hardware"
        action={<CreateDeviceForm />}
      />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <HonestyNotice title="Session-only.">
        Devices are stored in server memory — restart clears the list. Prefer Traccar / Fleetbase for
        durable hardware identity.
      </HonestyNotice>
      <DataTable
        rows={devices}
        emptyMessage="No devices in this session. Create one to try assignment flows."
        columns={[
          {
            key: "imei",
            header: "IMEI",
            render: (r) => <span className="font-mono text-xs">{r.imei}</span>,
          },
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "provider", header: "Provider", render: (r) => r.provider },
          { key: "firmware", header: "Firmware", render: (r) => r.firmware },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={deviceStatus} />,
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <AssignDeviceButton id={r.id} vehicle={r.vehicle} />
                <UnassignDeviceButton id={r.id} vehicle={r.vehicle} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
