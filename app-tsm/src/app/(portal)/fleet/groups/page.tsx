import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listFleetGroups } from "@/lib/fleet/places-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { CreateFleetGroupForm } from "@/components/app/module-create-forms";
import { EditFleetGroupButton } from "@/components/app/sprint12-forms";

export default async function FleetGroupsPage() {
  const groups = await listFleetGroups();

  return (
    <>
      <PageHeader
        title="Fleet groups"
        description="Logical driver and vehicle groupings by zone"
        action={<CreateFleetGroupForm />}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={groups}
        columns={[
          {
            key: "name",
            header: "Group",
            render: (r) => (
              <Link href={`/fleet/groups/${r.id}`} className="font-medium text-link">
                {r.name}
              </Link>
            ),
          },
          { key: "zone", header: "Zone", render: (r) => r.zone },
          { key: "drivers", header: "Drivers", render: (r) => r.drivers },
          { key: "vehicles", header: "Vehicles", render: (r) => r.vehicles },
          {
            key: "actions",
            header: "",
            render: (r) => <EditFleetGroupButton id={r.id} name={r.name} zone={r.zone} />,
          },
        ]}
      />
    </>
  );
}
