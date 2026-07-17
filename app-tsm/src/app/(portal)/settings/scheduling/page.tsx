import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getSchedulingSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";

export default async function SettingsSchedulingPage() {
  const settings = await getSchedulingSettings();

  return (
    <>
      <PageHeader title="Settings" description="Shift rules and scheduling constraints" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Max driving hours</span> ·{" "}
            {settings.maxDrivingHours} hr / day
          </p>
          <p>
            <span className="text-muted-foreground">Plant loading window</span> ·{" "}
            {settings.plantWindow}
          </p>
          <p>
            <span className="text-muted-foreground">Weekend dispatch</span> ·{" "}
            {settings.weekendDispatch}
          </p>
          <p>
            <span className="text-muted-foreground">Auto-schedule overflow</span> ·{" "}
            {settings.autoScheduleOverflow ? "Enabled" : "Disabled"}
          </p>
          <p>
            <span className="text-muted-foreground">Scheduled trips now</span> ·{" "}
            {settings.scheduledTrips}
          </p>
          <ConfigToggleForm
            section="scheduling"
            field="autoScheduleOverflow"
            label="auto-schedule overflow"
            current={settings.autoScheduleOverflow}
          />
        </CardContent>
      </Card>
    </>
  );
}
