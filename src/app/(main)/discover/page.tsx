
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
  ABUJA_AREAS,
} from "../../../lib/distance";
import { findMatches } from "../../../lib/matching";
import { readStore, subscribe } from "../../../lib/localStore";
import {
  DISCOVERY_VIBES,
  DISPLAY_NAME_KEY,
  parsePreferredVibes,
  PREFERRED_VIBES_KEY,
} from "../../../lib/onboarding";

export default function DiscoverPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [showWayvePicks, setShowWayvePicks] = useState(false);
  const [surpriseSpot, setSurpriseSpot] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVibe, setActiveVibe] = useState("All");
  const [expandedCategory, setExpandedCategory] =
  useState<"dining" | "cafes" | null>(null);
  const [filterPreferences, setFilterPreferences] =
    useState<FilterPreferences | null>(null);
  const displayName = useSyncExternalStore(
    subscribe,
    () => readStore(DISPLAY_NAME_KEY) ?? "",
    () => "",
  );
  const preferredVibesRaw = useSyncExternalStore(
    subscribe,
    () => readStore(PREFERRED_VIBES_KEY) ?? "[]",
    () => "[]",
  );
  const preferredVibes = useMemo(
    () => parsePreferredVibes(preferredVibesRaw),
    [preferredVibesRaw],
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

  // Apply the search field and quick-vibe selection.
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

      const matchesVibe =
        activeVibe === "All" ||
        place.vibe?.some((vibe) =>
          vibe.toLowerCase().includes(activeVibe.toLowerCase())
        );

      return matchesSearch && matchesVibe;
    });
  }, [filteredPlaces, searchQuery, activeVibe]);

  // Calculate nearby places, using the current filtered list.
  const getNearbyPlaces = (
    categoryFilter: string[],
    limit = 5
  ) => {
    return searchedPlaces
      .filter((place) => categoryFilter.includes(place.category))
      .map((place) => ({
        ...place,
        distance: getDistanceBetween(
          currentArea,
          place.neighbourhood
        ),
      }))
      .filter((place) => place.distance !== Infinity)
      .sort((a, b) => {
        const getPreferenceScore = (vibes: string[]) =>
          vibes.filter((vibe) =>
            preferredVibes.some(
              (preference) =>
                preference.toLowerCase() === vibe.toLowerCase(),
            ),
          ).length;

        const preferenceDifference =
          getPreferenceScore(b.vibe) - getPreferenceScore(a.vibe);
        return preferenceDifference || a.distance - b.distance;
      })
      .slice(0, limit);
  };

  const handlePlaceClick = (place: Place) => {
    router.push(`/places/${place.id}`);
  };

  const preferredPlaces = preferredVibes.length > 0
    ? searchedPlaces.filter((place) =>
        place.vibe.some((vibe) =>
          preferredVibes.some(
            (preference) =>
              preference.toLowerCase() === vibe.toLowerCase(),
          ),
        ),
      )
    : [];
  const surpriseCandidates =
    preferredPlaces.length > 0 ? preferredPlaces : searchedPlaces;

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
    ["Dining", "Global", "Social", "Café", "Sweets"],
    4
  );

  const dinnerSpots = getNearbyPlaces(
    ["Dining", "Global", "Social"],
    5
  );

  const dessertAndCafes = getNearbyPlaces(
    ["Sweets", "Café"],
    5
  );

  const wayvePicks = places.filter((place) => place.known).slice(0, 4);

  const isFiltering =
    searchQuery.trim() !== "" ||
    activeVibe !== "All" ||
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
              Distances will calculate from your selected area across Abuja.
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
                      : "border-[#E6D56D] bg-[#FCF1D0]/30 text-brown hover:bg-[#FCF1D0]"
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
          <div className="w-full max-w-md animate-in slide-in-from-bottom rounded-t-4xl bg-[#FCF1D0] p-6 shadow-2xl duration-300">
            <button
              type="button"
              aria-label="Close surprise spot"
              onClick={() => setShowSurpriseModal(false)}
              className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-[#E6D56D]"
            />

            <div className="mb-4 text-center">
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brown/70">
                🎲 Your surprise spot
              </p>
            </div>

            <div className="relative mb-6 flex min-h-65 flex-col justify-end overflow-hidden rounded-3xl bg-[#2E1E1A] p-6 text-white shadow-lg">
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

                  <span className="rounded-full border border-emerald-500/30 bg-emerald-900/80 px-3 py-1 text-xs text-emerald-200">
                    {surpriseSpot.status ?? "Place"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleTryAnother}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6D56D] bg-[#FFF0B5] py-3.5 text-sm font-bold text-brown transition-transform active:scale-95"
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
      <div className="min-h-screen bg-[#FCF1D0] pb-24 text-brown">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4">
          <h1 className="font-serif text-3xl">
            Way<span className="italic text-[#8DBBD4]">ve</span>
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0B5]"
            >
              🔍
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0B5]"
            >
              🔔
            </button>

            <button
              type="button"
              onClick={() => setShowLocationPicker(true)}
              className="flex max-w-35 items-center gap-1 truncate rounded-full border border-[#E6D56D] bg-white px-3.5 py-2 text-xs font-medium shadow-sm transition-all hover:border-brown"
            >
              <span className="truncate">📍 {currentArea}</span>
              <span className="text-[10px]">⌄</span>
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="px-6 pt-4">
          {displayName && (
            <p className="mb-2 text-sm font-semibold text-brown/65">
              Hi, {displayName}!
            </p>
          )}
          <h2 className="font-serif text-5xl leading-tight">
            Find your
            <br />
            <span className="italic text-[#8DBBD4]">next</span> spot
          </h2>

          <p className="mt-2 text-lg text-brown/80">
            Tell us the vibe. We&apos;ll show you where to go in Abuja.
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleSurpriseMe}
              disabled={searchedPlaces.length === 0}
              className="rounded-full bg-brown px-5 py-3 font-medium text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50"
            >
              🎲 Surprise me
            </button>

            <button
              type="button"
              onClick={() => router.push("/businesses")}
              className="rounded-full border border-[#E6D56D] bg-white px-5 py-3 font-medium text-brown shadow-sm transition-transform hover:bg-[#FFF0B5]/40 active:scale-95"
            >
              🏪 Businesses
            </button>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="mt-6 px-6">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E6D56D] bg-white px-4 py-4 shadow-sm">
            <span className="text-xl text-brown/60">⌕</span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search places around ${currentArea}...`}
              aria-label="Search places"
              className="min-w-0 flex-1 bg-transparent text-sm text-brown outline-none placeholder:text-[#967F78] md:text-base"
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

            <span className="shrink-0 rounded-full bg-[#F1F7FA] px-3 py-1 text-xs font-semibold text-[#8DBBD4]">
              AI ✦
            </span>
          </div>
        </section>

        {/* QUICK VIBES */}
        <section className="mt-7">
          <h3 className="mb-3 px-6 text-lg font-medium">
            Quick vibes
          </h3>

          <div className="flex gap-3 overflow-x-auto px-6 pb-2">
            {["All", ...DISCOVERY_VIBES].map((vibe) => (
              <button
                key={vibe}
                type="button"
                onClick={() => setActiveVibe(vibe)}
                aria-pressed={activeVibe === vibe}
                className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm transition ${
                  activeVibe === vibe
                    ? "border-brown bg-brown text-white"
                    : "border-[#E6D56D] bg-white text-brown"
                }`}
              >
                {vibe === "All" && "✨ "}
                {vibe === "Aesthetic" && "✨ "}
                {vibe === "Cozy" && "🕯 "}
                {vibe === "Rooftop" && "🌆 "}
                {vibe}
              </button>
            ))}
          </div>
        </section>

        {/* MORE FILTERS */}
        <section className="mt-5 px-6">
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#E6D56D] bg-white px-5 py-4 font-medium text-brown"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">☷</span>
              More filters
              {filterPreferences && (
                <span className="rounded-full bg-[#F1F7FA] px-2 py-0.5 text-xs text-brown">
                  Applied
                </span>
              )}
            </span>
            <span>⌄</span>
          </button>
        </section>

        {/* FILTERED SEARCH RESULTS */}
        {isFiltering && (
          <section className="mt-6 px-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  {searchQuery.trim()
                    ? "Search results"
                    : activeVibe !== "All"
                    ? `${activeVibe} spots`
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
                className="shrink-0 pt-1 text-sm font-medium text-[#8DBBD4] underline"
              >
                Clear
              </button>
            </div>

            {searchedPlaces.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {searchedPlaces.map((place) => (
                  <button
                    type="button"
                    key={place.id}
                    onClick={() => handlePlaceClick(place)}
                    className="flex items-center gap-3 rounded-2xl border border-[#E6D56D] bg-white p-3 text-left shadow-sm transition hover:bg-[#FFF9E8]"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FFF0B5]">
                      <PlaceImage
                        src={place.image}
                        alt={place.name}
                        className="object-cover"
                        fallback={
                          <span className="flex h-full items-center justify-center text-2xl">
                            📍
                          </span>
                        }
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-serif text-lg font-semibold">
                        {place.name}
                      </h4>
                      <p className="mt-0.5 truncate text-xs text-brown/65">
                        {place.category} · {place.neighbourhood}
                      </p>
                      <p className="mt-2 text-xs text-brown/80">
                        {place.priceTier}
                      </p>
                    </div>

                    <span className="text-lg text-[#8DBBD4]">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#E6D56D] bg-white/70 p-6 text-center">
                <p className="font-serif text-xl font-semibold">
                  No spots found just yet
                </p>
                <p className="mt-2 text-sm text-brown/70">
                  Try another vibe, change your search, or clear your filters.
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
        {/* BASED ON YOUR VIBE */}
        <section className="mt-4 px-6">
          <div className="flex items-center justify-between rounded-2xl border border-[#E6D56D]/60 bg-white/60 px-4 py-3 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <span>✨</span>
              <span className="text-brown/70">Based on your vibe:</span>
              <span className="truncate font-semibold text-[#8DBBD4]">
                {activeVibe !== "All"
                  ? activeVibe
                  : preferredVibes.length > 0
                    ? preferredVibes.join(" · ")
                    : "Anything goes"}
              </span>
            </div>

            <span className="shrink-0 text-xs text-brown/50">
              {searchedPlaces.length} spots
            </span>
          </div>
        </section>

        {/* WAYVE PICKS */}
        <section className="mt-4 px-6">
          <button
            type="button"
            aria-expanded={showWayvePicks}
            onClick={() => setShowWayvePicks((isOpen) => !isOpen)}
            className="flex w-full items-center justify-between rounded-3xl bg-[#2E1E1A] p-5 text-left text-white shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                📰
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                  Staff favorites · Editor&apos;s choice
                </p>
                <h4 className="mt-0.5 font-serif text-lg font-bold">
                  This week&apos;s hand-picked Abuja spots
                </h4>
                <p className="mt-0.5 text-xs text-white/60">
                  Selected by real people on the Wayve team
                </p>
              </div>
            </div>

            <span className="text-lg text-white/50">{showWayvePicks ? "⌃" : "›"}</span>
          </button>

          {showWayvePicks && (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {wayvePicks.length > 0 ? (
                wayvePicks.map((place) => (
                  <button
                    type="button"
                    key={place.id}
                    onClick={() => handlePlaceClick(place)}
                    className="flex items-center gap-3 rounded-2xl border border-[#E6D56D] bg-white p-3 text-left shadow-sm transition hover:bg-[#FFF9E8]"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#FFF0B5]">
                      <PlaceImage
                        src={place.image}
                        alt={place.name}
                        className="object-cover"
                        fallback={
                          <span className="flex h-full items-center justify-center text-2xl">
                            📍
                          </span>
                        }
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-serif text-lg font-semibold">
                        {place.name}
                      </h4>
                      <p className="truncate text-xs text-brown/65">
                        {place.category} · {place.neighbourhood}
                      </p>
                    </div>
                    <span className="text-lg text-[#8DBBD4]">→</span>
                  </button>
                ))
              ) : (
                <p className="rounded-2xl bg-white/70 p-4 text-sm text-brown/70">
                  No featured spots are available yet.
                </p>
              )}
            </div>
          )}
        </section>

        {/* PERFECT FOR YOU */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between px-6">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              ✨ Perfect for you
            </h3>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2">
            {perfectForYou.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="relative flex min-h-65 min-w-70 max-w-70 cursor-pointer flex-col justify-between rounded-3xl bg-[#2E1E1A] p-5 text-white shadow-md"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider backdrop-blur-md">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs backdrop-blur-md">
                      📍
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl font-bold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 text-xs font-medium text-amber-300/90">
                      📍 {place.neighbourhood}
                      {distance ? ` · ${distance}` : ""}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs italic text-white/80">
                      {place.known ? `“${place.known}”` : place.category}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {place.vibe?.slice(0, 2).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] text-white/90"
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

          {expandedCategory === "dining" && (
            <div className="mt-5 px-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-serif text-xl font-semibold">All Dining &amp; Social</h4>
                <button type="button" onClick={() => setExpandedCategory(null)} className="text-sm text-[#8DBBD4] underline">Close</button>
              </div>
              {(() => {
                const categoryPlaces = searchedPlaces.filter((place) => ["Dining", "Global", "Social"].includes(place.category));
                return categoryPlaces.length ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {categoryPlaces.map((place) => (
                      <button type="button" key={place.id} onClick={() => handlePlaceClick(place)} className="flex items-center gap-3 rounded-2xl border border-[#E6D56D] bg-white p-3 text-left shadow-sm">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FFF0B5]"><PlaceImage src={place.image} alt={place.name} className="object-cover" /></div>
                        <div className="min-w-0 flex-1"><h4 className="truncate font-serif text-lg font-semibold">{place.name}</h4><p className="mt-1 truncate text-xs text-brown/65">{place.category} · {place.neighbourhood}</p><p className="mt-2 text-xs">{place.priceTier}</p></div>
                        <span className="text-lg text-[#8DBBD4]">→</span>
                      </button>
                    ))}
                  </div>
                ) : <p className="rounded-2xl bg-white/70 p-6 text-center text-sm">No places in this section yet.</p>;
              })()}
            </div>
          )}
        </section>

        {/* DINING & SOCIAL */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between px-6">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              🍽️ Dining &amp; Social
            </h3>

            <button
              type="button"
              onClick={() => setExpandedCategory("dining")}
              className="text-sm font-medium text-[#8DBBD4]"
            >
              See all →
            </button>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2">
            {dinnerSpots.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="flex min-w-52.5 max-w-52.5 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-[#E6D56D] bg-white shadow-sm"
                >
                  <div className="relative flex h-32 items-center justify-center bg-[#4A3B2C] p-2">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <PlaceImage
                      src={place.image}
                      alt={place.name}
                      className="object-cover"
                      fallback={<span className="text-3xl">🍲</span>}
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="truncate font-serif text-lg font-semibold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 truncate text-[11px] font-medium text-brown/70">
                      📍 {place.neighbourhood}
                      {distance ? ` · ${distance}` : ""}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {place.vibe?.slice(0, 1).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#F1F7FA] px-2 py-0.5 text-[10px] text-brown/80"
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

          {expandedCategory === "cafes" && (
            <div className="mt-5 px-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-serif text-xl font-semibold">All Cafés &amp; Desserts</h4>
                <button type="button" onClick={() => setExpandedCategory(null)} className="text-sm text-[#8DBBD4] underline">Close</button>
              </div>
              {(() => {
                const categoryPlaces = searchedPlaces.filter((place) => ["Café", "Sweets"].includes(place.category));
                return categoryPlaces.length ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {categoryPlaces.map((place) => (
                      <button type="button" key={place.id} onClick={() => handlePlaceClick(place)} className="flex items-center gap-3 rounded-2xl border border-[#E6D56D] bg-white p-3 text-left shadow-sm">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FFF0B5]"><PlaceImage src={place.image} alt={place.name} className="object-cover" /></div>
                        <div className="min-w-0 flex-1"><h4 className="truncate font-serif text-lg font-semibold">{place.name}</h4><p className="mt-1 truncate text-xs text-brown/65">{place.category} · {place.neighbourhood}</p><p className="mt-2 text-xs">{place.priceTier}</p></div>
                        <span className="text-lg text-[#8DBBD4]">→</span>
                      </button>
                    ))}
                  </div>
                ) : <p className="rounded-2xl bg-white/70 p-6 text-center text-sm">No places in this section yet.</p>;
              })()}
            </div>
          )}
        </section>

        {/* CAFÉS & DESSERTS */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between px-6">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold">
              ☕ Cafés &amp; Desserts
            </h3>

            <button
              type="button"
              onClick={() => setExpandedCategory("cafes")}
              className="text-sm font-medium text-[#8DBBD4]"
            >
              See all →
            </button>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2">
            {dessertAndCafes.map((place) => {
              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={place.id}
                  onClick={() => handlePlaceClick(place)}
                  className="flex min-w-52.5 max-w-52.5 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-[#E6D56D] bg-white shadow-sm"
                >
                  <div className="relative flex h-32 items-center justify-center bg-[#2D4030] p-2">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <PlaceImage
                      src={place.image}
                      alt={place.name}
                      className="object-cover"
                      fallback={<span className="text-3xl">☕</span>}
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="truncate font-serif text-lg font-semibold">
                      {place.name}
                    </h4>

                    <p className="mt-0.5 truncate text-[11px] font-medium text-brown/70">
                      📍 {place.neighbourhood}
                      {distance ? ` · ${distance}` : ""}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {place.vibe?.slice(0, 1).map((vibe) => (
                          <span
                            key={vibe}
                            className="rounded-full bg-[#F1F7FA] px-2 py-0.5 text-[10px] text-brown/80"
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
    </>
  );
}
