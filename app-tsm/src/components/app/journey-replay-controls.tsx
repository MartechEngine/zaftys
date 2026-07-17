"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function JourneyReplayControls({
  publicId,
  pointCount,
}: {
  publicId: string;
  pointCount: number;
}) {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [cursor, setCursor] = useState(0);

  function play() {
    setPlaying(true);
    toast.success("Replay started", {
      description: `${publicId} · ${pointCount} points @ ${speed}x`,
    });
    const next = Math.min(pointCount - 1, cursor + Math.max(1, Math.round(pointCount * 0.1)));
    setCursor(next);
    setTimeout(() => setPlaying(false), 800);
  }

  function rewind() {
    setCursor(0);
    setPlaying(false);
    toast.message("Rewound to start");
  }

  function cycleSpeed() {
    const next = speed === 1 ? 2 : speed === 2 ? 4 : 1;
    setSpeed(next);
    toast.message(`Playback ${next}x`);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={rewind} disabled={playing}>
          ◀ Rewind
        </Button>
        <Button variant="accent" size="sm" onClick={play} disabled={playing}>
          {playing ? "Playing…" : "▶ Play"}
        </Button>
        <Button variant="outline" size="sm" onClick={cycleSpeed}>
          {speed}x
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.refresh()}>
          Refresh track
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Cursor {cursor + 1}/{pointCount}
      </p>
    </div>
  );
}
