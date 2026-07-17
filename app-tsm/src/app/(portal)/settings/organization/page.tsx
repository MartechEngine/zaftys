import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { OrgProfileEditor } from "@/components/app/org-profile-editor";
import { UploadLogoButton } from "@/components/app/sprint12-forms";
import { getOrgProfile } from "@/lib/settings/org-repository";

export default async function SettingsOrganizationPage() {
  const org = await getOrgProfile();

  return (
    <>
      <PageHeader title="Settings" description="Organization profile and branding" />
      <SettingsNav />
      <Card>
        <CardContent className="space-y-4 p-6 text-sm">
          <div>
            <span className="text-muted-foreground">Legal name</span>
            <p className="font-medium text-navy">{org.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground">GSTIN</span>
            <p className="font-mono">{org.gstin}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Address</span>
            <p>{org.address}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Contact</span>
            <p>
              {org.phone} · {org.email}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Portal</span>
            <p>{org.portalUrl}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Org users</span>
            <p>{org.userCount} active accounts</p>
          </div>
          {org.logoFilename ? (
            <div>
              <span className="text-muted-foreground">Logo</span>
              <p className="font-mono text-xs">{org.logoFilename}</p>
              {org.logoStorageKey ? (
                <p className="font-mono text-[10px] text-muted-foreground">{org.logoStorageKey}</p>
              ) : null}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <OrgProfileEditor
              initial={{
                name: org.name,
                gstin: org.gstin,
                address: org.address,
                phone: org.phone,
                email: org.email,
              }}
            />
            <UploadLogoButton />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
