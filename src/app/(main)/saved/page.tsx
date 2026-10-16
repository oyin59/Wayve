"use client";

import { useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
import places from "@/data/places";
import { getDistanceBetween } from "@/lib/distance";
import { useArea } from "@/providers/AreaProvider";
import { useSavedPlaces } from "@/providers/SavedPlacesProvider";
import type { Place } from "@/types/place";

export default function SavedPage() {
  const router = useRouter();
  const { savedIds, remove } = useSavedPlaces();
  const { area } = useArea();

  const savedPlaces = savedIds
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => Boolean(p));

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">
      <header className="mx-auto max-w-md px-5 pb-5 pt-8">
        <h1 className="font-serif text-3xl font-bold">Saved places</h1>
        <p className="mt-1 text-sm text-brown/55">
          Keep track of places you want to visit.
        </p>
      </header>
      <main className="mx-auto mt-2 max-w-md px-5">
        <p className="mb-4 text-xs text-brown/50">
          {savedPlaces.length} {savedPlaces.length === 1 ? "place" : "places"} saved
        </p>
        {savedPlaces.length > 0 ? (
          <div className="space-y-3">
            {savedPlaces.map((place) => {
              const distance = getDistanceBetween(area, place.neighbourhood);

              return (
                <article
                  key={place.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => router.push(`/places/${place.id}`)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#E8E1D2]">
                      <PlaceImage
                        src={place.image}
                        alt={place.name}
                        sizes="80px"
                        fallback={null}
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <p className="text-xs text-brown/50">{place.category}</p>
                      <h2 className="mt-1 truncate font-semibold">{place.name}</h2>
                      <p className="mt-1 text-xs text-brown/55">
                        📍 {place.neighbourhood}
                      </p>
                      {Number.isFinite(distance) && (
                        <p className="mt-1 text-xs text-brown/40">
                          {distance}km away
                        </p>
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(place.id)}
                    aria-label={`Remove ${place.name} from saved places`}
                    className="shrink-0 rounded-xl px-3 py-2 text-sm font-medium text-brown/65 hover:bg-[#FFF0B5]"
                  >
                    Remove
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E6D56D] bg-white/70 p-6 text-center">
            <h2 className="font-serif text-xl font-semibold">No saved places yet</h2>
            <p className="mt-2 text-sm text-brown/70">
              Explore Abuja and save places you want to visit.
            </p>
            <button
              type="button"
              onClick={() => router.push("/discover")}
              className="mt-4 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-white"
            >
              Explore places
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
