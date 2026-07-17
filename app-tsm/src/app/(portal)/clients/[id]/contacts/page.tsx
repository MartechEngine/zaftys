import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { getClient, listClientContacts } from "@/lib/clients/client-repository";
import { CreateContactForm } from "@/components/app/create-contact-form";
import { DeleteContactButton, EditContactButton } from "@/components/app/sprint14-forms";
import { CLIENTS_NAV } from "@/lib/module-nav";

export default async function ClientContactsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  const contacts = await listClientContacts(id);

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Clients", href: "/clients" },
          { label: client.name, href: `/clients/${id}` },
          { label: "Contacts" },
        ]}
      />
      <PageHeader
        title="Contacts"
        description={client.name}
        action={<CreateContactForm clientId={id} />}
      />
      <ModuleSubNav links={CLIENTS_NAV(id)} />
      <DataTable
        rows={contacts}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "role", header: "Role", render: (r) => r.role },
          { key: "phone", header: "Phone", render: (r) => r.phone },
          { key: "email", header: "Email", render: (r) => r.email },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <EditContactButton
                  clientId={id}
                  contactId={r.id}
                  name={r.name}
                  role={r.role}
                  phone={r.phone}
                  email={r.email}
                />
                <DeleteContactButton clientId={id} contactId={r.id} name={r.name} />
              </div>
            ),
          },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/clients/${id}`} className="text-link hover:underline">
          ← {client.name}
        </Link>
      </p>
    </>
  );
}
