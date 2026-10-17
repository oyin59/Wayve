"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Place } from "@/types/place";

interface ReviewFormProps {
  place: Place;
}

export default function ReviewForm({ place }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: send `review` to a backend. There isn't one yet, so we only pass
    // the rating along to the thank-you screen.
    router.push(`/places/${place.id}/review/success?rating=${rating}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F]">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="text-sm text-[#29291F]/60 mb-6"
        >
          ← Back
        </button>
        {/* Heading */}
        <p className="text-sm text-[#29291F]/50">
          Share your experience
        </p>
        <h1 className="font-serif text-3xl font-semibold mt-1">
          Write a review
        </h1>
        {place && (
          <div className="mt-6 bg-white/70 rounded-2xl p-4 border border-[#29291F]/15">
            <p className="font-serif text-xl font-semibold">
              {place.name}
            </p>
            <p className="text-sm text-[#29291F]/55 mt-1">
              {place.category} · {place.neighbourhood}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8">
          {/* Rating */}
          <div>
            <p className="font-semibold text-sm">
              How was your experience?
            </p>
            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl ${
                    star <= rating
                      ? "bg-[#303820] border-[#29291F]/15"
                      : "bg-white/70 border-[#29291F]/15"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          {/* Review */}
          <div className="mt-8">
            <label className="font-semibold text-sm">
              Your review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you think?"
              rows={6}
              className="w-full mt-3 rounded-2xl border border-[#29291F]/15 bg-white/70 px-4 py-4 outline-none resize-none placeholder:text-[#29291F]/35 focus:border-[#29291F]/40"
            />
            <p className="text-xs text-[#29291F]/40 mt-2">
              {review.length}/500
            </p>
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={!rating || !review.trim()}
            className={`w-full mt-6 py-4 rounded-2xl font-semibold ${
              rating && review.trim()
                ? "bg-[#29291F] text-[#F1E8E3]"
                : "bg-[#29291F]/20 text-[#29291F]/40"
            }`}
          >
            Post review
          </button>
        </form>
      </div>
    </div>
  );
}
