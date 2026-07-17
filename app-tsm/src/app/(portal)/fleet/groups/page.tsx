import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoFleetGroups } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function FleetGroupsPage() {
  return (
    <>
      <PageHeader title="Fleet groups" description="Logical driver and vehicle groupings by zone" action={<Button variant="accent">Create group</Button>} />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={demoFleetGroups}
        columns={[
          { key: "name", header: "Group", render: (r) => <Link href={`/fleet/groups/${r.id}`} className="font-medium text-link font-medium">{r.name}</Link> },
          { key: "zone", header: "Zone", render: (r) => r.zone },
          { key: "drivers", header: "Drivers", render: (r) => r.drivers },
          { key: "vehicles", header: "Vehicles", render: (r) => r.vehicles },
        ]}
      />
    </>
  );
}
