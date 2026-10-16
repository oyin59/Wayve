
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useArea } from "../providers/AreaProvider";
import type { FilterPreferences } from "../types/place";

interface FilterPanelProps {
  setShowFilter: (show: boolean) => void;
  onApply?: (preferences: FilterPreferences) => void;
}

const occasions = [
  "Solo date",
  "Girls day",
  "Group hangout",
  "Date night",
  "Birthday dinner",
  "After-church",
];

const vibes = ["Chill", "Aesthetic", "Lively", "Cozy", "Upscale"];

const budgets = ["Budget", "Mid-Range", "Splurge"];

const pictureOptions = ["Yes", "Somewhat", "Doesn't matter"];

const distances = [
  "Just around the corner (~3.5km)",
  "A short drive/ride (~7km)",
  "Worth the trip (~15km)",
  "Anywhere in the city (no limit)",
];

export default function FilterPanel({
  setShowFilter,
  onApply,
}: FilterPanelProps) {
  const router = useRouter();
  const { area } = useArea();

  const [occasion, setOccasion] = useState("");
  const [vibe, setVibe] = useState("");
  const [budget, setBudget] = useState("");
  const [pictures, setPictures] = useState("");
  const [distance, setDistance] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!occasion || !vibe || !budget || !pictures || !distance) {
      setError("Please answer all five questions before searching.");
      return;
    }

    const preferences: FilterPreferences = {
      occasion,
      vibe,
      budget,
      pictures,
      distance,
    };

    setError("");

    // Discover applies the filters on the current page.
    if (onApply) {
      onApply(preferences);
      return;
    }

    // If opened from Results, keep the existing Results navigation.
    setShowFilter(false);

    const params = new URLSearchParams({
      ...preferences,
      area,
    });

    router.push(`/results?${params.toString()}`);
  };

  const renderOptions = (
    options: string[],
    selected: string,
    onSelect: (value: string) => void,
  ) => (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {options.map((option) => {
        const isSelected = selected === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              onSelect(option);
              setError("");
            }}
            className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
              isSelected
                ? "border-[#432F2E] bg-[#432F2E] text-white"
                : "border-[#E6D56D]/70 bg-white text-[#432F2E] hover:bg-[#FFF0B5]"
            }`}
          >
            {isSelected && <span className="mr-1">✓</span>}
            {option}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#432F2E]/50 sm:items-center sm:p-4"
      onClick={() => setShowFilter(false)}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-heading"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-[28px] bg-[#FCF1D0] px-5 pb-8 pt-5 text-[#432F2E] sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8DBBD4]">
              Make it your own
            </p>

            <h2
              id="filter-heading"
              className="mt-1 font-serif text-3xl font-semibold"
            >
              Find your spot
            </h2>

            <p className="mt-2 text-sm text-[#432F2E]/65">
              Tell us what you have in mind.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilter(false)}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold">1. What&apos;s the occasion?</h3>
            {renderOptions(occasions, occasion, setOccasion)}
          </div>

          <div>
            <h3 className="font-semibold">2. What kind of vibe?</h3>
            {renderOptions(vibes, vibe, setVibe)}
          </div>

          <div>
            <h3 className="font-semibold">3. What&apos;s your budget?</h3>
            {renderOptions(budgets, budget, setBudget)}
          </div>

          <div>
            <h3 className="font-semibold">
              4. How important are pictures?
            </h3>
            {renderOptions(pictureOptions, pictures, setPictures)}
          </div>

          <div>
            <h3 className="font-semibold">5. How far would you go?</h3>
            <div className="mt-3 space-y-2">
              {distances.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setDistance(option);
                    setError("");
                  }}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                    distance === option
                      ? "border-[#432F2E] bg-[#432F2E] text-white"
                      : "border-[#E6D56D]/70 bg-white text-[#432F2E] hover:bg-[#FFF0B5]"
                  }`}
                >
                  {distance === option ? "✓ " : ""}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#432F2E] py-4 font-semibold text-white transition hover:opacity-90"
          >
            Find my spots
          </button>

          <button
            type="button"
            onClick={() => {
              setOccasion("");
              setVibe("");
              setBudget("");
              setPictures("");
              setDistance("");
              setError("");
            }}
            className="w-full py-2 text-sm text-[#432F2E]/65 underline"
          >
            Clear selections
          </button>
        </form>
      </section>
    </div>
  );
}
