import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getFleetGroup } from "@/lib/fleet/places-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { AddFleetGroupMemberButton } from "@/components/app/sprint15-forms";

export default async function FleetGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getFleetGroup(id);
  if (!result) notFound();

  const { group, members } = result;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Fleet", href: "/fleet" },
          { label: "Groups", href: "/fleet/groups" },
          { label: group.name },
        ]}
      />
      <PageHeader
        title={group.name}
        description={group.zone}
        action={<AddFleetGroupMemberButton groupId={id} />}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Members</h3>
            <p className="mt-2 text-muted-foreground">
              {group.drivers} drivers · {group.vehicles} vehicles
            </p>
            {members.length === 0 ? (
              <p className="mt-3 text-muted-foreground">No members assigned yet.</p>
            ) : (
              <ul className="mt-3 space-y-1 text-muted-foreground">
                {members.map((m) => (
                  <li key={`${m.driver}-${m.vehicle}`}>
                    {m.driver} · {m.vehicle}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Dispatch rules</h3>
            <p className="mt-2 text-muted-foreground">
              Prefer this group for {group.zone} lanes
            </p>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/fleet/groups" className="text-link hover:underline">
          ← Fleet groups
        </Link>
      </p>
    </>
  );
}
