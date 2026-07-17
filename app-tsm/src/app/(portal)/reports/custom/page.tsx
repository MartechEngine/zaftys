import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REPORTS_NAV } from "@/lib/module-nav";

export default function ReportsCustomPage() {
  return (
    <>
      <PageHeader title="Custom reports" description="Report builder (P5)" action={<Button variant="accent" disabled>New report</Button>} />
      <ModuleSubNav links={REPORTS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="p-8 text-center text-sm text-muted-foreground">
          Drag-and-drop report builder with scheduled email delivery — planned for P5.
        </CardContent>
      </Card>
    </>
  );
}
