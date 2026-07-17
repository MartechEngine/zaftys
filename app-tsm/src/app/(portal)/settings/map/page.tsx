import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getMapSettings } from "@/lib/settings/config-repository";

export default async function SettingsMapPage() {
  const settings = await getMapSettings();

  return (
    <>
      <PageHeader title="Settings" description="Map provider and geofences" />
      <SettingsNav />
      <Card>
        <CardContent className="space-y-3 p-6 text-sm">
          <p>
            <strong>Provider:</strong> {settings.provider}
          </p>
          <p>
            <strong>Style:</strong> {settings.style}
            {settings.styleEnv !== "—" ? ` — override ${settings.styleEnv}` : ""}
          </p>
          <p>
            <strong>Geofences:</strong> {settings.geofenceCount} active
          </p>
          <p>
            <Link href={settings.liveMapPath} className="text-link hover:underline">
              Open live map →
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
