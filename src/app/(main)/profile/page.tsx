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
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#29291F]">
      <div className="mx-auto max-w-2xl space-y-6 px-5 pb-8 pt-6 sm:px-8">
        <header className="relative overflow-hidden rounded-[2rem] bg-[#303820] p-6 shadow-sm sm:p-8">
          <span
            aria-hidden="true"
            className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[20px] border-white/25"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-16 right-24 h-36 w-36 rounded-full bg-white/20"
          />
          <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-[#29291F]">
            Your Wayve
          </p>

          <section className="relative mt-4 rounded-3xl bg-white/85 p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#29291F] font-serif text-3xl font-bold text-[#EE858B] shadow-sm"
              >
                {displayName ? displayName.charAt(0).toUpperCase() : "W"}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="truncate font-serif text-2xl font-bold sm:text-3xl">
                  {displayName ? `Hi, ${displayName}` : "Make it yours"}
                </h1>
                <p className="mt-1 text-sm text-[#29291F]/75">
                  Your area and saved spots, all in one place.
                </p>
              </div>
              <div className="hidden shrink-0 rounded-2xl bg-[#F1E8E3] px-3 py-2 text-center sm:block">
                <p className="font-serif text-xl font-bold">{savedIds.length}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#29291F]">
                  Saved
                </p>
              </div>
            </div>

            {editingName ? (
              <form onSubmit={saveName} className="mt-5 space-y-3">
                <label
                  htmlFor="display-name"
                  className="block text-sm font-semibold"
                >
                  What should we call you?
                </label>
                <input
                  id="display-name"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  maxLength={40}
                  autoComplete="name"
                  className="min-h-12 w-full rounded-xl border border-[#29291F]/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#29291F]"
                  placeholder="Your name (optional)"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="min-h-11 flex-1 rounded-xl bg-[#29291F] py-3 text-sm font-semibold text-white transition hover:bg-[#29291F]"
                  >
                    Save name
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingName(false)}
                    className="min-h-11 rounded-xl border border-[#29291F]/15 px-4 py-3 text-sm font-medium"
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
                className="mt-5 min-h-11 rounded-xl border border-[#29291F]/25 bg-[#F1E8E3] px-4 py-2.5 text-sm font-semibold text-[#29291F] transition hover:bg-[#F1E8E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29291F]"
              >
                {displayName ? "Edit name" : "Add your name"}
                <span aria-hidden="true" className="ml-2 text-[#29291F]">
                  →
                </span>
              </button>
            )}
          </section>
        </header>

        <section aria-labelledby="preferences-heading">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#29291F]">
                Make it feel like you
              </p>
              <h2
                id="preferences-heading"
                className="mt-1 font-serif text-2xl font-bold"
              >
                Preferences
              </h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#29291F]/15 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setShowAreaPicker(true)}
              className="flex min-h-[5.5rem] w-full items-center gap-4 p-4 text-left transition hover:bg-[#F1E8E3] sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#303820] text-lg">
                📍
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Your area</span>
                <span className="mt-1 block text-xs text-[#29291F]/65">
                  Used to show nearby places
                </span>
              </span>
              <span className="text-right text-sm font-semibold">
                {area}
              </span>
              <span aria-hidden="true" className="text-xl text-[#29291F]">
                ›
              </span>
            </button>
            <div className="mx-4 border-t border-[#29291F]/15 sm:mx-5" />
            <button
              type="button"
              onClick={() => router.push("/saved")}
              className="flex min-h-[5.5rem] w-full items-center gap-4 p-4 text-left transition hover:bg-[#F1E8E3] sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#303820] text-xl">
                ♡
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Saved places</span>
                <span className="mt-1 block text-xs text-[#29291F]/65">
                  Your shortlist of places to visit
                </span>
              </span>
              <span className="rounded-full bg-[#F1E8E3] px-3 py-1 text-sm font-bold">
                {savedIds.length}
              </span>
              <span aria-hidden="true" className="text-xl text-[#29291F]">
                ›
              </span>
            </button>
          </div>
        </section>

        <aside className="flex items-start gap-3 rounded-3xl border border-[#29291F]/15 bg-[#F1E8E3] p-4 sm:p-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#29291F]">
            ✓
          </span>
          <div>
            <h2 className="text-sm font-semibold">Your choices stay here</h2>
            <p className="mt-1 text-sm leading-relaxed text-[#29291F]/75">
              Your name, area and saved places are kept in this browser.
            </p>
          </div>
        </aside>
      </div>

      {showAreaPicker && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#29291F]/45 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowAreaPicker(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="area-picker-heading"
            className="flex max-h-[80vh] w-full max-w-md flex-col rounded-3xl bg-white p-5 text-[#29291F] shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#29291F]">
                  Discover nearby
                </p>
                <h2
                  id="area-picker-heading"
                  className="mt-1 font-serif text-xl font-bold"
                >
                  Choose your area
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAreaPicker(false)}
                aria-label="Close area picker"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1E8E3] text-xl text-[#29291F]/70"
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
                  className={`min-h-11 rounded-xl border px-3 py-3 text-left text-sm transition ${
                    area === option
                      ? "border-[#29291F] bg-[#29291F] font-semibold text-white"
                      : "border-[#29291F]/15 bg-[#F1E8E3] hover:bg-[#F1E8E3]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
