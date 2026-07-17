import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="flex min-h-screen flex-col justify-center px-8">
      <div className="mx-auto w-full max-w-md text-center">
        <Image src="/logo-header.png" alt="ZAFTYS" width={140} height={42} className="mx-auto mb-8 h-9 w-auto" />
        <h1 className="text-2xl font-semibold text-navy">Join ZAFTYS TSM</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;ve been invited to join the operations portal. Sign in or contact your admin to activate this invite.
        </p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">Invite: {token.slice(0, 12)}…</p>
        <Button className="mt-8 w-full" variant="accent" asChild>
          <Link href="/login">Continue to sign in</Link>
        </Button>
        <p className="mt-6 text-xs text-muted-foreground">{APP_NAME}™ · Demo invite flow</p>
      </div>
    </div>
  );
}
