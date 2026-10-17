"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
import places from "@/data/places";
import { DISCOVERY_VIBES } from "@/lib/onboarding";
import {
  formatPlaceProximity,
  getDistanceBetween,
} from "@/lib/distance";
import { useArea } from "@/providers/AreaProvider";

const PLACE_GROUPS: Record<
  "dining" | "cafes",
  { title: string; categories: readonly string[] }
> = {
  dining: {
    title: "Dining & Social",
    categories: ["Dining", "Global", "Social"],
  },
  cafes: {
    title: "Cafés & Desserts",
    categories: ["Café", "Sweets"],
  },
} as const;

export default function MorePlacesPage() {
  const params = useParams<{ category: string; vibe: string }>();
  const router = useRouter();
  const { area } = useArea();

  const category =
    params.category === "dining" || params.category === "cafes"
      ? params.category
      : null;
  const group = category ? PLACE_GROUPS[category] : null;
  const selectedVibe =
    params.vibe.toLowerCase() === "all"
      ? null
      : DISCOVERY_VIBES.find(
          (vibe) => vibe.toLowerCase() === params.vibe.toLowerCase(),
        ) ?? null;
  const hasValidVibe =
    params.vibe.toLowerCase() === "all" || selectedVibe !== null;

  const matchingPlaces = useMemo(() => {
    if (!group || !hasValidVibe) {
      return [];
    }

    return places
      .filter(
        (place) =>
          group.categories.includes(place.category) &&
          (!selectedVibe ||
            place.vibe?.some(
              (vibe) => vibe.toLowerCase() === selectedVibe.toLowerCase(),
            )),
      )
      .map((place) => ({
        ...place,
        distance: getDistanceBetween(area, place.neighbourhood),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [area, group, hasValidVibe, selectedVibe]);

  if (!group || !hasValidVibe) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-10 text-brown">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-6 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-semibold">
            This list isn&apos;t available
          </h1>
          <p className="mt-2 text-sm text-brown/65">
            Choose a category and vibe from Discover to see places here.
          </p>
          <button
            type="button"
            onClick={() => router.push("/discover")}
            className="mt-5 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Discover
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-24 text-brown">
      <header className="mx-auto max-w-3xl px-5 pb-5 pt-8">
        <button
          type="button"
          onClick={() => router.push("/discover")}
          className="mb-5 text-sm font-medium text-[#29291F]"
        >
          ← Discover
        </button>
        <h1 className="font-serif text-3xl font-bold">{group.title}</h1>
        <p className="mt-1 text-sm text-brown/80">
          {selectedVibe
            ? `${selectedVibe} places near ${area}`
            : `Places near ${area}`}
          {" · "}
          {matchingPlaces.length}{" "}
          {matchingPlaces.length === 1 ? "place" : "places"}
        </p>
      </header>

      <section
        aria-label={`${group.title} places`}
        className="mx-auto grid max-w-3xl grid-cols-1 gap-3 px-5 sm:grid-cols-2"
      >
        {matchingPlaces.map((place) => (
          <button
            type="button"
            key={place.id}
            onClick={() => router.push(`/places/${place.id}`)}
            className="wayve-card flex min-h-24 items-center gap-3 p-3 text-left transition hover:bg-[#E9E6D8]"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#E9E6D8] sm:h-[5.5rem] sm:w-[5.5rem]">
              <PlaceImage
                src={place.image}
                alt={place.name}
                category={place.category}
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-serif text-xl font-semibold">
                {place.name}
              </h2>
              <p className="mt-0.5 truncate text-[13px] text-brown/80">
                {place.category} ·{" "}
                {Number.isFinite(place.distance)
                  ? formatPlaceProximity(place.distance, place.neighbourhood)
                  : place.neighbourhood}
              </p>
              <p className="mt-2 text-xs font-medium text-brown/90">
                {place.priceTier}
              </p>
            </div>
            <span aria-hidden="true" className="text-lg text-[#29291F]">
              →
            </span>
          </button>
        ))}

        {matchingPlaces.length === 0 && (
          <div className="rounded-3xl border border-[#29291F]/15 bg-white/80 p-6 text-center sm:col-span-2">
            <h2 className="font-serif text-xl font-semibold">
              No {selectedVibe ? `${selectedVibe} ` : ""}places in this section
              yet
            </h2>
            <p className="mt-2 text-sm text-brown/65">
              Try another quick vibe to see more places.
            </p>
            {selectedVibe && (
              <button
                type="button"
                onClick={() =>
                  router.push(`/discover/more/${category}/all`)
                }
                className="mt-4 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-white"
              >
                Show all {group.title}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
