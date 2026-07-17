import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReportSchedules } from "@/lib/settings/config-repository";

export default async function SettingsReportsPage() {
  const schedules = await getReportSchedules();

  return (
    <>
      <PageHeader title="Settings" description="Scheduled report email delivery" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          {schedules.map((s) => (
            <p key={s.id}>
              <span className="text-muted-foreground">{s.name}</span> · {s.cadence} ·{" "}
              {s.recipients}
            </p>
          ))}
          <Button variant="outline" size="sm">
            Add schedule
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
