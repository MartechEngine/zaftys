import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoOrg } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function SettingsOrganizationPage() {
  return (
    <>
      <PageHeader title="Settings" description="Organization profile and branding" />
      <SettingsNav />
      <Card>
        <CardContent className="p-6 space-y-4 text-sm">
          <div><span className="text-muted-foreground">Legal name</span><p className="font-medium text-navy">{demoOrg.name}</p></div>
          <div><span className="text-muted-foreground">GSTIN</span><p className="font-mono">{demoOrg.gstin}</p></div>
          <div><span className="text-muted-foreground">Address</span><p>{demoOrg.address}</p></div>
          <div><span className="text-muted-foreground">Contact</span><p>{demoOrg.phone} · {demoOrg.email}</p></div>
          <Button variant="outline" className="mt-2">Upload logo</Button>
        </CardContent>
      </Card>
    </>
  );
}
