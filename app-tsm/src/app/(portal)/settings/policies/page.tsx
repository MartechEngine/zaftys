import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPoliciesPage() {
  return (
    <>
      <PageHeader title="Settings" description="Organization configuration" />
      <SettingsNav />
      <Card className="max-w-2xl">
        <CardContent className="space-y-4 p-6 text-sm">
          <div>
            <h3 className="font-semibold text-navy">Dispatch policies</h3>
            <p className="mt-1 text-muted-foreground">Auto-assign network overflow after 30 min · Require LR before in-transit</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy">Document policies</h3>
            <p className="mt-1 text-muted-foreground">Block dispatch if fitness expired · Alert 30 days before expiry</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy">Client visibility</h3>
            <p className="mt-1 text-muted-foreground">Clients see live map + ePOD · Hide driver phone numbers</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
