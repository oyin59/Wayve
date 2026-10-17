"use client";

import { useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
import {
  formatPlaceProximity,
  getDistanceBetween,
} from "@/lib/distance";
import { useArea } from "@/providers/AreaProvider";
import { useSavedPlaces } from "@/providers/SavedPlacesProvider";
import type { Place } from "@/types/place";

interface PlaceDetailProps {
  place: Place;
}

export default function PlaceDetail({ place }: PlaceDetailProps) {
  const router = useRouter();
  const { area } = useArea();
  const { save } = useSavedPlaces();
  const km = getDistanceBetween(area, place.neighbourhood);
  const proximity =
    km !== Infinity ? formatPlaceProximity(km, place.neighbourhood) : null;

  const openGoogleMapsSearch = () => {
    const query = encodeURIComponent(`${place.name} ${place.address}`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-28 text-[#29291F]">
      <section className="relative mx-auto h-[25rem] min-h-[22rem] max-h-[72vh] max-w-2xl overflow-hidden bg-[#E9E6D8] sm:h-[34rem] sm:rounded-b-[2rem]">
        <PlaceImage
          src={place.image}
          alt={place.name}
          category={place.category}
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#29291F]/90 via-[#29291F]/10 to-[#29291F]/15"
        />
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur transition hover:bg-white"
        >
          <span aria-hidden="true">← </span>
          Back
        </button>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 pt-20 text-white sm:px-9">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            {place.category}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight drop-shadow sm:text-5xl">
            {place.name}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white/90">
            <span aria-hidden="true">📍</span>
            {place.neighbourhood}
            {proximity && (
              <>
                <span aria-hidden="true" className="text-white/60">
                  ·
                </span>
                {km === 0 ? "Near your area" : `${proximity} from ${area}`}
              </>
            )}
          </p>
        </div>
      </section>

      <div className="relative mx-auto -mt-5 max-w-2xl space-y-4 rounded-t-[1.75rem] bg-[#E9E6D8] px-5 pb-8 pt-6 sm:px-8">
        {place.status === "Unverified" && (
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
            <span aria-hidden="true">!</span>
            Not verified by Wayve
          </p>
        )}

        {place.known && (
          <section className="rounded-3xl border border-[#29291F]/15 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#29291F]">
              A little about it
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-[#29291F] sm:text-xl">
              {place.known}
            </p>
          </section>
        )}

        <section aria-label="Place details" className="grid grid-cols-2 gap-3">
          {place.priceTier && (
            <div className="rounded-2xl border border-[#29291F]/15 bg-white/85 p-4 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9B574] font-serif text-lg font-bold">
                ₦
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#29291F]">
                Price
              </p>
              <p className="mt-1 text-sm font-semibold">{place.priceTier}</p>
            </div>
          )}
          {place.avgSpend && (
            <div className="rounded-2xl border border-[#29291F]/15 bg-white/85 p-4 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9E6D8] font-serif text-lg font-bold">
                ↗
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#29291F]">
                Average spend
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug">
                {place.avgSpend}
              </p>
            </div>
          )}
          {place.hours && (
            <div className="col-span-2 flex items-start gap-3 rounded-2xl border border-[#29291F]/15 bg-white/85 p-4 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9E6D8] text-lg">
                ◷
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#29291F]">
                  Opening hours
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">
                  {place.hours}
                </p>
              </div>
            </div>
          )}
        </section>

        {place.address && (
          <section className="rounded-3xl bg-[#29291F] p-5 text-white shadow-md sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg">
                📍
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                  Find it in Abuja
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  {place.address}
                </p>
                {proximity && (
                  <p className="mt-2 text-xs font-medium text-[#D9B574]">
                    {km === 0 ? `In ${place.neighbourhood}` : `${proximity} from ${area}`}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {place.vibe.length > 0 && (
          <section className="rounded-3xl border border-[#29291F]/15 bg-white/70 p-5">
            <h2 className="font-serif text-lg font-semibold">The vibe</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {place.vibe.map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full bg-[#E9E6D8] px-3.5 py-2 text-sm font-medium text-[#29291F]"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </section>
        )}

        {place.occasion.length > 0 && (
          <section className="rounded-3xl border border-[#29291F]/15 bg-white/70 p-5">
            <h2 className="font-serif text-lg font-semibold">Good for</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {place.occasion.map((occasion) => (
                <span
                  key={occasion}
                  className="rounded-full border border-[#29291F]/15 bg-[#E9E6D8] px-3.5 py-2 text-sm font-medium"
                >
                  {occasion}
                </span>
              ))}
            </div>
          </section>
        )}

        {place.amenities.length > 0 && (
          <section className="rounded-3xl border border-[#29291F]/15 bg-white/70 p-5">
            <h2 className="font-serif text-lg font-semibold">What you&apos;ll find</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {place.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-[#D9B574] px-3.5 py-2 text-sm font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={openGoogleMapsSearch}
            className="col-span-2 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#29291F] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#29291F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29291F]"
          >
            <span>Search in Google Maps</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4"
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
          <button
            type="button"
            onClick={() => {
              save(place.id);
              router.push("/saved");
            }}
            className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#29291F]/20 bg-white px-4 py-3 text-sm font-semibold text-[#29291F] transition hover:bg-[#E9E6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29291F]"
          >
            <span aria-hidden="true">♡</span>
            Save place
          </button>
        </div>
      </div>
    </main>
  );
}
