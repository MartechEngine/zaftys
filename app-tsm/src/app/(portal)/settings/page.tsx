import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { HubCard } from "@/components/app/data-table";

const SECTIONS = [
  { href: "/settings/organization", title: "Organization", description: "Profile, GSTIN, branding" },
  { href: "/settings/users", title: "Users & invites", description: "Staff and portal access" },
  { href: "/settings/roles", title: "Roles & policies", description: "IAM permissions" },
  { href: "/settings/order-types", title: "Order types", description: "Flows and custom fields" },
  { href: "/settings/dispatch", title: "Dispatch & orchestrator", description: "Automation defaults" },
  { href: "/settings/map", title: "Map & routing", description: "Mapbox, Valhalla, VROOM" },
  { href: "/settings/navigator", title: "Navigator app", description: "Driver mobile config" },
  { href: "/settings/billing", title: "Billing templates", description: "Invoice PDF defaults" },
  { href: "/settings/integrations", title: "Integrations", description: "Link to developers hub" },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Fleet-Ops configuration hub" />
      <SettingsNav />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <HubCard key={s.href} href={s.href} title={s.title} description={s.description} />
        ))}
      </div>
    </>
  );
}
