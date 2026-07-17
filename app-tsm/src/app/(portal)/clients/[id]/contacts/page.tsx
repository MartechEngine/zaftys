import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoClients, demoContacts } from "@/lib/demo-data";
import { CLIENTS_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

export default async function ClientContactsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = demoClients.find((c) => c.id === id);
  if (!client) notFound();

  const contacts = demoContacts.filter((c) => c.clientId === id);

  return (
    <>
      <PageHeader title="Contacts" description={client.name} action={<Button variant="accent" size="sm">Add contact</Button>} />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <DataTable
        rows={contacts}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "role", header: "Role", render: (r) => r.role },
          { key: "phone", header: "Phone", render: (r) => r.phone },
          { key: "email", header: "Email", render: (r) => r.email },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/clients/${id}`} className="text-link hover:underline">← {client.name}</Link>
      </p>
    </>
  );
}
