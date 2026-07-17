import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MapReplayPage() {
  return (
    <>
      <PageHeader title="Journey replay" description="Historical route playback for completed trips" />
      <Card>
        <CardContent className="flex h-96 flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="h-48 w-full max-w-2xl rounded-lg bg-primary/5 flex items-center justify-center text-sm text-muted-foreground">
            Route playback timeline · ZFT-2026-0138 · Nagpur → Amravati · 10 Jul 2026
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>◀ Rewind</Button>
            <Button variant="accent" size="sm" disabled>▶ Play</Button>
            <Button variant="outline" size="sm" disabled>1x</Button>
          </div>
          <p className="text-xs text-muted-foreground">Connect Fleetbase GPS history for full replay (P4).</p>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href="/map" className="text-link hover:underline">← Live map</Link>
      </p>
    </>
  );
}
