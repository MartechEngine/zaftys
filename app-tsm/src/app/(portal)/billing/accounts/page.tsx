import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoLedgerAccounts } from "@/lib/demo-data";
import { BILLING_NAV } from "@/lib/module-nav";

export default function BillingAccountsPage() {
  return (
    <>
      <PageHeader title="Ledger accounts" description="Chart of accounts (Fleetbase Ledger)" />
      <ModuleSubNav links={BILLING_NAV} />
      <DataTable
        rows={demoLedgerAccounts}
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
