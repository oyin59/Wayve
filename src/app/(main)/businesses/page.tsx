"use client";

import { useState } from "react";
import type { PlaceWithDistance } from "@/types/place";
import { useRouter } from "next/navigation";
import PlaceCard from "@/components/PlaceCard";
import { useArea } from "@/providers/AreaProvider";
import places from "@/data/places";
import { getDistanceBetween, ABUJA_AREAS } from "@/lib/distance";
export default function BusinessesPage() {
  const router = useRouter();
    const { area: currentArea, setArea: setCurrentArea } = useArea();
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Café",
    "Dining",
    "Social",
    "Sweets",
  ];
  // Filter businesses
  const filteredBusinesses = places
    .filter((place) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        place.category === selectedCategory;
      // Search filter
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        place.name?.toLowerCase().includes(searchTerm) ||
        place.neighbourhood?.toLowerCase().includes(searchTerm) ||
        place.category?.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    })
    .map((place) => ({
      ...place,
      distance: getDistanceBetween(
        currentArea,
        place.neighbourhood
      ),
    }))
    .filter((place) => place.distance !== Infinity)
    .sort((a, b) => a.distance - b.distance);
  // Open business details
  const handlePlaceClick = (place: PlaceWithDistance) => {
    router.push(`/places/${place.id}`);
  };
  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">
      {/* LOCATION PICKER */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-brown max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold">
                Select your area
              </h3>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-brown/70 mb-4">
              Businesses will be shown from nearest to furthest
              based on your selected area.
            </p>
            {/* Areas */}
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
              {ABUJA_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setCurrentArea(area);
                    setShowLocationPicker(false);
                  }}
                  className={`p-3 text-xs rounded-2xl border text-left transition-all ${
                    currentArea === area
                      ? "bg-brown text-white border-brown font-semibold"
                      : "bg-[#FCF1D0]/30 border-[#E6D56D] text-brown hover:bg-[#FCF1D0]"
                  }`}
                >
                  📍 {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* HEADER */}
      <header className="px-6 pt-5">
        <div className="flex items-center justify-between">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white border border-[#E6D56D] flex items-center justify-center"
          >
            ←
          </button>
          {/* Title */}
          <h1 className="font-serif text-2xl font-semibold">
            Businesses
          </h1>
          {/* Location */}
          <button
            onClick={() => setShowLocationPicker(true)}
            className="w-10 h-10 rounded-full bg-white border border-[#E6D56D] flex items-center justify-center"
          >
            📍
          </button>
        </div>
        {/* Location label */}
        <button
          onClick={() => setShowLocationPicker(true)}
          className="mt-4 flex items-center gap-2 text-sm text-brown/70"
        >
          <span>📍</span>
          <span>
            Showing businesses near{" "}
            <span className="font-semibold text-brown">
              {currentArea}
            </span>
          </span>
          <span className="text-xs">
            ⌄
          </span>
        </button>
      </header>
      {/* HERO */}
      <section className="px-6 mt-7">
        <h2 className="font-serif text-4xl leading-tight">
          Find a place
          <br />
          <span className="italic text-[#8DBBD4]">
            you&apos;ll love.
          </span>
        </h2>
        <p className="mt-2 text-brown/70">
          Explore places to eat, chill and hang out around Abuja.
        </p>
      </section>
      {/* SEARCH */}
      <section className="px-6 mt-6">
        <div className="flex items-center gap-3 bg-white border border-[#E6D56D] rounded-2xl px-4 py-3.5 shadow-sm">
          <span className="text-lg text-brown/50">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search businesses or areas..."
            className="w-full bg-transparent outline-none text-sm text-brown placeholder:text-brown/40"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-brown/40 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </section>
      {/* CATEGORIES */}
      <section className="mt-6">
        <h3 className="px-6 font-medium text-lg mb-3">
          Browse by category
        </h3>
        <div className="flex gap-3 overflow-x-auto px-6 pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-3 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? "bg-brown text-white"
                  : "bg-white border border-[#E6D56D] text-brown"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* RESULTS HEADER */}
      <section className="px-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Places near you
            </h3>
            <p className="text-xs text-brown/60 mt-1">
              {filteredBusinesses.length}{" "}
              {filteredBusinesses.length === 1
                ? "place"
                : "places"}{" "}
              near {currentArea}
            </p>
          </div>
          <button
            onClick={() => setShowLocationPicker(true)}
            className="text-sm text-[#8DBBD4] font-semibold"
          >
            Change area
          </button>
        </div>
      </section>
      {/* BUSINESS LIST */}
      <section className="px-6 mt-4">
        {filteredBusinesses.length > 0 ? (
          <div className="grid gap-4">
            {filteredBusinesses.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                distanceKm={place.distance}
                onClick={() => handlePlaceClick(place)}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-[#E6D56D] p-8 text-center">
            <div className="text-5xl mb-4">
              🔎
            </div>
            <h3 className="font-serif text-xl font-semibold">
              No places found
            </h3>
            <p className="text-sm text-brown/60 mt-2">
              Try another search, category or area.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 bg-brown text-white px-5 py-3 rounded-full text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
