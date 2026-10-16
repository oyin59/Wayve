"use client";

import Image from "next/image";
import { useState } from "react";

interface PlaceImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown when there is no photo (or it fails to load). */
  fallback?: React.ReactNode;
}

/**
 * Photo for a place. Fills its parent, so the parent needs `relative` and a
 * size. Falls back gracefully if the file isn't in /public/images yet.
 */
export default function PlaceImage({
  src,
  alt,
  className = "object-cover",
  sizes = "(max-width: 448px) 100vw, 448px",
  priority = false,
  fallback = (
    <div className="absolute inset-0 flex items-center justify-center text-xs opacity-40">
      No photo yet
    </div>
  ),
}: PlaceImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

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
