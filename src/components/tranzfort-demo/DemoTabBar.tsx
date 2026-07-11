import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DemoTabItem<T extends string> = {
  id: T;
  label: string;
  icon?: LucideIcon;
};

type DemoTabBarProps<T extends string> = {
  tabs: readonly DemoTabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  /** hero = on dark hero; light = on white/muted sections */
  surface?: "hero" | "light";
  /** accent for active tab on light surfaces */
  accent?: "teal" | "orange";
};

export function DemoTabBar<T extends string>({
  tabs,
  active,
  onChange,
  surface = "light",
  accent = "teal",
}: DemoTabBarProps<T>) {
  const isHero = surface === "hero";
  const activeLight =
    accent === "orange"
      ? "bg-accent text-accent-foreground border-accent"
      : "bg-[#0E8C84] text-white border-[#0E8C84]";

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              isActive
                ? isHero
                  ? "bg-white text-navy border-white shadow-soft"
                  : activeLight
                : isHero
                  ? "bg-white/10 text-white/90 border-white/20 hover:bg-white/15"
                  : "bg-card border-border text-navy hover:border-[#0E8C84]/40 hover:text-navy",
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
