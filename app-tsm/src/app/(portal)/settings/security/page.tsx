import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsSecurityPage() {
  return (
    <>
      <PageHeader title="Settings" description="Two-factor authentication and session security" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-5 text-sm">
          <div>
            <p className="font-medium text-navy">Two-factor authentication</p>
            <p className="text-muted-foreground">TOTP via authenticator app</p>
            <Button className="mt-2" variant="outline" size="sm" disabled>Enable 2FA</Button>
          </div>
          <div>
            <p className="font-medium text-navy">Session timeout</p>
            <p className="text-muted-foreground">8 hours · sliding window</p>
          </div>
          <div>
            <p className="font-medium text-navy">Password policy</p>
            <p className="text-muted-foreground">Min 12 chars · rotation every 90 days</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
