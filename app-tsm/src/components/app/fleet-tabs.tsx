"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/app/empty-state";
import { cn } from "@/lib/utils";
import type { Driver, Vehicle } from "@/lib/dev-store";

const tabs = ["Vehicles", "Drivers"] as const;

function DocBadge({ status }: { status: Vehicle["docs"] }) {
  const styles = {
    valid: "bg-success/15 text-success",
    expiring: "bg-warning/15 text-warning",
    expired: "bg-destructive/15 text-destructive",
  };
  const labels = { valid: "Valid", expiring: "Expiring", expired: "Expired" };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", styles[status])}>
      {labels[status]}
    </span>
  );
}

export function FleetTabs({
  vehicles,
  drivers,
}: {
  vehicles: Vehicle[];
  drivers: Driver[];
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Vehicles");

  return (
    <>
      <div className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              tab === t
                ? "bg-primary/15 text-primary"
                : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {tab === "Vehicles" ? (
            vehicles.length === 0 ? (
              <EmptyState
                className="m-4 border-0 bg-transparent py-10"
                title="No vehicles yet"
                description="Use Create vehicle above to register a unit in Fleetbase for assignment and compliance."
              />
            ) : (
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Registration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Capacity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Docs
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-white/[0.04]">
                      <td className="px-4 py-3 font-medium text-link">
                        <Link href={`/fleet/vehicles/${v.id}`} className="hover:text-link-hover">
                          {v.registration}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{v.type}</td>
                      <td className="px-4 py-3">{v.capacityMt} MT</td>
                      <td className="px-4 py-3">{v.driver ?? "—"}</td>
                      <td className="px-4 py-3">
                        <DocBadge status={v.docs} />
                      </td>
                      <td className="px-4 py-3 capitalize">{v.status.replace("_", " ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : drivers.length === 0 ? (
            <EmptyState
              className="m-4 border-0 bg-transparent py-10"
              title="No drivers yet"
              description="Use Create driver above (name, phone, email) to register in Fleetbase."
            />
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                    License
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                    Vehicle
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-label uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {drivers.map((d) => (
                  <tr key={d.id} className="hover:bg-white/[0.04]">
                    <td className="px-4 py-3 font-medium text-link">
                      <Link href={`/fleet/drivers/${d.id}`} className="hover:text-link-hover">
                        {d.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{d.phone}</td>
                    <td className="px-4 py-3">
                      {d.license}
                      <br />
                      <span className="text-xs text-muted-foreground">Exp {d.licenseExpiry}</span>
                    </td>
                    <td className="px-4 py-3">{d.vehicle ?? "—"}</td>
                    <td className="px-4 py-3 capitalize">{d.status.replace("_", " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
