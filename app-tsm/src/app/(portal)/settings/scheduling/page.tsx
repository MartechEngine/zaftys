import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsSchedulingPage() {
  return (
    <>
      <PageHeader title="Settings" description="Shift rules and scheduling constraints" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Max driving hours</span> · 10 hr / day</p>
          <p><span className="text-muted-foreground">Plant loading window</span> · 06:00 – 20:00</p>
          <p><span className="text-muted-foreground">Weekend dispatch</span> · Allowed with approval</p>
          <p><span className="text-muted-foreground">Auto-schedule overflow</span> · Disabled</p>
        </CardContent>
      </Card>
    </>
  );
}
