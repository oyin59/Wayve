"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArea } from "@/providers/AreaProvider";
import { ABUJA_AREAS } from "@/lib/distance";
import {
  DISPLAY_NAME_KEY,
  markOnboardingComplete,
} from "@/lib/onboarding";
import { writeStore } from "@/lib/localStore";

export default function AreaPickerPage() {
  const router = useRouter();
  const { setArea } = useArea();
  const [selectedArea, setSelectedArea] = useState("");
  const [displayName, setDisplayName] = useState("");

  const finishOnboarding = () => {
    if (displayName.trim()) {
      writeStore(DISPLAY_NAME_KEY, displayName.trim());
    }
    markOnboardingComplete();
  };

  const handleContinue = () => {
    setArea(selectedArea);
    finishOnboarding();
    router.push("/discover");
  };

  const handleSkip = () => {
    finishOnboarding();
    router.push("/discover");
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col px-6 py-8 max-w-md mx-auto">
      {/* Top */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/vibe")}
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
          One last thing
        </p>
        <h2 className="font-serif text-4xl leading-tight mt-2">
          Where in Abuja
          <br />
          are you?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#432F2E]/70">
          Pick the area closest to you so we can show you places nearby.
        </p>
      </div>
      <div className="mt-6">
        <label
          htmlFor="onboarding-display-name"
          className="block text-sm font-semibold"
        >
          What should we call you?{" "}
          <span className="font-normal text-brown/55">(optional)</span>
        </label>
        <input
          id="onboarding-display-name"
          type="text"
          autoComplete="given-name"
          maxLength={40}
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Your name"
          className="mt-2 w-full rounded-xl border border-[#E6D56D] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#8DBBD4]"
        />
        <p className="mt-1 text-xs text-brown/55">
          Saved only in this browser. You can skip or change it later.
        </p>
      </div>
      {/* Area list */}
      <div className="mt-5 max-h-[40vh] flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          {ABUJA_AREAS.map((area) => {
            const selected = selectedArea === area;
            return (
              <button
                key={area}
                type="button"
                onClick={() => setSelectedArea(area)}
                className={`text-left py-4 px-4 rounded-2xl border text-sm transition ${
                  selected
                    ? "bg-[#432F2E] text-white border-[#432F2E]"
                    : "bg-white border-[#E6D56D] text-[#432F2E] hover:bg-[#FFF0B5]"
                }`}
              >
                {selected && (
                  <span className="mr-1">
                    ✓
                  </span>
                )}
                {area}
              </button>
            );
          })}
        </div>
      </div>
      {/* Continue */}
      <div className="pt-6">
        <button
          type="button"
          onClick={handleSkip}
          className="mb-3 w-full py-2 text-sm font-medium text-brown/65 underline"
        >
          Skip for now
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedArea}
          className={`w-full py-4 rounded-2xl font-semibold transition ${
            selectedArea
              ? "bg-[#432F2E] text-white"
              : "bg-[#432F2E]/20 text-[#432F2E]/40 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
