"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ABUJA_AREAS } from "../../../../lib/distance";

export default function AreaPickerPage() {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState("");

  const handleContinue = () => {
    router.push(`/discover?area=${encodeURIComponent(selectedArea)}`);
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col px-6 py-8 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => router.push("/vibe")} className="text-xl">←</button>
        <h1 className="text-2xl font-serif">Way<span className="italic text-[#8DBBD4]">ve</span></h1>
        <div className="w-5" />
      </div>
      <div className="flex gap-2 mt-6">
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
      </div>
      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8DBBD4]">One last thing</p>
        <h2 className="font-serif text-4xl leading-tight mt-2">Where in Abuja<br />are you?</h2>
        <p className="mt-4 text-base leading-relaxed text-[#432F2E]/70">
          Pick the area closest to you so we can show you places nearby.
        </p>
      </div>
      <div className="mt-8 flex-1 overflow-y-auto max-h-[55vh] pr-1">
        <div className="grid grid-cols-2 gap-3">
          {ABUJA_AREAS.map((area) => {
            const selected = selectedArea === area;
            return (
              <button
                key={area}
                type="button"
                onClick={() => setSelectedArea(area)}
                className={`text-left py-4 px-4 rounded-2xl border text-sm transition ${
                  selected ? "bg-[#432F2E] text-white border-[#432F2E]" : "bg-white border-[#E6D56D] text-[#432F2E] hover:bg-[#FFF0B5]"
                }`}
              >
                {selected && <span className="mr-1">✓</span>}
                {area}
              </button>
            );
          })}
        </div>
      </div>
      <div className="pt-6">
        <button
          onClick={handleContinue}
          disabled={!selectedArea}
          className={`w-full py-4 rounded-2xl font-semibold transition ${
            selectedArea ? "bg-[#432F2E] text-white" : "bg-[#432F2E]/20 text-[#432F2E]/40 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}