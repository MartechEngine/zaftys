import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default function TallyPage() {
  return (
    <>
      <PageHeader title="Tally export" description="India accounting — invoice sync to Tally" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p><span className="text-muted-foreground">Status</span> · Not configured</p>
          <p><span className="text-muted-foreground">Export format</span> · XML (Tally Prime)</p>
          <p><span className="text-muted-foreground">Last export</span> · —</p>
          <Button variant="accent" size="sm">Configure Tally</Button>
        </CardContent>
      </Card>
    </>
  );
}
