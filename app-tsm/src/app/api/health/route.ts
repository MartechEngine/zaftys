import { NextResponse } from "next/server";
import { getActiveDataSource } from "@/lib/data/shipment-repository";
import { checkDatabaseHealth, isDatabaseConfigured } from "@/lib/db/client";
import { getExecutionStore, isLiveExecutionMode } from "@/lib/execution";
import { checkS3Health, isS3Configured } from "@/lib/storage/s3";

export async function GET() {
  const dataSource = getActiveDataSource();
  const fleetbaseConfigured = Boolean(process.env.FLEETBASE_API_KEY);
  let fleetbaseReachable = false;
  let executionHealthy = false;

  if (isLiveExecutionMode()) {
    try {
      executionHealthy = await getExecutionStore(
        dataSource === "postgres"
          ? { orgId: process.env.TSM_EXECUTION_ORG_ID ?? "org_zaftys_local" }
          : undefined,
      ).healthCheck();
      if (dataSource === "fleetbase") fleetbaseReachable = executionHealthy;
    } catch {
      executionHealthy = false;
    }
  }

  const [database, s3] = await Promise.all([checkDatabaseHealth(), checkS3Health()]);

  return NextResponse.json({
    status:
      database === "down" || s3 === "down" || (isLiveExecutionMode() && !executionHealthy)
        ? "degraded"
        : "ok",
    service: "zaftys-tsm",
    dataSource,
    executionBackend: dataSource,
    executionHealthy: isLiveExecutionMode() ? executionHealthy : undefined,
    demoUi: process.env.TSM_DEMO_UI === "1",
    fleetbaseConfigured,
    fleetbaseReachable,
    fleetbaseOptional: true,
    database,
    databaseConfigured: isDatabaseConfigured(),
    redisConfigured: Boolean(process.env.REDIS_URL?.trim()),
    s3,
    s3Configured: isS3Configured(),
    timestamp: new Date().toISOString(),
  });
}
