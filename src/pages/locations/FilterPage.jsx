import { useState } from "react";
import { useNavigate } from "react-router-dom";
import places, { getDistanceBetween } from "../places";

function FilterPage({ setShowFilter, currentArea = "Wuse" }) {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState("");
  const [vibe, setVibe] = useState("");
  const [budget, setBudget] = useState("");
  const [pictures, setPictures] = useState("");
  const [distance, setDistance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!occasion || !vibe || !budget || !pictures || !distance) {
      alert("Please answer all 5 questions before searching!");
      return;
    }

    const preferences = { occasion, vibe, budget, pictures, distance };

    const matches = places.filter((place) => {
      const distanceMax = {
        "Just around the corner": 3.5,
        "A short drive/ride": 7.0,
        "Worth the trip": 15.0,
        "Anywhere in the city": Infinity,
      }[preferences.distance];

      const realDistance = getDistanceBetween(currentArea, place.neighbourhood);

      // 1. Distance check
      const matchesDistance = realDistance <= distanceMax;

      // 2. Budget check
      const matchesBudget = place.priceTier === preferences.budget;

      // 3. Vibe check
      const matchesVibe = place.vibe?.includes(preferences.vibe);

      // 4. Occasion check
      const matchesOccasion = place.occasion?.includes(preferences.occasion);

      // 5. Cute for pictures check (If "Doesn't matter", always return true)
      const matchesPictures =
        preferences.pictures === "Doesn't matter" ||
        place.cuteForPics === preferences.pictures;

      return (
        matchesDistance &&
        matchesBudget &&
        matchesVibe &&
        matchesOccasion &&
        matchesPictures
      );
    });

    setShowFilter(false);
    navigate("/results", { state: { matches, currentArea } });
  };

  function OptionCard({ label, sublabel, selected, onClick, fullWidth = false }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`border rounded-xl py-3 px-3 text-left transition-all ${
          fullWidth ? "w-full" : ""
        } ${
          selected
            ? "bg-brown text-butter border-brown shadow"
            : "bg-blue-sky/40 text-brown border-brown/20 hover:bg-blue-sky"
        }`}
      >
        <div className="text-xs font-semibold">{label}</div>
        {sublabel && (
          <div
            className={`text-[11px] mt-0.5 ${
              selected ? "text-butter/80" : "text-brown/70"
            }`}
          >
            {sublabel}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/20 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="min-h-[70vh] bg-butter text-brown px-6 py-8 max-w-md mx-auto"
      >
        <header className="flex items-center justify-between py-4 px-2 mb-2">
          <button aria-label="Menu" className="p-1 focus:outline-none">
            <svg
              className="w-6 h-6 text-brown"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-serif tracking-tight font-medium text-brown">
            Way<span className="text-blue-sky">ve</span>
          </h1>
          <button
            type="button"
            className="flex items-center gap-1.5 bg-blue-sky text-brown border border-brown/20 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm max-w-[120px] truncate"
          >
            <span>📍</span>
            <span className="truncate">{currentArea}</span>
          </button>
        </header>

        <button
          type="button"
          onClick={() => setShowFilter(false)}
          className="text-sm text-brown/70 mb-4 flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif text-brown">
            find your{" "}
            <span className="italic underline decoration-blue-sky">next</span>{" "}
            spot
          </h2>
          <p className="text-sm text-brown/70 mt-1">Takes less than a minute</p>
        </div>

        {/* 1. Occasion */}
        <section className="mb-6">
          <h3 className="font-medium mb-3 text-brown">1. What's the occasion?</h3>
          <div className="grid grid-cols-3 gap-3">
            <OptionCard
              label="Solo date"
              selected={occasion === "Solo date"}
              onClick={() => setOccasion("Solo date")}
            />
            <OptionCard
              label="Girls day"
              selected={occasion === "Girls day"}
              onClick={() => setOccasion("Girls day")}
            />
            <OptionCard
              label="Group hangout"
              selected={occasion === "Group hangout"}
              onClick={() => setOccasion("Group hangout")}
            />
            <OptionCard
              label="Date night"
              selected={occasion === "Date night"}
              onClick={() => setOccasion("Date night")}
            />
            <OptionCard
              label="Birthday dinner"
              selected={occasion === "Birthday dinner"}
              onClick={() => setOccasion("Birthday dinner")}
            />
            <OptionCard
              label="After-church"
              selected={occasion === "After-church"}
              onClick={() => setOccasion("After-church")}
            />
          </div>
        </section>

        {/* 2. Vibe */}
        <section className="mb-6">
          <h3 className="font-medium mb-3 text-brown">2. What's the vibe?</h3>
          <div className="grid grid-cols-3 gap-3">
            <OptionCard
              label="Chill"
              selected={vibe === "Chill"}
              onClick={() => setVibe("Chill")}
            />
            <OptionCard
              label="Aesthetic"
              selected={vibe === "Aesthetic"}
              onClick={() => setVibe("Aesthetic")}
            />
            <OptionCard
              label="Lively"
              selected={vibe === "Lively"}
              onClick={() => setVibe("Lively")}
            />
            <OptionCard
              label="Cozy"
              selected={vibe === "Cozy"}
              onClick={() => setVibe("Cozy")}
            />
            <OptionCard
              label="Upscale"
              selected={vibe === "Upscale"}
              onClick={() => setVibe("Upscale")}
            />
          </div>
        </section>

        {/* 3. Budget */}
        <section className="mb-6">
          <h3 className="font-medium mb-3 text-brown">3. What's your budget?</h3>
          <div className="grid grid-cols-3 gap-3">
            <OptionCard
              label="Budget"
              selected={budget === "Budget"}
              onClick={() => setBudget("Budget")}
            />
            <OptionCard
              label="Mid-Range"
              selected={budget === "Mid-Range"}
              onClick={() => setBudget("Mid-Range")}
            />
            <OptionCard
              label="Splurge"
              selected={budget === "Splurge"}
              onClick={() => setBudget("Splurge")}
            />
          </div>
        </section>

        {/* 4. Cute for pictures? */}
        <section className="mb-6">
          <h3 className="font-medium mb-3 text-brown">4. Cute for pictures?</h3>
          <div className="grid grid-cols-3 gap-3">
            <OptionCard
              label="Yes"
              selected={pictures === "Yes"}
              onClick={() => setPictures("Yes")}
            />
            <OptionCard
              label="Somewhat"
              selected={pictures === "Somewhat"}
              onClick={() => setPictures("Somewhat")}
            />
            <OptionCard
              label="Doesn't matter"
              selected={pictures === "Doesn't matter"}
              onClick={() => setPictures("Doesn't matter")}
            />
          </div>
        </section>

        {/* 5. Distance */}
        <section className="mb-8">
          <h3 className="font-medium mb-3 text-brown">
            5. How far are you willing to go?
          </h3>
          <div className="flex flex-col gap-2.5">
            <OptionCard
              fullWidth
              label="Just around the corner"
              sublabel="Within ~3.5km"
              selected={distance === "Just around the corner"}
              onClick={() => setDistance("Just around the corner")}
            />
            <OptionCard
              fullWidth
              label="A short drive/ride"
              sublabel="Within ~7km"
              selected={distance === "A short drive/ride"}
              onClick={() => setDistance("A short drive/ride")}
            />
            <OptionCard
              fullWidth
              label="Worth the trip"
              sublabel="Within ~15km"
              selected={distance === "Worth the trip"}
              onClick={() => setDistance("Worth the trip")}
            />
            <OptionCard
              fullWidth
              label="Anywhere in the city"
              sublabel="No distance limit"
              selected={distance === "Anywhere in the city"}
              onClick={() => setDistance("Anywhere in the city")}
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-brown text-butter hover:bg-brown/90 transition-colors py-3.5 rounded-full font-semibold text-base shadow-md"
        >
          Find my spot →
        </button>
      </form>
    </div>
  );
}

export default FilterPage;