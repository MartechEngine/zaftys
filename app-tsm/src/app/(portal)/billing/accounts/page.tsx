import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listLedgerAccounts } from "@/lib/billing/accounts-repository";
import { BILLING_NAV } from "@/lib/module-nav";

export default async function BillingAccountsPage() {
  const accounts = await listLedgerAccounts();

  return (
    <>
      <PageHeader title="Ledger accounts" description="Chart of accounts (Fleetbase Ledger)" />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={accounts}
        columns={[
          { key: "code", header: "Code", render: (r) => <span className="font-mono">{r.code}</span> },
          { key: "name", header: "Account", render: (r) => r.name },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "balance", header: "Balance (YTD)", render: (r) => r.balance },
        ]}
      />
    </>
  );
}
