import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getBillingTemplateSettings } from "@/lib/settings/config-repository";

export default async function SettingsBillingPage() {
  const settings = await getBillingTemplateSettings();

  return (
    <>
      <PageHeader title="Settings" description="Invoice templates and billing defaults" />
      <SettingsNav />
      <Card className="max-w-lg">
        <CardContent className="space-y-3 p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Invoice template</span> · {settings.invoiceTemplate}
          </p>
          <p>
            <span className="text-muted-foreground">Payment terms</span> · {settings.paymentTerms}
          </p>
          <p>
            <span className="text-muted-foreground">Auto-invoice on delivery</span> ·{" "}
            {settings.autoInvoiceOnDelivery ? "Enabled" : "Disabled"}
          </p>
          <p>
            <span className="text-muted-foreground">HSN/SAC</span> · {settings.hsnSac}
          </p>
          <p>
            <span className="text-muted-foreground">Org GSTIN</span> · {settings.orgGstin}
          </p>
          <p>
            <span className="text-muted-foreground">Live</span> · {settings.pendingInvoices} pending
            invoices · {settings.rateRuleCount} rate rules ·{" "}
            <Link href="/billing/invoices" className="text-link hover:underline">
              Billing →
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
