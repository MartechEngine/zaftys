import { NextResponse } from "next/server";
import { getActiveDataSource } from "@/lib/data/shipment-repository";
import { checkDatabaseHealth, isDatabaseConfigured } from "@/lib/db/client";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { checkS3Health, isS3Configured } from "@/lib/storage/s3";

export async function GET() {
  const dataSource = getActiveDataSource();
  const fleetbaseConfigured = Boolean(process.env.FLEETBASE_API_KEY);
  let fleetbaseReachable = false;

  if (fleetbaseConfigured) {
    fleetbaseReachable = await getFleetbaseClient().healthCheck();
  }

  const [database, s3] = await Promise.all([checkDatabaseHealth(), checkS3Health()]);

  return NextResponse.json({
    status: database === "down" || s3 === "down" ? "degraded" : "ok",
    service: "zaftys-tsm",
    dataSource:
      fleetbaseReachable && process.env.TSM_DEMO_UI !== "1" ? "fleetbase" : dataSource,
    demoUi: process.env.TSM_DEMO_UI === "1",
    fleetbaseConfigured,
    fleetbaseReachable,
    database,
    databaseConfigured: isDatabaseConfigured(),
    redisConfigured: Boolean(process.env.REDIS_URL?.trim()),
    s3,
    s3Configured: isS3Configured(),
    timestamp: new Date().toISOString(),
  });
}
