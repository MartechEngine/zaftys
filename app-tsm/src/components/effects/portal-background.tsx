/** Ambient canvas — obsidian-glass gradient glow */
export function PortalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-100"
        style={{ backgroundImage: "var(--gradient-glow)" }}
      />
      <div className="absolute inset-0 grid-lines opacity-30" />
    </div>
  );
}
