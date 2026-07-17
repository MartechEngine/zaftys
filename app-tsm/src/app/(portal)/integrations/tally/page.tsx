import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getTallyExportStatus } from "@/lib/integrations/tally-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function TallyPage() {
  const status = await getTallyExportStatus();

  return (
    <>
      <PageHeader title="Tally export" description="India accounting — invoice sync to Tally" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Status</span> ·{" "}
            {status.status === "connected" ? "Connected" : "Not configured"}
          </p>
          <p>
            <span className="text-muted-foreground">Company</span> · {status.companyName}
          </p>
          <p>
            <span className="text-muted-foreground">GSTIN</span> · {status.gstin}
          </p>
          <p>
            <span className="text-muted-foreground">Export format</span> · {status.exportFormat}
          </p>
          <p>
            <span className="text-muted-foreground">Last export</span> · {status.lastExport}
          </p>
          <p>
            <span className="text-muted-foreground">Ready to export</span> · {status.invoiceCount}{" "}
            invoices ({status.pendingCount} pending) ·{" "}
            <Link href="/billing/invoices" className="text-link hover:underline">
              View invoices →
            </Link>
          </p>
          <Button variant="accent" size="sm">
            Configure Tally
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
