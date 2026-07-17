import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { ConfigFieldForm } from "@/components/app/sprint17-forms";
import { getPolicyBlocks, getPolicySettings } from "@/lib/settings/config-repository";

export default async function SettingsPoliciesPage() {
  const [policies, settings] = await Promise.all([getPolicyBlocks(), getPolicySettings()]);

  return (
    <>
      <PageHeader title="Settings" description="Organization configuration" />
      <SettingsNav />
      <Card className="max-w-2xl">
        <CardContent className="space-y-6 p-6 text-sm">
          {policies.map((p) => (
            <div key={p.id}>
              <h3 className="font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 text-muted-foreground">{p.summary}</p>
            </div>
          ))}

          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-navy">Dispatch policy toggles</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConfigToggleForm
                section="policies"
                field="requireLrBeforeTransit"
                label="require LR before in-transit"
                current={settings.requireLrBeforeTransit}
              />
              <ConfigToggleForm
                section="policies"
                field="autoOverflowNotify"
                label="auto overflow notify"
                current={settings.autoOverflowNotify}
              />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-navy">Document & client policies</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConfigToggleForm
                section="policies"
                field="blockDispatchOnExpiredFitness"
                label="block dispatch on expired fitness"
                current={settings.blockDispatchOnExpiredFitness}
              />
              <ConfigToggleForm
                section="policies"
                field="showLiveMap"
                label="client live map"
                current={settings.showLiveMap}
              />
              <ConfigToggleForm
                section="policies"
                field="hideDriverPhone"
                label="hide driver phone"
                current={settings.hideDriverPhone}
              />
            </div>
            <ConfigFieldForm
              section="policies"
              field="alertDaysBeforeExpiry"
              label="Alert days before expiry"
              value={settings.alertDaysBeforeExpiry}
              inputType="number"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
