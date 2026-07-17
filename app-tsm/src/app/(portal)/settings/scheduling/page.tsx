import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getSchedulingSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { ConfigFieldForm } from "@/components/app/sprint14-forms";
import { ConfigFieldForm as Sprint18ConfigFieldForm } from "@/components/app/sprint18-forms";

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
          <ConfigFieldForm
            section="scheduling"
            field="maxDrivingHours"
            label="Max driving hours"
            value={settings.maxDrivingHours}
            inputType="number"
          />
          <p>
            <span className="text-muted-foreground">Plant loading window</span> ·{" "}
            {settings.plantWindow}
          </p>
          <ConfigFieldForm
            section="scheduling"
            field="plantWindow"
            label="Plant loading window"
            value={settings.plantWindow}
          />
          <p>
            <span className="text-muted-foreground">Weekend dispatch</span> ·{" "}
            {settings.weekendDispatch}
          </p>
          <Sprint18ConfigFieldForm
            section="scheduling"
            field="weekendDispatch"
            label="Weekend dispatch policy"
            value={settings.weekendDispatch}
          />
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
