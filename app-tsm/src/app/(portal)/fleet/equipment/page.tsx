import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { CreateEquipmentForm } from "@/components/app/create-equipment-form";
import { AssignEquipmentButton } from "@/components/app/sprint11-forms";
import { RelocateEquipmentButton } from "@/components/app/sprint14-forms";
import { listEquipment } from "@/lib/fleet/equipment-repository";
import { listPlaces } from "@/lib/fleet/places-repository";
import { FLEET_NAV } from "@/lib/module-nav";

const equipStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  stored: { label: "In storage", className: "bg-muted text-muted-foreground" },
  maintenance: { label: "Maintenance", className: "bg-amber-100 text-amber-800" },
};

export default async function FleetEquipmentPage() {
  const [equipment, places] = await Promise.all([listEquipment(), listPlaces()]);

  return (
    <>
      <PageHeader
        title="Equipment"
        description="Non-vehicle assets — loaders, scales, spare modems"
        action={<CreateEquipmentForm locations={places.map((p) => p.name)} />}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={equipment}
        columns={[
          { key: "name", header: "Asset", render: (r) => r.name },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "location", header: "Location", render: (r) => r.location },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={equipStatus} />,
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <RelocateEquipmentButton id={r.id} location={r.location} />
                <AssignEquipmentButton id={r.id} status={r.status} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
