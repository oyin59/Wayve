"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { readStore, subscribe, writeStore } from "@/lib/localStore";

const STORAGE_KEY = "wayve:area";
export const DEFAULT_AREA = "Wuse";

interface AreaContextValue {
  area: string;
  setArea: (area: string) => void;
}

const AreaContext = createContext<AreaContextValue | null>(null);

/**
 * Replaces `navigate(path, { state: { selectedArea } })` from the React app.
 * The chosen Abuja area lives here (and in localStorage), so every page
 * shares it and it survives refreshes. The server render always uses the
 * default, then the client swaps in the stored value after hydrating.
 */
export function AreaProvider({ children }: { children: ReactNode }) {
  const area = useSyncExternalStore(
    subscribe,
    () => readStore(STORAGE_KEY) ?? DEFAULT_AREA,
    () => DEFAULT_AREA,
  );

  const setArea = useCallback(
    (next: string) => writeStore(STORAGE_KEY, next),
    [],
  );

  const value = useMemo(() => ({ area, setArea }), [area, setArea]);

  return <AreaContext.Provider value={value}>{children}</AreaContext.Provider>;
}

export function useArea() {
  const ctx = useContext(AreaContext);
  if (!ctx) throw new Error("useArea must be used inside <AreaProvider>");
  return ctx;
}
