import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { CreateGeofenceForm } from "@/components/app/create-geofence-form";
import { listGeofences } from "@/lib/settings/geofences-repository";

export default async function SettingsGeofencesPage() {
  const geofences = await listGeofences();

  return (
    <>
      <PageHeader
        title="Settings"
        description="Geofence automation rules"
        action={<CreateGeofenceForm />}
      />
      <SettingsNav />
      <DataTable
        rows={geofences}
        columns={[
          { key: "name", header: "Geofence", render: (r) => r.name },
          { key: "radius", header: "Radius", render: (r) => r.radius },
          { key: "triggers", header: "Automation", render: (r) => r.triggers },
          { key: "linkedPlaces", header: "Places", render: (r) => r.linkedPlaces },
        ]}
      />
    </>
  );
}
