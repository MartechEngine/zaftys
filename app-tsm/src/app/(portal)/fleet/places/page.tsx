import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoPlaces } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

export default function FleetPlacesPage() {
  return (
    <>
      <PageHeader title="Places" description="Plants, weighbridges, depots, and geofences" />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={demoPlaces}
        columns={[
          { key: "name", header: "Name", render: (r) => <Link href={`/fleet/places/${r.id}`} className="font-medium text-link font-medium">{r.name}</Link> },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "geofence", header: "Geofence", render: (r) => r.geofence },
        ]}
      />
    </>
  );
}
