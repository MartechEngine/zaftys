"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LiveMap, type LiveMapMarker, type LiveMapRoute } from "@/components/app/live-map";
import { Button } from "@/components/ui/button";
import type { ReplayPoint } from "@/lib/map/replay-repository";

type JourneyReplayMapProps = {
  publicId: string;
  vehicle: string;
  driver?: string;
  points: ReplayPoint[];
};

const BASE_TICK_MS = 400;

export function JourneyReplayMap({ publicId, vehicle, driver, points }: JourneyReplayMapProps) {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [cursor, setCursor] = useState(0);
  const playingRef = useRef(false);
  const cursorRef = useRef(0);
  const speedRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pointCount = points.length;

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const route: LiveMapRoute = useMemo(
    () => ({
      id: `replay-${publicId}`,
      coordinates: points.map((p) => [p.lng, p.lat] as [number, number]),
    }),
    [points, publicId],
  );

  const current = points[Math.min(cursor, Math.max(0, pointCount - 1))];

  const markers: LiveMapMarker[] = useMemo(() => {
    if (points.length === 0) return [];
    const first = points[0];
    const last = points[points.length - 1];
    const out: LiveMapMarker[] = [
      {
        id: `${publicId}-start`,
        lat: first.lat,
        lng: first.lng,
        title: `${publicId} start`,
        variant: "pickup",
      },
      {
        id: `${publicId}-end`,
        lat: last.lat,
        lng: last.lng,
        title: `${publicId} end`,
        variant: "drop",
      },
    ];
    if (current) {
      out.push({
        id: `${publicId}-vehicle`,
        lat: current.lat,
        lng: current.lng,
        title: publicId,
        subtitle: [vehicle, driver, `${Math.round(current.speedKmh)} km/h`]
          .filter(Boolean)
          .join(" · "),
        variant: "vehicle",
      });
    }
    return out;
  }, [points, current, publicId, vehicle, driver]);

  function startPlayback() {
    if (pointCount < 2) {
      toast.message("Not enough GPS points to animate");
      return;
    }

    stopTimer();
    setPlaying(true);
    playingRef.current = true;

    if (cursorRef.current >= pointCount - 1) {
      setCursor(0);
      cursorRef.current = 0;
    }

    toast.success("Replay started", {
      description: `${publicId} · ${pointCount} points @ ${speedRef.current}x`,
    });

    timerRef.current = setInterval(() => {
      if (!playingRef.current) return;
      const next = cursorRef.current + 1;
      if (next >= pointCount) {
        stopTimer();
        setPlaying(false);
        playingRef.current = false;
        setCursor(pointCount - 1);
        cursorRef.current = pointCount - 1;
        toast.message("Replay finished");
        return;
      }
      cursorRef.current = next;
      setCursor(next);
    }, Math.max(50, BASE_TICK_MS / speedRef.current));
  }

  function pause() {
    stopTimer();
    setPlaying(false);
    playingRef.current = false;
  }

  function rewind() {
    stopTimer();
    setPlaying(false);
    playingRef.current = false;
    setCursor(0);
    cursorRef.current = 0;
    toast.message("Rewound to start");
  }

  function cycleSpeed() {
    const next = speed === 1 ? 2 : speed === 2 ? 4 : 1;
    setSpeed(next);
    speedRef.current = next;
    toast.message(`Playback ${next}x`);
    if (playingRef.current) {
      stopTimer();
      timerRef.current = setInterval(() => {
        if (!playingRef.current) return;
        const step = cursorRef.current + 1;
        if (step >= pointCount) {
          stopTimer();
          setPlaying(false);
          playingRef.current = false;
          setCursor(pointCount - 1);
          cursorRef.current = pointCount - 1;
          toast.message("Replay finished");
          return;
        }
        cursorRef.current = step;
        setCursor(step);
      }, Math.max(50, BASE_TICK_MS / next));
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <LiveMap
        markers={markers}
        routes={[route]}
        height="20rem"
        clusterVehicles={false}
        showPlaceholderLegend={false}
        fitBoundsOnUpdate={false}
        selectedId={`${publicId}-vehicle`}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="sm" onClick={rewind} disabled={playing && cursor === 0}>
            ◀ Rewind
          </Button>
          {playing ? (
            <Button variant="accent" size="sm" onClick={pause}>
              Pause
            </Button>
          ) : (
            <Button variant="accent" size="sm" onClick={startPlayback}>
              ▶ Play
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={cycleSpeed}>
            {speed}x
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.refresh()}>
            Refresh track
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Cursor {pointCount === 0 ? 0 : cursor + 1}/{pointCount}
          {current
            ? ` · ${current.lat.toFixed(4)}, ${current.lng.toFixed(4)} · ${Math.round(current.speedKmh)} km/h`
            : ""}
        </p>
      </div>
    </div>
  );
}
