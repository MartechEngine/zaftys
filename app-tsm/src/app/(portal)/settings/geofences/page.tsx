import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoGeofences } from "@/lib/demo-data";

export default function SettingsGeofencesPage() {
  return (
    <>
      <PageHeader title="Settings" description="Geofence automation rules" />
      <SettingsNav />
      <DataTable
        rows={demoGeofences}
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
