const g = globalThis as typeof globalThis & {
  __tsmAutomationOverrides?: Record<string, boolean>;
};

function getOverrides(): Record<string, boolean> {
  if (!g.__tsmAutomationOverrides) g.__tsmAutomationOverrides = {};
  return g.__tsmAutomationOverrides;
}

export function getAutomationOverride(id: string): boolean | undefined {
  const overrides = getOverrides();
  return Object.prototype.hasOwnProperty.call(overrides, id) ? overrides[id] : undefined;
}

export function setAutomationEnabled(id: string, enabled: boolean): boolean {
  getOverrides()[id] = enabled;
  return enabled;
}
