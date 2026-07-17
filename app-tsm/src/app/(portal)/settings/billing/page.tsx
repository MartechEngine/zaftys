import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getBillingTemplateSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { ConfigFieldForm } from "@/components/app/sprint14-forms";

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
          <ConfigFieldForm
            section="billing"
            field="invoiceTemplate"
            label="Invoice template"
            value={settings.invoiceTemplate}
          />
          <p>
            <span className="text-muted-foreground">Payment terms</span> · {settings.paymentTerms}
          </p>
          <ConfigFieldForm
            section="billing"
            field="paymentTerms"
            label="Payment terms"
            value={settings.paymentTerms}
          />
          <p>
            <span className="text-muted-foreground">Auto-invoice on delivery</span> ·{" "}
            {settings.autoInvoiceOnDelivery ? "Enabled" : "Disabled"}
          </p>
          <p>
            <span className="text-muted-foreground">HSN/SAC</span> · {settings.hsnSac}
          </p>
          <ConfigFieldForm
            section="billing"
            field="hsnSac"
            label="HSN/SAC"
            value={settings.hsnSac}
          />
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
          <ConfigToggleForm
            section="billing"
            field="autoInvoiceOnDelivery"
            label="auto-invoice"
            current={settings.autoInvoiceOnDelivery}
          />
        </CardContent>
      </Card>
    </>
  );
}
