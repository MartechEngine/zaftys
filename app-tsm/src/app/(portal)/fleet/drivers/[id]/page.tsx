import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { listDrivers } from "@/lib/data/shipment-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function DriverDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const driver = (await listDrivers()).find((d) => d.id === id);
  if (!driver) notFound();

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Fleet", href: "/fleet" },
          { label: driver.name },
        ]}
      />
      <PageHeader title={driver.name} description={`License ${driver.license}`} action={<Button variant="outline">Edit</Button>} />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <Link href={`/fleet/drivers/${id}/schedule`} className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80">Schedule</Link>
        <Link href={`/fleet/drivers/${id}/invite`} className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80">Navigator invite</Link>
        <Link href="/reports/drivers" className="rounded-md bg-muted px-3 py-1.5 hover:bg-muted/80">Scorecard</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Phone</span> · {driver.phone}</p>
            <p><span className="text-muted-foreground">Status</span> · <span className="capitalize">{driver.status.replace("_", " ")}</span></p>
            <p><span className="text-muted-foreground">Vehicle</span> · {driver.vehicle ?? "Unassigned"}</p>
            <p><span className="text-muted-foreground">License expiry</span> · {driver.licenseExpiry}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Navigator app</h3>
            <p className="mt-2 text-sm text-muted-foreground">Invite sent · last GPS 4 min ago</p>
            <Button className="mt-4" variant="accent" size="sm" asChild>
              <Link href={`/fleet/drivers/${id}/invite`}>Manage invite</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <p className="mt-6 text-sm">
        <Link href="/fleet" className="text-link hover:underline">← Fleet</Link>
      </p>
    </>
  );
}
