"use client";

import { useRouter } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";
import places from "@/data/places";
import type { SavedList } from "@/data/lists";
import type { Place } from "@/types/place";

interface SavedListViewProps {
  list: SavedList;
}

export default function SavedListView({ list }: SavedListViewProps) {
  const router = useRouter();

  const listPlaces = list.placeIds
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => Boolean(p));

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: list.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] pb-24">
      {/* Header */}
      <header className="max-w-md mx-auto px-6 pt-8 pb-5">
        <button
          onClick={() => router.back()}
          className="text-sm text-[#432F2E]/60 mb-5"
        >
          ← Back
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#432F2E]/50">Saved list</p>
            <h1 className="font-serif text-3xl font-semibold mt-1">
              {list.name}
            </h1>
            <p className="text-sm text-[#432F2E]/60 mt-2">
              {listPlaces.length} places saved
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-white/70 border border-[#E6D56D] flex items-center justify-center"
            title="Share list"
            onClick={handleShare}
          >
            ↗
          </button>
        </div>
      </header>

      {/* Places */}
      <main className="max-w-md mx-auto px-6">
        <div className="space-y-4">
          {listPlaces.map((place) => (
            <button
              key={place.id}
              onClick={() => router.push(`/places/${place.id}`)}
              className="w-full text-left bg-white/75 rounded-2xl overflow-hidden border border-[#E6D56D]/60"
            >
              {/* Image */}
              <div className="relative h-40 bg-[#C4DAE8]">
                <PlaceImage src={place.image} alt={place.name} />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      {place.name}
                    </h2>
                    <p className="text-sm text-[#432F2E]/55 mt-1">
                      {place.category} · {place.neighbourhood}
                    </p>
                  </div>
                  <span className="text-[#432F2E]/40">♡</span>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#FEEFB8]">
                    {place.priceTier}
                  </span>
                  {place.vibe[0] && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[#C4DAE8]/60">
                      {place.vibe[0]}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
