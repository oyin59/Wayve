"use client";

import Image from "next/image";
import { useState } from "react";

interface PlaceImageProps {
  src: string | null | undefined;
  alt: string;
  category?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown when there is no photo (or it fails to load). */
  fallback?: React.ReactNode;
}

const CATEGORY_ART: Record<string, { icon: string; color: string }> = {
  Café: { icon: "☕", color: "from-[#F1E8E3] to-[#F8EEE8]" },
  Sweets: { icon: "🍰", color: "from-[#F8EEE8] to-[#F6DFDD]" },
  Dining: { icon: "🍽️", color: "from-[#F4EEE4] to-[#E6EBD2]" },
  Global: { icon: "🥘", color: "from-[#E6EBD2] to-[#F8EEE8]" },
  Social: { icon: "🎉", color: "from-[#F6DFDD] to-[#F1E8E3]" },
  Local: { icon: "🍲", color: "from-[#F2E9DC] to-[#E6EBD2]" },
};

/**
 * Photo for a place. Fills its parent, so the parent needs `relative` and a
 * size. Falls back gracefully if the file isn't in /public/images yet.
 */
export default function PlaceImage({
  src,
  alt,
  category,
  className = "object-cover",
  sizes = "(max-width: 448px) 100vw, 448px",
  priority = false,
  fallback,
}: PlaceImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    if (fallback !== undefined) return <>{fallback}</>;

    const art = category ? CATEGORY_ART[category] : undefined;
    if (art) {
      return (
        <div
          role="img"
          aria-label={`${category} illustration for ${alt}`}
          className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${art.color}`}
        >
          <span
            aria-hidden="true"
            className="absolute -right-5 -top-8 h-24 w-24 rounded-full border-[14px] border-white/20"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-white/20"
          />
          <span aria-hidden="true" className="relative text-4xl drop-shadow-sm">
            {art.icon}
          </span>
          <span className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#29291F]/70">
            {category}
          </span>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center text-xs text-[#29291F]/70">
        No photo
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
