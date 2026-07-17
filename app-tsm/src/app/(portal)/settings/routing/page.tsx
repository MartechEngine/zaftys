import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getRoutingSettings } from "@/lib/settings/config-repository";

export default async function SettingsRoutingPage() {
  const settings = await getRoutingSettings();

  return (
    <>
      <PageHeader title="Settings" description="Routing engine defaults (Valhalla / OSRM / VROOM)" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Primary engine</span> · {settings.primaryEngine}
          </p>
          <p>
            <span className="text-muted-foreground">Optimization</span> · {settings.optimization}
          </p>
          <p>
            <span className="text-muted-foreground">Truck profile</span> · {settings.truckProfile} ·{" "}
            {settings.maxAxleMt} MT max
          </p>
          <p>
            <span className="text-muted-foreground">Avoid tolls</span> ·{" "}
            {settings.avoidTolls ? "Yes" : "No"}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
