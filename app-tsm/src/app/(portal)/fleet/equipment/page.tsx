import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoEquipment } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

const equipStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  stored: { label: "In storage", className: "bg-muted text-muted-foreground" },
};

export default function FleetEquipmentPage() {
  return (
    <>
      <PageHeader title="Equipment" description="Non-vehicle assets — loaders, scales, spare modems" />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={demoEquipment}
        columns={[
          { key: "name", header: "Asset", render: (r) => r.name },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "location", header: "Location", render: (r) => r.location },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={equipStatus} /> },
        ]}
      />
    </>
  );
}
