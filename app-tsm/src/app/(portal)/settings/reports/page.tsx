import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsReportsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Scheduled report email delivery" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Weekly ops summary</span> · Mon 07:00 · dispatchers@zaftys.com</p>
          <p><span className="text-muted-foreground">Monthly GST pack</span> · 1st of month · accounts@zaftys.com</p>
          <Button variant="outline" size="sm">Add schedule</Button>
        </CardContent>
      </Card>
    </>
  );
}
