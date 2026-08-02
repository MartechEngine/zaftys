import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getInviteToken } from "@/lib/auth/invite-tokens";
import { AcceptInviteForm } from "@/components/app/accept-invite-form";

export const dynamic = "force-dynamic";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = await getInviteToken(token);
  const now = Date.now();
  const expired = invite ? new Date(invite.expiresAt).getTime() < now : false;
  const consumed = Boolean(invite?.consumedAt);
  const usable = Boolean(invite && !expired && !consumed && invite.kind === "org_user");

  return (
    <div className="flex min-h-screen flex-col justify-center px-8">
      <div className="mx-auto w-full max-w-md text-center">
        <Image
          src="/logo-header.png"
          alt="ZAFTYS"
          width={140}
          height={42}
          className="mx-auto mb-8 h-9 w-auto"
        />
        <h1 className="text-2xl font-semibold text-navy">Join ZAFTYS TSM</h1>
        {usable && invite ? (
          <AcceptInviteForm
            token={token}
            email={invite.email}
            defaultName={invite.invitedName}
          />
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              {consumed
                ? "This invite was already used. Sign in with Team seat, or ask your admin for a new invite."
                : expired
                  ? "This invite link has expired. Ask your admin to resend an invite."
                  : "This invite link is invalid or unknown. Ask your admin to resend an invite."}
            </p>
            <Button className="mt-8 w-full" variant="accent" asChild>
              <Link href="/login">Continue to sign in</Link>
            </Button>
          </>
        )}
        <p className="mt-6 text-xs text-muted-foreground">{APP_NAME}™ · Team seat invite</p>
      </div>
    </div>
  );
}
