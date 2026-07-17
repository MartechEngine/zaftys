import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getDriverInvite } from "@/lib/fleet/invite-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { ResendInviteButton } from "@/components/app/module-create-forms";

export default async function DriverInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invite = await getDriverInvite(id);
  if (!invite) notFound();

  return (
    <>
      <PageHeader title="Navigator invite" description={invite.driverName} />
      <ModuleSubNav links={FLEET_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Phone</span> · {invite.phone}
          </p>
          <p>
            <span className="text-muted-foreground">Invite status</span> ·{" "}
            <span className="capitalize">{invite.inviteStatus.replace("_", " ")}</span>
            {invite.lastActive !== "Never" ? ` · last active ${invite.lastActive}` : ""}
          </p>
          <p>
            <span className="text-muted-foreground">App version</span> · {invite.appVersion}
          </p>
          {invite.lastResentAt && (
            <p className="text-xs text-muted-foreground">Last resent · just now</p>
          )}
          <ResendInviteButton driverId={id} disabled={!invite.canResend} />
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href={`/fleet/drivers/${id}`} className="text-link hover:underline">
          ← Driver profile
        </Link>
      </p>
    </>
  );
}
