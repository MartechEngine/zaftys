import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DemoBezel = "default" | "black" | "silver" | "teal";

type AppDemoFrameProps = {
  children: ReactNode;
  className?: string;
  /** phone = device chrome; panel = wide card for section embeds */
  variant?: "phone" | "panel";
  title?: string;
  /** Phone body color  -  used in hero coverflow */
  bezel?: DemoBezel;
  /** app = TranZfort canvas (#F7F5F1); dark = marketing demo ink */
  screen?: "app" | "dark";
  /** When false, child handles its own scroll (e.g. chat with fixed composer). */
  contentScroll?: boolean;
};

const SCREEN_DARK = "bg-[oklch(0.12_0.025_220)]";
const SCREEN_APP = "app-canvas";

const BEZEL_CLASS: Record<DemoBezel, string> = {
  default: "bg-gradient-to-b from-neutral-700 to-neutral-950",
  black: "bg-gradient-to-b from-neutral-800 to-black",
  silver: "bg-gradient-to-b from-zinc-200 to-zinc-400 ring-1 ring-white/30",
  teal: "bg-gradient-to-b from-teal-800 to-teal-950",
};

export function AppDemoFrame({
  children,
  className,
  variant = "phone",
  title = "TranZfort",
  bezel = "default",
  screen = "app",
  contentScroll = true,
}: AppDemoFrameProps) {
  const screenBg = screen === "app" ? SCREEN_APP : SCREEN_DARK;

  if (variant === "panel") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-black/10 shadow-soft overflow-hidden flex flex-col",
          screen === "app" ? "text-[#1C1917]" : "text-white",
          screenBg,
          className,
        )}
      >
        <AppDemoHeader title={title} screen={screen} />
        <div
          className={cn(
            "flex-1 min-h-0",
            contentScroll ? "overflow-y-auto demo-scroll p-3" : "overflow-hidden flex flex-col",
            screenBg,
          )}
        >
          {contentScroll ? children : <div className="flex-1 min-h-0 flex flex-col">{children}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative mx-auto w-[220px] h-[440px] sm:w-[260px] sm:h-[520px]", className)}>
      <div
        className={cn(
          "relative h-full rounded-[2.5rem] p-[10px] shadow-2xl ring-1 ring-white/10",
          BEZEL_CLASS[bezel],
        )}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[88px] h-[22px] bg-black rounded-b-2xl z-10 ring-1 ring-white/5" />
        <div
          className={cn(
            "h-full rounded-[1.65rem] overflow-hidden flex flex-col",
            screen === "app" ? screenBg : "demo-screen",
            screen === "dark" && SCREEN_DARK,
          )}
        >
          <AppDemoHeader title={title} compact screen={screen} />
          <div
            className={cn(
              "flex-1 min-h-0",
              contentScroll ? "overflow-y-auto demo-scroll" : "overflow-hidden flex flex-col",
              screenBg,
            )}
          >
            {contentScroll ? <div className="pb-5">{children}</div> : children}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppDemoHeader({
  title,
  compact,
  screen = "app",
}: {
  title: string;
  compact?: boolean;
  screen?: "app" | "dark";
}) {
  return (
    <div
      className={cn(
        "shrink-0 border-b",
        screen === "app"
          ? "bg-white border-[#E7E5E4] app-text-primary"
          : "bg-[oklch(0.16_0.03_220)] border-white/12 text-white",
        compact ? "px-3 py-2.5" : "px-4 py-3",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("font-semibold truncate", compact ? "text-xs" : "text-sm")}>
          {title}
        </span>
        <span
          className={cn(
            "text-[10px] uppercase tracking-wider font-bold",
            screen === "app" ? "text-[#0E8C84]" : "text-[#0E8C84]",
          )}
        >
          Demo
        </span>
      </div>
    </div>
  );
}
