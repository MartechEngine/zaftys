type Listener = () => void;

const globalKey = "__zaftys_ops_bus__";

type Bus = {
  listeners: Set<Listener>;
};

function getBus(): Bus {
  const g = globalThis as typeof globalThis & { [globalKey]?: Bus };
  if (!g[globalKey]) {
    g[globalKey] = { listeners: new Set() };
  }
  return g[globalKey];
}

/** Notify SSE clients to recompute ops revision immediately. */
export function publishOpsChange() {
  for (const listener of getBus().listeners) {
    try {
      listener();
    } catch {
      /* ignore listener errors */
    }
  }
}

export function subscribeOpsChange(listener: Listener): () => void {
  const bus = getBus();
  bus.listeners.add(listener);
  return () => {
    bus.listeners.delete(listener);
  };
}
