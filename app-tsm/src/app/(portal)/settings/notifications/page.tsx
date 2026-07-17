import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsNotificationsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Email, push, and in-app notification channels" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Exception alerts</span> · Email + in-app · dispatchers</p>
          <p><span className="text-muted-foreground">Sync failures</span> · Email · admins</p>
          <p><span className="text-muted-foreground">Document expiry</span> · In-app · fleet managers</p>
          <p><span className="text-muted-foreground">Client tracking updates</span> · WhatsApp (P5) · disabled</p>
        </CardContent>
      </Card>
    </>
  );
}
