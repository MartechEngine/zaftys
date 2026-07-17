import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsTrackingPage() {
  return (
    <>
      <PageHeader title="Settings" description="Public client tracking page branding" />
      <SettingsNav />
      <Card>
        <CardContent className="p-6 space-y-3 text-sm">
          <p><strong>Logo:</strong> ZAFTYS header on track page</p>
          <p><strong>Token expiry:</strong> 90 days post-delivery</p>
          <p><strong>Show internal events:</strong> Hidden from clients</p>
        </CardContent>
      </Card>
    </>
  );
}
