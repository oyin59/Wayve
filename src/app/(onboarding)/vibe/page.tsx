"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function VibeSetupPage() {
  const router = useRouter();
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const vibes = [
    "Cozy",
    "Aesthetic",
    "Chill",
    "Lively",
    "Romantic",
    "Upscale",
    "Social",
    "Quiet",
    "Local",
    "Fun",
  ];
  const toggleVibe = (vibe: string) => {
    setSelectedVibes((current) =>
      current.includes(vibe)
        ? current.filter((item) => item !== vibe)
        : [...current, vibe]
    );
  };
  const handleContinue = () => {
    router.push("/area-picker");
  };
  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Top */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/onboarding/3")}
          className="text-xl"
        >
          ←
        </button>
        <h1 className="text-2xl font-serif">
          Way<span className="italic text-[#8DBBD4]">ve</span>
        </h1>
        <div className="w-5" />
      </div>
      {/* Progress */}
      <div className="flex gap-2 mt-6">
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
      </div>
      {/* Heading */}
      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8DBBD4]">
          Let&apos;s personalise Wayve
        </p>
        <h2 className="font-serif text-4xl leading-tight mt-2">
          What&apos;s your
          <br />
          vibe?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#432F2E]/70">
          Pick a few vibes that sound like you. You can always change them
          later.
        </p>
      </div>
      {/* Vibes */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        {vibes.map((vibe) => {
          const selected = selectedVibes.includes(vibe);
          return (
            <button
              key={vibe}
              type="button"
              onClick={() => toggleVibe(vibe)}
              className={`py-4 px-4 rounded-2xl border text-sm font-medium transition ${
                selected
                  ? "bg-[#432F2E] text-white border-[#432F2E]"
                  : "bg-white border-[#E6D56D] text-[#432F2E] hover:bg-[#FFF0B5]"
              }`}
            >
              {selected && "✓ "}
              {vibe}
            </button>
          );
        })}
      </div>
      {/* Continue */}
      <div className="mt-auto pt-8">
        <button
          onClick={handleContinue}
          className="w-full bg-[#432F2E] text-white py-4 rounded-2xl font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
