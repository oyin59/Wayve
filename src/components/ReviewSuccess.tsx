"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Place } from "@/types/place";

export default function ReviewSuccess({ place }: { place: Place }) {
  const searchParams = useSearchParams();
  const stars = Math.max(0, Math.min(5, Number(searchParams.get("rating")) || 0));

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
      <p className="text-6xl mb-4">✨</p>
      <h1 className="font-serif text-3xl font-semibold">Thanks for the review</h1>
      <p className="mt-3 text-sm text-[#29291F]/70">
        You rated {place.name}
        {stars > 0 ? ` ${"★".repeat(stars)}` : ""}. It helps other people in
        Abuja find their kind of spot.
      </p>
      <Link
        href={`/places/${place.id}`}
        className="mt-8 bg-[#29291F] text-white px-6 py-3 rounded-2xl font-semibold"
      >
        Back to {place.name}
      </Link>
    </div>
  );
}
