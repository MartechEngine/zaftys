const g = globalThis as typeof globalThis & {
  __tsmNotificationReads?: Set<string>;
};

function getReadSet() {
  if (!g.__tsmNotificationReads) g.__tsmNotificationReads = new Set();
  return g.__tsmNotificationReads;
}

export function isNotificationRead(id: string) {
  return getReadSet().has(id);
}

export function markNotificationsRead(ids: string[]) {
  const set = getReadSet();
  for (const id of ids) set.add(id);
  return ids.length;
}

export function markAllNotificationsRead(ids: string[]) {
  return markNotificationsRead(ids);
}

export function listReadNotificationIds() {
  return [...getReadSet()];
}
