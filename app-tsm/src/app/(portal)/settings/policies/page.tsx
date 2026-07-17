import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getPolicyBlocks } from "@/lib/settings/config-repository";

export default async function SettingsPoliciesPage() {
  const policies = await getPolicyBlocks();

  return (
    <>
      <PageHeader title="Settings" description="Organization configuration" />
      <SettingsNav />
      <Card className="max-w-2xl">
        <CardContent className="space-y-4 p-6 text-sm">
          {policies.map((p) => (
            <div key={p.id}>
              <h3 className="font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 text-muted-foreground">{p.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
