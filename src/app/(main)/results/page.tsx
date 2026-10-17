
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceImage from "../../../components/PlaceImage";
import FilterPanel from "../../../components/FilterPanel";
import {
  formatPlaceProximity,
  getDistanceBetween,
} from "../../../lib/distance";
import { findMatches, FILTER_KEYS } from "../../../lib/matching";
import { useArea } from "../../../providers/AreaProvider";
import type { FilterPreferences } from "../../../types/place";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { area: currentArea } = useArea();
  const [showFilter, setShowFilter] = useState(false);

  const prefs = Object.fromEntries(
    FILTER_KEYS.map((key) => [
      key,
      searchParams.get(key) ?? "",
    ])
  ) as unknown as FilterPreferences;

  const hasFilterPreferences = FILTER_KEYS.some((key) =>
    searchParams.has(key),
  );

  const matches = hasFilterPreferences
    ? findMatches(prefs, currentArea)
    : [];

  const getLocationLabel = (placeArea: string) => {
    const distance = getDistanceBetween(currentArea, placeArea);

    if (distance === Infinity) return placeArea;
    return formatPlaceProximity(distance, placeArea);
  };

  return (
    <>
      {showFilter && (
        <FilterPanel setShowFilter={setShowFilter} />
      )}

      <div className="min-h-screen bg-[#FAF7F2] p-4 pb-24 text-[#29291F]">
        <header className="mb-4 flex items-center justify-between rounded-3xl bg-[#303820] px-5 py-4 shadow-sm">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#29291F]">
            Wayve
          </h1>

          <div className="flex max-w-[120px] items-center gap-1.5 truncate rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#29291F] shadow-sm">
            <span>📍</span>
            <span className="truncate">{currentArea}</span>
          </div>
        </header>

        <button
          type="button"
          onClick={() => router.push("/discover")}
          className="mb-4 flex items-center gap-1 text-sm text-[#29291F]/70"
        >
          ← Back to Discover
        </button>

        <div className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-[#D9B574] px-3.5 py-2 text-xs font-medium text-[#29291F]">
          <span>✨</span>
          <span>
            Here are {matches.length} great{" "}
            {matches.length === 1 ? "match" : "matches"} for you
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {matches.length > 0 ? (
            matches.map((place) => {
              const locationLabel = getLocationLabel(
                place.neighbourhood
              );

              return (
                <div
                  key={place.id}
                  className="wayve-card flex cursor-pointer flex-col justify-between overflow-hidden"
                  onClick={() => router.push(`/places/${place.id}`)}
                >
                  <div>
                    <div className="relative h-44 w-full bg-[#E9E6D8]">
                      <PlaceImage
                        src={place.image}
                        alt={place.name}
                        category={place.category}
                        sizes="(max-width: 640px) 100vw, 448px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-lg font-semibold leading-snug">
                            {place.name}
                          </h3>

                          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#29291F]/80">
                            <span>📍</span>
                            {locationLabel}
                          </p>
                        </div>

                        <span className="text-base text-[#29291F]">
                          →
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {place.vibe?.map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#E9E6D8] px-2.5 py-1 text-xs text-[#29291F]"
                          >
                            {vibe}
                          </span>
                        ))}
                      </div>

                      {place.priceTier && (
                        <div className="flex items-center gap-1 text-[13px] text-[#29291F]/85">
                          <span>💳</span>
                          <span>{place.priceTier}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (place.address) {
                          const query = encodeURIComponent(
                            `${place.name} ${place.address}`
                          );

                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${query}`,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                      className="flex w-full items-center justify-center gap-1 rounded-xl bg-[#29291F] py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      <span>Search in Google Maps</span>

                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-[#29291F]/10 bg-white p-6 text-center">
              <p className="font-serif text-xl font-semibold">
                No matches found
              </p>

              <p className="mt-2 text-sm text-[#29291F]/70">
                Try changing your preferences to discover more places.
              </p>

              <button
                type="button"
                onClick={() => setShowFilter(true)}
                className="mt-4 rounded-xl bg-[#29291F] px-5 py-3 text-sm font-semibold text-white"
              >
                Change filters
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilter(true)}
          className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#29291F] py-4 text-sm font-semibold text-[#D9B574] shadow-sm transition-opacity hover:opacity-90"
        >
          <span>Change filters</span>

          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#FAF7F2]" />}
    >
      <ResultsContent />
    </Suspense>
  );
}
