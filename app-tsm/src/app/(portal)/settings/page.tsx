import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { HubCard } from "@/components/app/data-table";
import { getSettingsHub } from "@/lib/settings/config-repository";

export default async function SettingsPage() {
  const hub = await getSettingsHub();

  return (
    <>
      <PageHeader
        title="Settings"
        description={`${hub.orgName} · ${hub.userCount} users · ${hub.orderTypeCount} order types`}
      />
      <SettingsNav />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hub.sections.map((s) => (
          <HubCard
            key={s.href}
            href={s.href}
            title={s.title}
            description={`${s.description} · ${s.meta}`}
          />
        ))}
      </div>
    </>
  );
}
