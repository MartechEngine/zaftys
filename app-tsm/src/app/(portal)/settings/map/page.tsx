import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsMapPage() {
  return (
    <>
      <PageHeader title="Settings" description="Map provider and geofences" />
      <SettingsNav />
      <Card>
        <CardContent className="p-6 space-y-3 text-sm">
          <p><strong>Provider:</strong> MapLibre GL + OpenFreeMap (free, no API key)</p>
          <p><strong>Style:</strong> Dark (default) — override with NEXT_PUBLIC_MAP_STYLE</p>
          <p><strong>Geofences:</strong> 4 active (plants, weighbridges)</p>
        </CardContent>
      </Card>
    </>
  );
}
