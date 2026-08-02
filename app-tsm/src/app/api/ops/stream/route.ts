import { computeOpsRevision } from "@/lib/ops/ops-revision";
import { subscribeOpsChange } from "@/lib/ops/ops-bus";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INTERVAL_MS = 3_000;

/**
 * Ops SSE — emits when shipment board / exceptions / activity revision changes.
 * Mutations also publish via ops-bus for near-immediate ticks.
 */
export async function GET(request: Request) {
  const encoder = new TextEncoder();
  let lastRevision: string | null = null;

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      let interval: ReturnType<typeof setInterval> | undefined;
      let unsubscribe: (() => void) | undefined;

      const teardown = () => {
        if (closed) return;
        closed = true;
        if (interval) clearInterval(interval);
        unsubscribe?.();
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      // Enqueue must never throw past this point: the client can disconnect
      // between the abort event and an in-flight tick, and an unhandled
      // rejection here takes down the dev server.
      const emit = (event: string, data: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
          );
        } catch {
          teardown();
        }
      };

      const send = async (force = false) => {
        if (closed) return;
        try {
          const payload = await computeOpsRevision();
          const changed = payload.revision !== lastRevision;
          if (!force && !changed) {
            emit("ping", { at: payload.at });
            return;
          }
          lastRevision = payload.revision;
          emit("ops", { type: "ops.changed", ...payload });
        } catch {
          emit("error", { message: "ops tick failed" });
        }
      };

      await send(true);
      interval = setInterval(() => {
        void send(false);
      }, INTERVAL_MS);
      unsubscribe = subscribeOpsChange(() => {
        void send(true);
      });

      request.signal.addEventListener("abort", teardown);
    },

    cancel() {
      /* teardown runs via the abort listener */
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
