"use client";

import { useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
import places from "@/data/places";
import {
  formatPlaceProximity,
  getDistanceBetween,
} from "@/lib/distance";
import { useArea } from "@/providers/AreaProvider";
import { useSavedPlaces } from "@/providers/SavedPlacesProvider";
import type { Place } from "@/types/place";

export default function SavedPage() {
  const router = useRouter();
  const { savedIds, remove } = useSavedPlaces();
  const { area } = useArea();

  const savedPlaces = savedIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place): place is Place => Boolean(place));

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#29291F] md:pb-32">
      <div className="mx-auto max-w-6xl px-5 pt-7 sm:px-8 lg:pt-12">
        <header className="flex items-end justify-between gap-4 py-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A75D43]">
              Your Wayve list
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
              Saved places
            </h1>
            <p className="mt-1 text-sm text-[#29291F]/70">
              Good spots, all in one place.
            </p>
          </div>
          <span className="mb-1 flex h-11 min-w-11 items-center justify-center rounded-full bg-[#E9E6D8] px-3 font-serif text-lg font-bold">
            {savedPlaces.length}
          </span>
        </header>

        <section className="mt-6" aria-label="Your saved places">
          {savedPlaces.length > 0 ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">
                  Your shortlist
                </h2>
                <span className="text-sm font-medium text-[#29291F]">
                  Near {area}
                </span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {savedPlaces.map((place) => {
                  const distance = getDistanceBetween(area, place.neighbourhood);

                  return (
                    <article
                      key={place.id}
                      className="wayve-card flex items-center gap-3 p-3 transition hover:shadow-md sm:gap-4 sm:p-4"
                    >
                      <button
                        type="button"
                        onClick={() => router.push(`/places/${place.id}`)}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#E9E6D8] sm:h-24 sm:w-24">
                          <PlaceImage
                            src={place.image}
                            alt={place.name}
                            category={place.category}
                            sizes="96px"
                          />
                        </div>
                        <div className="min-w-0 flex-1 py-1">
                          <p className="text-xs font-semibold text-[#29291F]">
                            {place.category}
                          </p>
                          <h3 className="mt-1 truncate font-serif text-lg font-semibold sm:text-xl">
                            {place.name}
                          </h3>
                          <p className="mt-1 truncate text-[13px] text-[#29291F]/80">
                            📍{" "}
                            {distance === 0
                              ? formatPlaceProximity(distance, place.neighbourhood)
                              : place.neighbourhood}
                            {Number.isFinite(distance) && distance > 0
                              ? ` · ${formatPlaceProximity(distance, place.neighbourhood)}`
                              : ""}
                          </p>
                          <span className="mt-2 inline-flex rounded-full bg-[#E9E6D8] px-2.5 py-1 text-xs font-medium">
                            {place.priceTier}
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(place.id)}
                        aria-label={`Remove ${place.name} from saved places`}
                        className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-xl text-[#29291F] transition hover:bg-[#E9E6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29291F]"
                      >
                        <span aria-hidden="true">♥</span>
                      </button>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rounded-[2rem] border border-[#29291F]/12 bg-white p-7 text-center shadow-sm sm:p-10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E9E6D8] text-3xl text-[#A75D43]">
                ♡
              </span>
              <h2 className="mt-5 font-serif text-2xl font-semibold">
                Your next favourite goes here
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#29291F]/75">
                Save places you like and they&apos;ll be waiting for you here.
              </p>
              <button
                type="button"
                onClick={() => router.push("/discover")}
                className="mt-6 min-h-12 rounded-2xl bg-[#29291F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#29291F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29291F]"
              >
                Explore places
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
