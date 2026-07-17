import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getJourneyReplay, listReplayCandidates } from "@/lib/map/replay-repository";
import { JourneyReplayControls } from "@/components/app/journey-replay-controls";

export default async function MapReplayPage() {
  const [replay, candidates] = await Promise.all([getJourneyReplay(), listReplayCandidates()]);

  return (
    <>
      <PageHeader title="Journey replay" description="Historical route playback for completed trips" />
      {replay ? (
        <>
          <Card>
            <CardContent className="flex h-96 flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="h-48 w-full max-w-2xl rounded-lg bg-primary/5 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                <p className="font-medium text-navy">{replay.publicId} · {replay.route}</p>
                <p>{replay.vehicle}{replay.driver ? ` · ${replay.driver}` : ""}</p>
                <p>{replay.pointCount} GPS points · {replay.distanceKm} km · {replay.durationMinutes} min</p>
              </div>
              <JourneyReplayControls publicId={replay.publicId} pointCount={replay.pointCount} />
              <p className="text-xs text-muted-foreground">
                Track loaded from dev-store · first point {replay.points[0]?.lat.toFixed(4)}, {replay.points[0]?.lng.toFixed(4)}
              </p>
            </CardContent>
          </Card>
          {candidates.length > 1 && (
            <Card className="mt-4 max-w-2xl">
              <CardContent className="p-5 text-sm">
                <h3 className="font-semibold text-navy">Other completed trips</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {candidates.slice(0, 5).map((c) => (
                    <li key={c.shipmentId}>
                      {c.publicId} · {c.route} · {c.vehicle}
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
