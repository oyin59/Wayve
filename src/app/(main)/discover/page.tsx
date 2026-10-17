
"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import PlaceImage from "../../../components/PlaceImage";
import FilterPanel from "../../../components/FilterPanel";
import places from "../../../data/places";
import { useArea } from "../../../providers/AreaProvider";
import type { Place, FilterPreferences } from "../../../types/place";
import {
  getDistanceBetween,
  formatPlaceProximity,
  ABUJA_AREAS,
} from "../../../lib/distance";
import { findMatches } from "../../../lib/matching";
import { readStore, subscribe } from "../../../lib/localStore";
import {
  DISCOVERY_VIBES,
  DISPLAY_NAME_KEY,
} from "../../../lib/onboarding";

export default function DiscoverPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [surpriseSpot, setSurpriseSpot] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVibe, setActiveVibe] = useState("All");
  const [filterPreferences, setFilterPreferences] =
    useState<FilterPreferences | null>(null);
  const displayName = useSyncExternalStore(
    subscribe,
    () => readStore(DISPLAY_NAME_KEY) ?? "",
    () => "",
  );
  const router = useRouter();
  const { area: currentArea, setArea: setCurrentArea } = useArea();

  // Apply the detailed filters first, if the user has selected any.
  const filteredPlaces = useMemo(() => {
    if (!filterPreferences) {
      return places;
    }

    return findMatches(filterPreferences, currentArea);
  }, [filterPreferences, currentArea]);

  // Search and detailed filters apply to the full catalogue.
  const searchedPlaces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return filteredPlaces.filter((place) => {
      const matchesSearch =
        query === "" ||
        place.name.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query) ||
        place.neighbourhood.toLowerCase().includes(query) ||
        place.vibe?.some((vibe) =>
          vibe.toLowerCase().includes(query)
        );

      return matchesSearch;
    });
  }, [filteredPlaces, searchQuery]);

  const getNearbyPlaces = (
    categoryFilter: string[],
    limit = 5,
    applyQuickVibe = false,
  ) => {
    return searchedPlaces
      .filter((place) => {
        const matchesCategory = categoryFilter.includes(place.category);
        const matchesVibe =
          !applyQuickVibe ||
          activeVibe === "All" ||
          place.vibe?.some(
            (vibe) => vibe.toLowerCase() === activeVibe.toLowerCase(),
          );
        return matchesCategory && matchesVibe;
      })
      .map((place) => ({
        ...place,
        distance: getDistanceBetween(
          currentArea,
          place.neighbourhood
        ),
      }))
      .filter((place) => place.distance !== Infinity)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  };

  const handlePlaceClick = (place: Place) => {
    router.push(`/places/${place.id}`);
  };

  const openMorePlaces = (
    category: "dining" | "cafes",
    vibe = activeVibe,
  ) => {
    router.push(
      `/discover/more/${category}/${encodeURIComponent(vibe === "All" ? "all" : vibe)}`,
    );
  };

  const surpriseCandidates = searchedPlaces;

  const handleSurpriseMe = () => {
    const availablePlaces = surpriseCandidates;

    if (availablePlaces.length === 0) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * availablePlaces.length
    );

    setSurpriseSpot(availablePlaces[randomIndex]);
    setShowSurpriseModal(true);
  };

  const handleTryAnother = () => {
    const availablePlaces = surpriseCandidates;

    if (availablePlaces.length === 0) {
      return;
    }

    const alternatives = availablePlaces.filter(
      (place) => place.id !== surpriseSpot?.id
    );

    const choices =
      alternatives.length > 0 ? alternatives : availablePlaces;

    const randomIndex = Math.floor(Math.random() * choices.length);

    setSurpriseSpot(choices[randomIndex]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveVibe("All");
    setFilterPreferences(null);
  };

  const perfectForYou = getNearbyPlaces(
    ["Attraction", "Dining", "Global", "Social", "Café", "Sweets"],
    4
  );

  const dinnerSpots = getNearbyPlaces(
    ["Dining", "Global", "Social"],
    5,
    true,
  );

  const dessertAndCafes = getNearbyPlaces(
    ["Sweets", "Café"],
    5,
    true,
  );

  const isFiltering =
    searchQuery.trim() !== "" ||
    filterPreferences !== null;

  return (
    <>
      {/* FILTER MODAL */}
      {showFilter && (
        <FilterPanel
          setShowFilter={setShowFilter}
          onApply={(preferences) => {
            setFilterPreferences(preferences);
            setActiveVibe("All");
            setShowFilter(false);
          }}
        />
      )}

      {/* LOCATION PICKER MODAL */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center">
          <div className="flex max-h-[80vh] w-full max-w-md flex-col rounded-3xl bg-white p-6 text-brown shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">
                Select your area
              </h3>

              <button
                type="button"
                onClick={() => setShowLocationPicker(false)}
                aria-label="Close location picker"
                className="text-lg font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="mb-3 text-xs text-brown/70">
              Used to show places near your area.
            </p>

            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
              {ABUJA_AREAS.map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => {
                    setCurrentArea(area);
                    setShowLocationPicker(false);
                  }}
                  className={`rounded-2xl border p-2.5 text-left text-xs transition-all ${
                    currentArea === area
                      ? "border-brown bg-brown font-semibold text-white"
                      : "border-[#29291F]/15 bg-[#E9E6D8]/30 text-brown hover:bg-[#E9E6D8]"
                  }`}
                >
                  📍 {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SURPRISE ME MODAL */}
      {showSurpriseModal && surpriseSpot && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in slide-in-from-bottom rounded-t-4xl bg-[#E9E6D8] p-6 shadow-2xl duration-300">
            <button
              type="button"
              aria-label="Close surprise spot"
              onClick={() => setShowSurpriseModal(false)}
              className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-[#303820]"
            />

            <div className="mb-4 text-center">
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brown/70">
                🎲 Your surprise spot
              </p>
            </div>

            <div className="relative mb-6 flex min-h-65 flex-col justify-end overflow-hidden rounded-3xl bg-[#29291F] p-6 text-white shadow-lg">
              {surpriseSpot.image ? (
                <PlaceImage
                  src={surpriseSpot.image}
                  alt={surpriseSpot.name}
                  className="object-cover opacity-30"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  🍜
                </div>
              )}

              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold">
                  {surpriseSpot.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-amber-200/90">
                  {surpriseSpot.known
                    ? `“${surpriseSpot.known}” · `
                    : ""}
                  {surpriseSpot.neighbourhood}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {surpriseSpot.vibe?.slice(0, 2).map((vibe) => (
                    <span
                      key={vibe}
                      className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md"
                    >
                      🕯 {vibe}
                    </span>
                  ))}
                  {surpriseSpot.status === "Unverified" && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-900">
                      Not verified by Wayve
                    </span>
                  )}

                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleTryAnother}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#29291F]/15 bg-[#D9B574] py-3.5 text-sm font-bold text-brown transition-transform active:scale-95"
              >
                🔄 Try another
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSurpriseModal(false);
                  handlePlaceClick(surpriseSpot);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brown py-3.5 text-sm font-bold text-white transition-transform active:scale-95"
              >
                Take me here →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-[#FAF7F2] pb-24 text-brown md:pb-32">
        <div className="mx-auto w-full max-w-[90rem]">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 lg:px-12 lg:py-6">
          <h1 className="font-serif text-3xl">
            Way<span className="italic text-[#D9B574]">ve</span>
          </h1>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const searchInput = document.querySelector<HTMLInputElement>(
                  'input[aria-label="Search places"]'
                );
                searchInput?.focus();
              }}
              aria-label="Focus search"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9B574]"
            >
              🔍
            </button>

            <button
              type="button"
              onClick={() => setShowLocationPicker(true)}
              className="flex max-w-35 items-center gap-1 truncate rounded-full border border-[#29291F]/15 bg-white px-3.5 py-2 text-xs font-medium shadow-sm transition-all hover:border-brown"
            >
              <span className="truncate">📍 {currentArea}</span>
              <span className="text-[10px]">⌄</span>
            </button>
          </div>
        </header>
        {/* HERO */}
        <section className="mx-4 mt-1 rounded-[1.75rem] px-1 py-2 lg:mx-12 lg:mt-3 lg:bg-white/65 lg:px-10 lg:py-9 lg:shadow-sm">
          <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
            <div>
              <p className="mb-2 text-xl font-bold tracking-tight text-brown sm:text-2xl">
                Hey, {displayName || "there"} 👋
              </p>
              <h2 className="font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Find your
                <br className="lg:hidden" />
                <span className="italic text-[#D9B574]">next</span> spot
              </h2>
            </div>

            <div className="lg:max-w-lg">
              <p className="mt-2 max-w-sm text-sm text-brown/75 sm:text-base lg:mt-0 lg:text-lg">
                Tell us the vibe. We&apos;ll show you where to go in Abuja.
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  disabled={searchedPlaces.length === 0}
                  className="rounded-xl bg-[#303820] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                >
                  🎲 Surprise me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="mt-3 px-6 lg:px-12">
          <div className="flex items-center gap-3 rounded-2xl border border-[#29291F]/12 bg-white px-4 py-4 shadow-sm">
            <span className="text-xl text-brown/60">⌕</span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search places around ${currentArea}...`}
              aria-label="Search places"
              className="min-w-0 flex-1 bg-transparent text-sm text-brown outline-none placeholder:text-[#29291F] md:text-base"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="text-sm text-brown/60"
              >
                ✕
              </button>
            )}

          </div>
        </section>

        {/* QUICK VIBES */}
        <section className="mt-5 lg:mt-8">
          <h3 className="mb-3 px-6 text-lg font-medium lg:px-12 lg:text-xl">
            What&apos;s the vibe?
          </h3>

          <div className="no-scrollbar flex touch-pan-x gap-3 overflow-x-auto px-6 pb-2 lg:flex-wrap lg:overflow-visible lg:px-12">
            {["All", ...DISCOVERY_VIBES].map((vibe) => (
              <button
                key={vibe}
                type="button"
                onClick={() => setActiveVibe(vibe)}
                aria-pressed={activeVibe === vibe}
                className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm transition ${
                  activeVibe === vibe
                    ? "border-brown bg-brown text-white"
                    : "border-[#29291F]/15 bg-white text-brown"
                }`}
              >
                {vibe === "All" && "✨ "}
                {vibe === "Aesthetic" && "✨ "}
                {vibe === "Cozy" && "🕯 "}
                {vibe}
              </button>
            ))}
          </div>
          <p className="px-6 pt-1 text-xs text-brown/75 lg:px-12">
            Quick vibes filter Dining &amp; Social and Cafés &amp; Desserts.
            Perfect for you stays unchanged.
          </p>
        </section>

        {/* MORE FILTERS */}
        <section className="mt-5 px-6 lg:px-12">
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#29291F]/15 bg-white px-5 py-4 font-medium text-brown"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">☷</span>
              More filters
              {filterPreferences && (
                <span className="rounded-full bg-[#E9E6D8] px-2 py-0.5 text-xs text-brown">
                  Applied
                </span>
              )}
            </span>
            <span>⌄</span>
          </button>
        </section>

        {/* FILTERED SEARCH RESULTS */}
        {isFiltering && (
          <section className="mx-auto mt-6 px-6 lg:px-12">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  {searchQuery.trim()
                    ? "Search results"
                    : "Your matches"}
                </h3>
                <p className="mt-1 text-sm text-brown/65">
                  {searchedPlaces.length}{" "}
                  {searchedPlaces.length === 1 ? "place" : "places"} found
                </p>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="shrink-0 pt-1 text-sm font-medium text-[#29291F] underline"
              >
                Clear
              </button>
            </div>

            {searchedPlaces.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {searchedPlaces.map((place) => (
                  <button
                    type="button"
                    key={place.id}
                    onClick={() => handlePlaceClick(place)}
                    className="wayve-card flex items-center gap-3 p-3 text-left transition hover:bg-[#FAF7F2]"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#D9B574]">
                      <PlaceImage
                        src={place.image}
                        alt={place.name}
                        category={place.category}
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-serif text-lg font-semibold">
                        {place.name}
                      </h4>
                      <p className="mt-0.5 truncate text-[13px] text-brown/80">
                        {place.category} · {place.neighbourhood}
                      </p>
                      {place.status === "Unverified" && (
                        <p className="mt-1 text-xs font-medium text-amber-800">
                          Not verified by Wayve
                        </p>
                      )}
                      <p className="mt-2 text-xs text-brown/80">
                        {place.priceTier}
                      </p>
                    </div>

                    <span className="text-lg text-[#29291F]">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#29291F]/15 bg-white/80 p-6 text-center">
                <p className="font-serif text-xl font-semibold">
                  No spots found just yet
                </p>
                <p className="mt-2 text-sm text-brown/70">
                  Try a different search, broaden your filters, or clear them.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        )}
        
        {!isFiltering && (
          <>
        {/* PERFECT FOR YOU */}
        <section className="mt-8 lg:mt-12">
          <div className="mb-4 flex items-center justify-between px-6 lg:px-12">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              ✨ Perfect for you
            </h3>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-12 xl:grid-cols-4">
            {perfectForYou.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? formatPlaceProximity(place.distance, place.neighbourhood)
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="relative flex min-h-60 min-w-70 max-w-70 cursor-pointer flex-col justify-between rounded-3xl border border-[#29291F]/15 bg-white p-5 text-[#29291F] shadow-sm transition hover:shadow-md lg:min-w-0 lg:max-w-none"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <span className="rounded-full bg-[#E9E6D8] px-3 py-1 text-xs font-semibold tracking-wider">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D9B574]/70 text-xs">
                      📍
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl font-bold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 text-xs font-medium text-brown/75">
                      📍{" "}
                      {place.distance === 0
                        ? distance
                        : `${place.neighbourhood}${distance ? ` · ${distance}` : ""}`}
                    </p>
                    {place.status === "Unverified" && (
                      <p className="mt-1 text-xs font-medium text-amber-800">
                        Not verified by Wayve
                      </p>
                    )}

                    <p className="mt-1 line-clamp-2 text-xs italic text-brown/75">
                      {place.known ? `“${place.known}”` : place.category}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {place.vibe?.slice(0, 2).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#E9E6D8] px-2.5 py-1 text-xs text-brown"
                          >
                            {vibe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* DINING & SOCIAL */}
        <section className="mt-8 lg:mt-12">
          <div className="mb-3 flex items-center justify-between px-6 lg:px-12">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              🍽️ Dining &amp; Social
            </h3>

            <button
              type="button"
              onClick={() => openMorePlaces("dining")}
              className="text-sm font-medium text-[#29291F]"
            >
              See all →
            </button>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-12 xl:grid-cols-4">
            {dinnerSpots.length === 0 ? (
              <div className="min-w-full rounded-3xl border border-[#29291F]/15 bg-white/85 p-5 text-sm lg:col-span-full lg:min-w-0">
                <p>
                  No dining or social spots found nearby.
                </p>
                <button
                  type="button"
                  onClick={() => openMorePlaces("dining", "All")}
                  className="mt-3 font-medium text-[#29291F] underline"
                >
                  Browse all Dining &amp; Social →
                </button>
              </div>
            ) : dinnerSpots.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? formatPlaceProximity(place.distance, place.neighbourhood)
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="wayve-card flex min-w-52.5 max-w-52.5 cursor-pointer flex-col justify-between overflow-hidden lg:min-w-0 lg:max-w-none"
                >
                  <div className="relative flex h-32 items-center justify-center bg-[#E9E6D8] p-2">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <PlaceImage
                      src={place.image}
                      alt={place.name}
                      category={place.category}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="truncate font-serif text-lg font-semibold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 truncate text-xs font-medium text-brown/80">
                      📍{" "}
                      {place.distance === 0
                        ? distance
                        : `${place.neighbourhood}${distance ? ` · ${distance}` : ""}`}
                    </p>
                    {place.status === "Unverified" && (
                      <p className="mt-1 text-xs font-medium text-amber-800">
                        Not verified by Wayve
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {place.vibe?.slice(0, 1).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#E9E6D8] px-2 py-1 text-xs text-brown/90"
                          >
                            {vibe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* CAFÉS & DESSERTS */}
        <section className="mt-8 lg:mt-12">
          <div className="mb-3 flex items-center justify-between px-6 lg:px-12">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              ☕ Cafés &amp; Desserts
            </h3>

            <button
              type="button"
              onClick={() => openMorePlaces("cafes")}
              className="text-sm font-medium text-[#29291F]"
            >
              See all →
            </button>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-12 xl:grid-cols-4">
            {dessertAndCafes.length === 0 ? (
              <div className="min-w-full rounded-3xl border border-[#29291F]/15 bg-white/85 p-5 text-sm lg:col-span-full lg:min-w-0">
                <p>
                  No cafés or desserts found nearby.
                </p>
                <button
                  type="button"
                  onClick={() => openMorePlaces("cafes", "All")}
                  className="mt-3 font-medium text-[#29291F] underline"
                >
                  Browse all Cafés &amp; Desserts →
                </button>
              </div>
            ) : dessertAndCafes.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? formatPlaceProximity(place.distance, place.neighbourhood)
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="wayve-card flex min-w-52.5 max-w-52.5 cursor-pointer flex-col justify-between overflow-hidden lg:min-w-0 lg:max-w-none"
                >
                  <div className="relative flex h-32 items-center justify-center bg-[#E9E6D8] p-2">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <PlaceImage
                      src={place.image}
                      alt={place.name}
                      category={place.category}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="truncate font-serif text-lg font-semibold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 truncate text-xs font-medium text-brown/80">
                      📍{" "}
                      {place.distance === 0
                        ? distance
                        : `${place.neighbourhood}${distance ? ` · ${distance}` : ""}`}
                    </p>
                    {place.status === "Unverified" && (
                      <p className="mt-1 text-xs font-medium text-amber-800">
                        Not verified by Wayve
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {place.vibe?.slice(0, 1).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#E9E6D8] px-2 py-1 text-xs text-brown/90"
                          >
                            {vibe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
          </>
        )}
      </div>
      </div>
    </>
  );
}
