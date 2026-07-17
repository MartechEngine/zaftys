import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoDevices } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const deviceStatus = {
  online: { label: "Online", className: "bg-emerald-100 text-emerald-800" },
  offline: { label: "Offline", className: "bg-red-100 text-red-800" },
};

export default function DevicesPage() {
  return (
    <>
      <PageHeader title="Device registry" description="GPS modems and telematics hardware" action={<Button variant="accent">Register device</Button>} />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoDevices}
        columns={[
          { key: "imei", header: "IMEI", render: (r) => <span className="font-mono text-xs">{r.imei}</span> },
          { key: "vehicle", header: "Vehicle", render: (r) => r.vehicle },
          { key: "provider", header: "Provider", render: (r) => r.provider },
          { key: "firmware", header: "Firmware", render: (r) => r.firmware },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={deviceStatus} /> },
        ]}
      />
    </>
  );
}
