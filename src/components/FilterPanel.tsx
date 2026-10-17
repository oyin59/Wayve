
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

const pictureOptions = ["Yes", "Somewhat"];

const distances = [
  "Nearby (up to ~3.5 km)",
  "Within ~7 km",
  "Within ~15 km",
  "Anywhere in Abuja (no limit)",
];

export default function FilterPanel({
  setShowFilter,
  onApply,
}: FilterPanelProps) {
  const router = useRouter();
  const { area } = useArea();

  const [occasion, setOccasion] = useState("Any");
  const [vibe, setVibe] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [pictures, setPictures] = useState("Any");
  const [distance, setDistance] = useState("Anywhere in Abuja (no limit)");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preferences: FilterPreferences = {
      occasion,
      vibe,
      budget,
      pictures,
      distance,
    };

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
    anyLabel: string,
  ) => (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {[{ value: "Any", label: anyLabel }, ...options.map((option) => ({
        value: option,
        label: option,
      }))].map(({ value, label }) => {
        const isSelected = selected === value;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(value)}
            className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
              isSelected
                ? "border-[#29291F] bg-[#29291F] text-white"
                : "border-[#29291F]/15 bg-white text-[#29291F] hover:bg-[#F1E8E3]"
            }`}
          >
            {isSelected && <span aria-hidden="true" className="mr-1">✓</span>}
            {label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#29291F]/50 sm:items-center sm:p-4"
      onClick={() => setShowFilter(false)}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-heading"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-[28px] bg-[#F1E8E3] px-5 pb-8 pt-5 text-[#29291F] sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#29291F]">
              Make it your own
            </p>

            <h2
              id="filter-heading"
              className="mt-1 font-serif text-3xl font-semibold"
            >
              Find your spot
            </h2>

            <p className="mt-2 text-sm text-[#29291F]/65">
              Choose what matters. Leave the rest on Any.
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
            {renderOptions(occasions, occasion, setOccasion, "Any occasion")}
          </div>

          <div>
            <h3 className="font-semibold">2. What kind of vibe?</h3>
            {renderOptions(vibes, vibe, setVibe, "Any vibe")}
          </div>

          <div>
            <h3 className="font-semibold">3. What&apos;s your budget?</h3>
            {renderOptions(budgets, budget, setBudget, "Any budget")}
          </div>

          <div>
            <h3 className="font-semibold">
              4. How important are pictures?
            </h3>
            {renderOptions(pictureOptions, pictures, setPictures, "Any preference")}
          </div>

          <div>
            <h3 className="font-semibold">5. How far would you go?</h3>
            <p className="mt-1 text-xs text-[#29291F]/60">
              Distance from your selected area.
            </p>
            <div className="mt-3 space-y-2">
              {distances.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={distance === option}
                  onClick={() => {
                    setDistance(option);
                  }}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                    distance === option
                      ? "border-[#29291F] bg-[#29291F] text-white"
                      : "border-[#29291F]/15 bg-white text-[#29291F] hover:bg-[#F1E8E3]"
                  }`}
                >
                  {distance === option ? "✓ " : ""}
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#29291F] py-4 font-semibold text-white transition hover:opacity-90"
          >
            Find my spots
          </button>

          <button
            type="button"
            onClick={() => {
              setOccasion("Any");
              setVibe("Any");
              setBudget("Any");
              setPictures("Any");
              setDistance("Anywhere in Abuja (no limit)");
            }}
            className="w-full py-2 text-sm font-medium text-[#29291F] underline"
          >
            Reset to any
          </button>
        </form>
      </section>
    </div>
  );
}
