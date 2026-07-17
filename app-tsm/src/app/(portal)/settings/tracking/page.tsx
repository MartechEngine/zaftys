import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getTrackingSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { ConfigFieldForm } from "@/components/app/sprint15-forms";

export default async function SettingsTrackingPage() {
  const settings = await getTrackingSettings();

  return (
    <>
      <PageHeader title="Settings" description="Public client tracking page branding" />
      <SettingsNav />
      <Card>
        <CardContent className="space-y-3 p-6 text-sm">
          <p>
            <strong>Org:</strong> {settings.orgName}
          </p>
          <p>
            <strong>Logo:</strong> {settings.logo}
          </p>
          <p>
            <strong>Token expiry:</strong> {settings.tokenExpiryDays} days post-delivery
          </p>
          <ConfigFieldForm
            section="tracking"
            field="tokenExpiryDays"
            label="Token expiry (days)"
            value={settings.tokenExpiryDays}
            inputType="number"
          />
          <p>
            <strong>Show internal events:</strong>{" "}
            {settings.showInternalEvents ? "Visible" : "Hidden from clients"}
          </p>
          <ConfigToggleForm
            section="tracking"
            field="showInternalEvents"
            label="internal events"
            current={settings.showInternalEvents}
          />
          <p>
            <Link href={settings.sampleTrackPath} className="text-link hover:underline">
              Preview public track page →
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
