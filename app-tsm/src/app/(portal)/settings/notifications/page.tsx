import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getNotificationSettings } from "@/lib/settings/config-repository";

export default async function SettingsNotificationsPage() {
  const channels = await getNotificationSettings();

  return (
    <>
      <PageHeader title="Settings" description="Email, push, and in-app notification channels" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          {channels.map((c) => (
            <p key={c.id}>
              <span className="text-muted-foreground">{c.channel}</span> · {c.recipients} ·{" "}
              {c.enabled ? "on" : "disabled"}
            </p>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
