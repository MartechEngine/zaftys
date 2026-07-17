import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsRoutingPage() {
  return (
    <>
      <PageHeader title="Settings" description="Routing engine defaults (Valhalla / OSRM / VROOM)" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Primary engine</span> · Valhalla (Fleetbase extension)</p>
          <p><span className="text-muted-foreground">Optimization</span> · VROOM for multi-stop</p>
          <p><span className="text-muted-foreground">Truck profile</span> · Multi-axle · 42 MT max</p>
          <p><span className="text-muted-foreground">Avoid tolls</span> · No</p>
        </CardContent>
      </Card>
    </>
  );
}
