import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoReportOps } from "@/lib/demo-data";
import { REPORTS_NAV } from "@/lib/module-nav";

export default function ReportsLanesPage() {
  return (
    <>
      <PageHeader title="Lane performance" description="Industrial corridor scorecards" />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        {demoReportOps.byCorridor.map((lane) => (
          <Card key={lane.corridor}>
            <CardContent className="p-5">
              <h3 className="font-semibold text-navy">{lane.corridor}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lane.trips} trips · {lane.onTime}% on-time</p>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${lane.onTime}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link href="/reports" className="text-link hover:underline">← Reports hub</Link>
      </p>
    </>
  );
}
