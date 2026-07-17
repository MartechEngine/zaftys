import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getNavigatorAppSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";

export default async function SettingsNavigatorPage() {
  const settings = await getNavigatorAppSettings();

  return (
    <>
      <PageHeader title="Settings" description="Driver mobile app branding and onboarding" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">App name</span> · {settings.appName}
          </p>
          <p>
            <span className="text-muted-foreground">Primary color</span> · {settings.primaryColor}
          </p>
          <p>
            <span className="text-muted-foreground">Self-serve driver signup</span> ·{" "}
            {settings.selfServeSignup ? "Enabled" : "Disabled"}
          </p>
          <p>
            <span className="text-muted-foreground">Require ePOD photo</span> ·{" "}
            {settings.requireEpodPhoto ? "Enabled" : "Disabled"}
          </p>
          <p>
            <span className="text-muted-foreground">Drivers</span> · {settings.invitedDrivers}{" "}
            invited · {settings.onlineDrivers} online
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <ConfigToggleForm
              section="navigator"
              field="selfServeSignup"
              label="self-serve signup"
              current={settings.selfServeSignup}
            />
            <ConfigToggleForm
              section="navigator"
              field="requireEpodPhoto"
              label="ePOD photo"
              current={settings.requireEpodPhoto}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
