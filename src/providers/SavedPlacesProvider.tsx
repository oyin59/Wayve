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

const STORAGE_KEY = "wayve:saved-place-ids";
// What the React MVP showed before anything was saved
// (Pink Bear, Café de vie, Nosta Coffee, Eli & Lulu's).
const DEFAULT_SAVED_IDS = [1, 2, 5, 4];
const DEFAULT_RAW = JSON.stringify(DEFAULT_SAVED_IDS);

interface SavedPlacesContextValue {
  savedIds: number[];
  isSaved: (id: number) => boolean;
  save: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
}

const SavedPlacesContext = createContext<SavedPlacesContextValue | null>(null);

function parseIds(raw: string): number[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return DEFAULT_SAVED_IDS;
  }
}

export function SavedPlacesProvider({ children }: { children: ReactNode }) {
  // Snapshot is the raw JSON string so it's referentially stable between reads.
  const raw = useSyncExternalStore(
    subscribe,
    () => readStore(STORAGE_KEY) ?? DEFAULT_RAW,
    () => DEFAULT_RAW,
  );
  const savedIds = useMemo(() => parseIds(raw), [raw]);

  const persist = useCallback(
    (next: number[]) => writeStore(STORAGE_KEY, JSON.stringify(next)),
    [],
  );

  const save = useCallback(
    (id: number) => {
      if (!savedIds.includes(id)) persist([id, ...savedIds]);
    },
    [savedIds, persist],
  );

  const remove = useCallback(
    (id: number) => persist(savedIds.filter((x) => x !== id)),
    [savedIds, persist],
  );

  const toggle = useCallback(
    (id: number) => (savedIds.includes(id) ? remove(id) : save(id)),
    [savedIds, save, remove],
  );

  const value = useMemo<SavedPlacesContextValue>(
    () => ({
      savedIds,
      isSaved: (id) => savedIds.includes(id),
      save,
      remove,
      toggle,
    }),
    [savedIds, save, remove, toggle],
  );

  return (
    <SavedPlacesContext.Provider value={value}>
      {children}
    </SavedPlacesContext.Provider>
  );
}

export function useSavedPlaces() {
  const ctx = useContext(SavedPlacesContext);
  if (!ctx) {
    throw new Error("useSavedPlaces must be used inside <SavedPlacesProvider>");
  }
  return ctx;
}
