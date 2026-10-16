"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ABUJA_AREAS } from "@/lib/distance";
import { readStore, subscribe, writeStore } from "@/lib/localStore";
import { DISPLAY_NAME_KEY } from "@/lib/onboarding";
import { useArea } from "@/providers/AreaProvider";
import { useSavedPlaces } from "@/providers/SavedPlacesProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { area, setArea } = useArea();
  const { savedIds } = useSavedPlaces();
  const displayName = useSyncExternalStore(
    subscribe,
    () => readStore(DISPLAY_NAME_KEY) ?? "",
    () => "",
  );
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  const saveName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    writeStore(DISPLAY_NAME_KEY, nameDraft.trim());
    setEditingName(false);
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] pb-24 text-brown">
      <header className="mx-auto max-w-md px-5 pb-5 pt-8">
        <h1 className="font-serif text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-brown/55">
          Your Wayve preferences on this device.
        </p>
      </header>

      <main className="mx-auto max-w-md space-y-5 px-5">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#C4DAE8] font-serif text-2xl font-bold"
            >
              {displayName ? displayName.charAt(0).toUpperCase() : "W"}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-serif text-xl font-bold">
                {displayName || "Welcome to Wayve"}
              </h2>
              <p className="mt-1 text-xs text-brown/55">
                No account required. Your preferences stay in this browser.
              </p>
            </div>
          </div>

          {editingName ? (
            <form onSubmit={saveName} className="mt-5 space-y-3">
              <label htmlFor="display-name" className="block text-sm font-medium">
                Name (optional)
              </label>
              <input
                id="display-name"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                maxLength={40}
                autoComplete="name"
                className="w-full rounded-xl border border-[#E6D56D] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#8DBBD4]"
                placeholder="What should we call you?"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-brown py-3 text-sm font-semibold text-white"
                >
                  Save name
                </button>
                <button
                  type="button"
                  onClick={() => setEditingName(false)}
                  className="rounded-xl border border-brown/15 px-4 py-3 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setNameDraft(displayName);
                setEditingName(true);
              }}
              className="mt-5 w-full rounded-xl border border-brown/15 px-4 py-3 text-sm font-medium"
            >
              {displayName ? "Edit name" : "Add a name"}
            </button>
          )}
        </section>

        <section aria-labelledby="preferences-heading">
          <h2
            id="preferences-heading"
            className="mb-3 font-serif text-xl font-bold"
          >
            Preferences
          </h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setShowAreaPicker(true)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span>
                <span className="block text-sm font-semibold">Your area</span>
                <span className="mt-1 block text-xs text-brown/55">
                  Used to estimate distance to places
                </span>
              </span>
              <span className="ml-3 text-right text-sm font-medium">
                {area} <span aria-hidden="true">›</span>
              </span>
            </button>
            <div className="border-t border-brown/10">
              <button
                type="button"
                onClick={() => router.push("/saved")}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span>
                  <span className="block text-sm font-semibold">Saved places</span>
                  <span className="mt-1 block text-xs text-brown/55">
                    Stored in this browser; not synced between devices
                  </span>
                </span>
                <span className="ml-3 text-sm font-medium">
                  {savedIds.length} <span aria-hidden="true">›</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="privacy-heading"
          className="rounded-2xl border border-[#E6D56D] bg-white/70 p-4"
        >
          <h2 id="privacy-heading" className="font-semibold">
            Your data
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brown/70">
            Wayve stores your chosen area, saved place IDs, and optional display
            name in this browser so they remain after refresh. There is no
            account or cross-device sync in this version. Clearing this
            browser&apos;s site data removes these preferences.
          </p>
          <p className="mt-3 text-xs text-brown/55">
            Contact and feedback details have not been set up yet.
          </p>
        </section>
      </main>

      {showAreaPicker && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowAreaPicker(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="area-picker-heading"
            className="flex max-h-[80vh] w-full max-w-md flex-col rounded-3xl bg-white p-5 text-brown shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="area-picker-heading"
                className="font-serif text-xl font-bold"
              >
                Choose your area
              </h2>
              <button
                type="button"
                onClick={() => setShowAreaPicker(false)}
                aria-label="Close area picker"
                className="rounded-full px-3 py-1 text-xl text-brown/60"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto">
              {ABUJA_AREAS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={area === option}
                  onClick={() => {
                    setArea(option);
                    setShowAreaPicker(false);
                  }}
                  className={`rounded-xl border px-3 py-3 text-left text-sm ${
                    area === option
                      ? "border-brown bg-brown font-semibold text-white"
                      : "border-[#E6D56D] bg-[#FCF1D0]/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
