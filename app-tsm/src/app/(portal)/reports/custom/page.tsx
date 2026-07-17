import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { listCustomReportDefinitions } from "@/lib/reports/custom-reports";
import { REPORTS_NAV } from "@/lib/module-nav";
import { CreateCustomReportForm } from "@/components/app/sprint7-forms";
import { RunCustomReportButton } from "@/components/app/sprint10-forms";

export default async function ReportsCustomPage() {
  const reports = await listCustomReportDefinitions();

  return (
    <>
      <PageHeader
        title="Custom reports"
        description="Report catalog and builder (P5)"
        action={<CreateCustomReportForm />}
      />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id}>
            <CardContent className="space-y-2 p-5 text-sm">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-navy">{r.name}</h3>
                <span className="text-xs text-muted-foreground capitalize">{r.status}</span>
              </div>
              <p className="text-muted-foreground">{r.description}</p>
              <p className="text-xs text-muted-foreground">{r.metric}</p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <RunCustomReportButton id={r.id} status={r.status} />
                {r.status === "ready" ? (
                  <Link href={r.href} className="text-link hover:underline">
                    Open →
                  </Link>
                ) : (
                  <Link href={r.href} className="text-link hover:underline">
                    Schedule settings →
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
