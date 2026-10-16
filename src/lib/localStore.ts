// Tiny localStorage-backed store for useSyncExternalStore.
// Keeps an in-memory copy too, so things still work (for the session) if
// storage is blocked, e.g. in a private window.

const memory = new Map<string, string>();
const listeners = new Set<() => void>();

export function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function readStore(key: string): string | null {
  if (memory.has(key)) return memory.get(key) ?? null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable – memory copy still works */
  }
  listeners.forEach((listener) => listener());
}
