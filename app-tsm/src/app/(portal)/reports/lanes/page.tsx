import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLanesReport } from "@/lib/reports/lanes-report";
import { REPORTS_NAV } from "@/lib/module-nav";

export default async function ReportsLanesPage() {
  const report = await getLanesReport();

  return (
    <>
      <PageHeader
        title="Lane performance"
        description="Industrial corridor scorecards"
        action={
          <Button variant="outline" size="sm" asChild>
            <a href="/api/reports/lanes?format=csv">Export CSV</a>
          </Button>
        }
      />
      <ModuleSubNav links={REPORTS_NAV} />
      <p className="mb-4 text-sm text-muted-foreground">
        {report.totalCorridors} corridors
        {report.topCorridor ? ` · top: ${report.topCorridor}` : ""}
      </p>
      {report.corridors.length === 0 ? (
        <p className="text-sm text-muted-foreground">No corridor data yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {report.corridors.map((lane) => (
            <Card key={lane.corridor}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy">{lane.corridor}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lane.trips} trips · {lane.onTime}% on-time
                </p>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${lane.onTime}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm">
        <Link href="/reports" className="text-link hover:underline">
          ← Reports hub
        </Link>
      </p>
    </>
  );
}
