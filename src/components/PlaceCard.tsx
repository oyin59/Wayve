"use client";

import PlaceImage from "@/components/PlaceImage";
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
};

/** The large place card used on the Businesses list. */
export default function PlaceCard({ place, distanceKm, onClick }: PlaceCardProps) {
  const distance =
    distanceKm !== undefined && distanceKm !== Infinity
      ? `${distanceKm}km`
      : null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden border border-[#E6D56D] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* IMAGE */}
      <div className="h-44 bg-[#4A3B2C] relative">
        <PlaceImage
          src={place.image}
          alt={place.name}
          fallback={
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🍽️
            </div>
          }
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
            <p className="text-xs text-brown/60 mt-1">
              📍 {place.neighbourhood}
              {distance ? ` · ${distance}` : ""}
            </p>
          </div>
          <span className="text-sm font-bold text-brown shrink-0">★ 4.7</span>
        </div>

        {/* VIBES */}
        <div className="flex gap-2 flex-wrap mt-4">
          {place.vibe.slice(0, 3).map((vibe) => (
            <span
              key={vibe}
              className="text-[10px] bg-[#F1F7FA] text-brown/80 px-3 py-1 rounded-full"
            >
              {vibe}
            </span>
          ))}
        </div>

        {/* DESCRIPTION */}
        {place.known && (
          <p className="text-xs text-brown/65 italic mt-4 line-clamp-2">
            &ldquo;{place.known}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
