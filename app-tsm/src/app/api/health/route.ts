import { NextResponse } from "next/server";
import { getActiveDataSource } from "@/lib/data/shipment-repository";
import { getFleetbaseClient } from "@/lib/fleetbase/client";

export async function GET() {
  const dataSource = getActiveDataSource();
  const fleetbaseConfigured = Boolean(process.env.FLEETBASE_API_KEY);
  let fleetbaseReachable = false;

  if (fleetbaseConfigured) {
    fleetbaseReachable = await getFleetbaseClient().healthCheck();
  }

  return NextResponse.json({
    status: "ok",
    service: "zaftys-tsm",
    dataSource: fleetbaseReachable && process.env.TSM_DEMO_UI === "0" ? "fleetbase" : dataSource,
    demoUi: process.env.TSM_DEMO_UI !== "0",
    fleetbaseConfigured,
    fleetbaseReachable,
    timestamp: new Date().toISOString(),
  });
}
