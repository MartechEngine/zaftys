/** Glass surfaces — obsidian-glass design tokens */

export const glassCard = "glass text-foreground";

export const glassCardStrong = "glass-strong text-foreground";

export const glassCardHover =
  "transition-all duration-200 hover:border-white/15 hover:shadow-[var(--shadow-glow)]";

export const glassChip =
  "rounded-xl border border-white/10 bg-white/[0.05] text-foreground backdrop-blur-sm";

export const glassInput =
  "rounded-xl border border-white/10 bg-white/[0.05] text-foreground backdrop-blur-sm placeholder:text-subtle";

export const glassHighlight =
  "border-primary/30 bg-primary/10 ring-1 ring-primary/20 text-primary";

export const portalText = {
  body: "text-body",
  heading: "text-heading font-display",
  label: "text-label",
  muted: "text-muted-foreground",
  subtle: "text-subtle",
  link: "text-link hover:underline",
  emphasis: "text-emphasis",
  accent: "text-primary",
} as const;
