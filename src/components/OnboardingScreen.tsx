"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { markOnboardingComplete, ONBOARDING_STEPS } from "@/lib/onboarding";

interface Slide {
  eyebrow: string;
  title: ReactNode;
  body: string;
  button: string;
  next: string;
  art: ReactNode;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Welcome to Wayve",
    title: (
      <>
        Discover amazing
        <br />
        spots in Abuja
      </>
    ),
    body: "Cafés, restaurants, hangouts and more — all in one place.",
    button: "Next",
    next: "/onboarding/2",
    art: (
      <div className="mt-10 h-[330px] rounded-[32px] bg-[#303820] overflow-hidden flex items-center justify-center">
        <div className="text-center px-8">
          <div className="text-7xl mb-5">🍽️☕</div>
          <p className="text-sm text-[#29291F]/50">
            Discover amazing places around Abuja
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Made for your vibe",
    title: (
      <>
        Find what
        <br />
        matches your vibe
      </>
    ),
    body: "Tell us what you're looking for and we'll do the rest.",
    button: "Next",
    next: "/onboarding/3",
    art: (
      <div className="mt-10 h-[330px] rounded-[32px] bg-white border border-[#29291F]/15 overflow-hidden p-5">
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="rounded-2xl bg-[#303820] flex items-center justify-center text-5xl">
            ☕
          </div>
          <div className="rounded-2xl bg-[#D9B574] flex items-center justify-center text-5xl">
            🍜
          </div>
          <div className="rounded-2xl bg-[#D9B574] flex items-center justify-center text-5xl">
            🌆
          </div>
          <div className="rounded-2xl bg-[#303820] flex items-center justify-center text-5xl">
            🍰
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Curated for you",
    title: (
      <>
        Explore.
        <br />
        Come back.
      </>
    ),
    body: "Your favourite spots, in one place.",
    button: "Get started",
    next: "/area-picker",
    art: (
      <div className="mt-10 h-[330px] rounded-[32px] overflow-hidden bg-[#29291F] relative">
        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          🌆
        </div>
        <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4">
          <p className="text-xs text-[#29291F]/60">Wayve recommendation</p>
          <p className="font-serif text-xl mt-1">A place that fits you.</p>
        </div>
      </div>
    ),
  },
];

if (process.env.NODE_ENV !== "production" && SLIDES.length !== ONBOARDING_STEPS) {
  console.warn("ONBOARDING_STEPS in lib/onboarding.ts doesn't match SLIDES.length");
}

export default function OnboardingScreen({ step }: { step: number }) {
  const router = useRouter();
  const slide = SLIDES[step - 1];
  const handleSkip = () => {
    markOnboardingComplete();
    router.push("/discover");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] flex flex-col px-6 py-6 max-w-md mx-auto">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif">
          Way<span className="italic text-[#29291F]">ve</span>
        </h1>
        <button
          onClick={handleSkip}
          className="text-sm text-[#29291F]/60"
        >
          Skip
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mt-6">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < step ? "bg-[#29291F]" : "bg-[#303820]"
            }`}
          />
        ))}
      </div>

      {/* Image */}
      {slide.art}

      {/* Text */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#29291F]">
          {slide.eyebrow}
        </p>
        <h2 className="font-serif text-4xl leading-tight mt-2">{slide.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-[#29291F]/70">
          {slide.body}
        </p>
      </div>

      {/* Button */}
      <div className="mt-auto pt-8">
        <button
          onClick={() => router.push(slide.next)}
          className="w-full bg-[#29291F] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition"
        >
          {slide.button}
        </button>
      </div>
    </div>
  );
}
