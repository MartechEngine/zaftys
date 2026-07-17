import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsNavigatorPage() {
  return (
    <>
      <PageHeader title="Settings" description="Driver mobile app branding and onboarding" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">App name</span> · ZAFTYS Navigator</p>
          <p><span className="text-muted-foreground">Primary color</span> · #1B3A5C (navy)</p>
          <p><span className="text-muted-foreground">Self-serve driver signup</span> · Disabled</p>
          <p><span className="text-muted-foreground">Require ePOD photo</span> · Enabled</p>
        </CardContent>
      </Card>
    </>
  );
}
