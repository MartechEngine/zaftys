import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getReportSchedules } from "@/lib/settings/config-repository";
import { CreateReportScheduleForm } from "@/components/app/sprint8-forms";
import { DeleteReportScheduleButton } from "@/components/app/sprint13-forms";
import { EditReportScheduleCadenceButton } from "@/components/app/sprint15-forms";
import { EditReportScheduleRecipientsButton } from "@/components/app/sprint16-forms";

export default async function SettingsReportsPage() {
  const schedules = await getReportSchedules();

  return (
    <>
      <PageHeader title="Settings" description="Scheduled report email delivery" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          {schedules.map((s) => (
            <div key={s.id} className="flex flex-wrap items-center justify-between gap-2">
              <p>
                <span className="text-muted-foreground">{s.name}</span> · {s.cadence} ·{" "}
                {s.recipients}
              </p>
              <div className="flex flex-wrap gap-2">
                <EditReportScheduleCadenceButton id={s.id} cadence={s.cadence} />
                <EditReportScheduleRecipientsButton id={s.id} recipients={s.recipients} />
                <DeleteReportScheduleButton id={s.id} name={s.name} />
              </div>
            </div>
          ))}
          <CreateReportScheduleForm />
        </CardContent>
      </Card>
    </>
  );
}
