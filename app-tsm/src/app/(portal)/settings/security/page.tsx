import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getSecuritySettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";

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
            <div className="mt-2">
              <ConfigToggleForm
                section="security"
                field="twoFactorEnabled"
                label="2FA"
                current={settings.twoFactorEnabled}
              />
            </div>
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
