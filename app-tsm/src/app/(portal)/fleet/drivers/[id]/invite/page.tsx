import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { listDrivers } from "@/lib/data/shipment-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function DriverInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const driver = (await listDrivers()).find((d) => d.id === id);
  if (!driver) notFound();

  return (
    <>
      <PageHeader title="Navigator invite" description={driver.name} />
      <ModuleSubNav links={FLEET_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Phone</span> · {driver.phone}</p>
          <p><span className="text-muted-foreground">Invite status</span> · Accepted · last active 4 min ago</p>
          <p><span className="text-muted-foreground">App version</span> · Navigator 2.1.0</p>
          <Button variant="accent" size="sm">Resend SMS invite</Button>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href={`/fleet/drivers/${id}`} className="text-link hover:underline">← Driver profile</Link>
      </p>
    </>
  );
}
