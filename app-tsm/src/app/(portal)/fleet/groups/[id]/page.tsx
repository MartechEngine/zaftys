import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoFleetGroups } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function FleetGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const group = demoFleetGroups.find((g) => g.id === id);
  if (!group) notFound();

  return (
    <>
      <PageHeader title={group.name} description={group.zone} />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Members</h3>
            <p className="mt-2 text-muted-foreground">{group.drivers} drivers · {group.vehicles} vehicles</p>
            <ul className="mt-3 space-y-1 text-muted-foreground">
              <li>R. Sharma · MH-27-AB-1234</li>
              <li>A. Patil · MH-27-CD-5678</li>
              <li>V. Khan · MH-27-EF-9012</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Dispatch rules</h3>
            <p className="mt-2 text-muted-foreground">Prefer this group for {group.zone} lanes</p>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/fleet/groups" className="text-link hover:underline">← Fleet groups</Link>
      </p>
    </>
  );
}
