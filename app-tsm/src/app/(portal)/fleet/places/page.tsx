import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { CreatePlaceForm } from "@/components/app/create-place-form";
import { listPlaces } from "@/lib/fleet/places-repository";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function FleetPlacesPage() {
  const places = await listPlaces();

  return (
    <>
      <PageHeader
        title="Places"
        description="Plants, weighbridges, depots, and geofences"
        action={<CreatePlaceForm />}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={places}
        columns={[
          {
            key: "name",
            header: "Name",
            render: (r) => (
              <Link href={`/fleet/places/${r.id}`} className="font-medium text-link">
                {r.name}
              </Link>
            ),
          },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "geofence", header: "Geofence", render: (r) => r.geofence },
          { key: "active", header: "Active trips", render: (r) => r.activeShipments },
        ]}
      />
    </>
  );
}
