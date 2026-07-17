import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSecuritySettings } from "@/lib/settings/config-repository";

export default async function SettingsSecurityPage() {
  const settings = await getSecuritySettings();

  return (
    <>
      <PageHeader title="Settings" description="Two-factor authentication and session security" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-5 text-sm">
          <div>
            <p className="font-medium text-navy">Two-factor authentication</p>
            <p className="text-muted-foreground">
              TOTP via authenticator app · {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
            </p>
            <Button className="mt-2" variant="outline" size="sm" disabled>
              Enable 2FA
            </Button>
          </div>
          <div>
            <p className="font-medium text-navy">Session timeout</p>
            <p className="text-muted-foreground">
              {settings.sessionTimeoutHours} hours · sliding window
            </p>
          </div>
          <div>
            <p className="font-medium text-navy">Password policy</p>
            <p className="text-muted-foreground">
              Min {settings.passwordMinLength} chars · rotation every{" "}
              {settings.passwordRotationDays} days
            </p>
          </div>
          <div>
            <p className="font-medium text-navy">Auth mode</p>
            <p className="text-muted-foreground">{settings.authMode}</p>
            <p className="mt-1 text-muted-foreground">
              {settings.activeUsers} active users · {settings.pendingInvites} pending invites
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
