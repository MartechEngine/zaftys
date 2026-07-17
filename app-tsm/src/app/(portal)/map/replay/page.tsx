import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getJourneyReplay, listReplayCandidates } from "@/lib/map/replay-repository";
import { JourneyReplayMap } from "@/components/app/journey-replay-map";

export default async function MapReplayPage({
  searchParams,
}: {
  searchParams: Promise<{ shipmentId?: string }>;
}) {
  const { shipmentId } = await searchParams;
  const [replay, candidates] = await Promise.all([
    getJourneyReplay(shipmentId),
    listReplayCandidates(),
  ]);

  return (
    <>
      <PageHeader title="Journey replay" description="Historical route playback for completed trips" />
      {replay ? (
        <>
          <Card>
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium text-navy">{replay.publicId} · {replay.route}</p>
                <p>
                  {replay.vehicle}
                  {replay.driver ? ` · ${replay.driver}` : ""}
                </p>
                <p>
                  {replay.pointCount} GPS points · {replay.distanceKm} km · {replay.durationMinutes}{" "}
                  min
                </p>
              </div>
              <JourneyReplayMap
                publicId={replay.publicId}
                vehicle={replay.vehicle}
                driver={replay.driver}
                points={replay.points}
              />
            </CardContent>
          </Card>
          {candidates.length > 1 && (
            <Card className="mt-4 max-w-2xl">
              <CardContent className="p-5 text-sm">
                <h3 className="font-semibold text-navy">Other completed trips</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {candidates.slice(0, 5).map((c) => (
                    <li key={c.shipmentId}>
                      {c.shipmentId === replay.shipmentId ? (
                        <span className="font-medium text-navy">
                          {c.publicId} · {c.route} · {c.vehicle} (playing)
                        </span>
                      ) : (
                        <Link
                          href={`/map/replay?shipmentId=${c.shipmentId}`}
                          className="text-link hover:underline"
                        >
                          {c.publicId} · {c.route} · {c.vehicle}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No delivered shipments available for replay yet.
          </CardContent>
        </Card>
      )}
      <p className="mt-4 text-sm">
        <Link href="/map" className="text-link hover:underline">← Live map</Link>
      </p>
    </>
  );
}
