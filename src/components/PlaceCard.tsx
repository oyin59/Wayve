"use client";

import PlaceImage from "@/components/PlaceImage";
import { formatPlaceProximity } from "@/lib/distance";
import type { Place } from "@/types/place";

interface PlaceCardProps {
  place: Place;
  /** Straight-line distance in km from the user's chosen area. */
  distanceKm?: number;
  onClick?: () => void;
}

const PRICE_SYMBOLS: Record<Place["priceTier"], string> = {
  Budget: "₦",
  "Mid-Range": "₦₦",
  Splurge: "₦₦₦",
  "Not confirmed": "₦₦",
};

/** The large place card used on the Businesses list. */
export default function PlaceCard({ place, distanceKm, onClick }: PlaceCardProps) {
  const distance =
    distanceKm !== undefined && distanceKm !== Infinity
      ? formatPlaceProximity(distanceKm, place.neighbourhood)
      : null;

  return (
    <div
      onClick={onClick}
      className="wayve-card cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="h-44 bg-[#29291F] relative">
        <PlaceImage
          src={place.image}
          alt={place.name}
          category={place.category}
        />

        {/* PRICE */}
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
          {PRICE_SYMBOLS[place.priceTier] ?? "₦₦"}
        </span>

        {/* CATEGORY */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brown text-xs px-3 py-1 rounded-full font-medium">
          {place.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-serif text-xl font-semibold truncate">
              {place.name}
            </h4>
            <p className="mt-1 text-[13px] text-brown/80">
              📍 {distanceKm === 0 ? distance : place.neighbourhood}
              {distance && distanceKm !== 0 ? ` · ${distance}` : ""}
            </p>
            {place.status === "Unverified" && (
              <p className="mt-1 text-xs font-medium text-amber-800">
                Not verified by Wayve
              </p>
            )}
          </div>
        </div>

        {/* VIBES */}
        <div className="flex gap-2 flex-wrap mt-4">
          {place.vibe.slice(0, 3).map((vibe) => (
            <span
              key={vibe}
              className="rounded-full bg-[#E9E6D8] px-3 py-1 text-xs text-brown/90"
            >
              {vibe}
            </span>
          ))}
        </div>

        {/* DESCRIPTION */}
        {place.known && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brown/70">
              About this place
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] italic text-brown/80">
              {place.known}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
