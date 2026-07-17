import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getNotificationSettings } from "@/lib/settings/config-repository";
import { NotificationChannelToggle } from "@/components/app/config-toggle-form";
import { EditNotificationRecipientsButton } from "@/components/app/sprint16-forms";

export default async function SettingsNotificationsPage() {
  const channels = await getNotificationSettings();

  return (
    <>
      <PageHeader title="Settings" description="Email, push, and in-app notification channels" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-5 text-sm">
          <p className="text-xs text-muted-foreground">
            In-app notifications are live. Email/WhatsApp delivery is a local stub (logged to activity /
            console) until an SMTP provider is configured.
          </p>
          {channels.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-navy">{c.channel}</p>
                <p className="text-muted-foreground">
                  {c.recipients} · {c.enabled ? "on" : "disabled"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <EditNotificationRecipientsButton id={c.id} recipients={c.recipients} />
                <NotificationChannelToggle id={c.id} channel={c.channel} enabled={c.enabled} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
