import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FilterPage from "./FilterPage";
import places, { getDistanceBetween, ABUJA_AREAS } from "../places";
import BottomNav from "../../components/BottomNav";

function DiscoverPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [surpriseSpot, setSurpriseSpot] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentArea, setCurrentArea] = useState(
    location.state?.selectedArea || "Wuse"
  );

  // Calculate distance from the user's selected area
  const getDistance = (placeArea) => {
    if (!placeArea) return null;

    const distance = getDistanceBetween(currentArea, placeArea);

    return distance !== Infinity ? `${distance}km` : null;
  };

  // Get places based on category and sort them by distance
  const getNearbyPlaces = (categoryFilter, limit = 5) => {
    return places
      .filter((place) => categoryFilter.includes(place.category))
      .map((place) => ({
        ...place,
        distance: getDistanceBetween(
          currentArea,
          place.neighbourhood
        ),
      }))
      .filter((place) => place.distance !== Infinity)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  };

  const handlePlaceClick = (place) => {
    const distanceStr = getDistance(place.neighbourhood);

    navigate("/detail", {
      state: {
        place: {
          ...place,
          distance: distanceStr,
        },
      },
    });
  };

  // Surprise Me
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * places.length);

    setSurpriseSpot(places[randomIndex]);
    setShowSurpriseModal(true);
  };

  const handleTryAnother = () => {
    let nextSpot;

    do {
      const randomIndex = Math.floor(Math.random() * places.length);
      nextSpot = places[randomIndex];
    } while (nextSpot === surpriseSpot && places.length > 1);

    setSurpriseSpot(nextSpot);
  };

  // Location-based sections
  const perfectForYou = getNearbyPlaces(
    ["Dining", "Global", "Social", "Café", "Sweets"],
    4
  );

  const dinnerSpots = getNearbyPlaces(
    ["Dining", "Global", "Social"],
    5
  );

  const dessertAndCafes = getNearbyPlaces(
    ["Sweets", "Café"],
    5
  );

  return (
    <>
      {/* Filter Modal */}
      {showFilter && (
        <FilterPage
          setShowFilter={setShowFilter}
          currentArea={currentArea}
        />
      )}

      {/* LOCATION PICKER MODAL */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-brown flex flex-col max-h-[80vh]">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold">
                Select your area
              </h3>

              <button
                onClick={() => setShowLocationPicker(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-brown/70 mb-3">
              Distances will calculate from your selected area across Abuja.
            </p>

            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
              {ABUJA_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setCurrentArea(area);
                    setShowLocationPicker(false);
                  }}
                  className={`p-2.5 text-xs rounded-2xl border text-left transition-all ${
                    currentArea === area
                      ? "bg-brown text-white border-brown font-semibold"
                      : "bg-[#FCF1D0]/30 border-[#E6D56D] text-brown hover:bg-[#FCF1D0]"
                  }`}
                >
                  📍 {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SURPRISE ME MODAL */}
      {showSurpriseModal && surpriseSpot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-[#FCF1D0] w-full max-w-md rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">

            {/* Grab Handle */}
            <div
              className="w-12 h-1.5 bg-[#E6D56D] rounded-full mx-auto mb-4 cursor-pointer"
              onClick={() => setShowSurpriseModal(false)}
            />

            <div className="text-center mb-4">
              <p className="text-xs font-bold tracking-widest text-brown/70 uppercase flex items-center justify-center gap-1.5">
                🎲 YOUR SURPRISE SPOT
              </p>
            </div>

            {/* Spot Card */}
            <div className="bg-[#2E1E1A] text-white rounded-3xl p-6 relative overflow-hidden shadow-lg mb-6 flex flex-col justify-end min-h-[260px]">

              {surpriseSpot.image ? (
                <img
                  src={surpriseSpot.image}
                  alt={surpriseSpot.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  🍜
                </div>
              )}

              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold">
                  {surpriseSpot.name}
                </h3>

                <p className="text-xs text-amber-200/90 font-medium mt-1">
                  "{surpriseSpot.known}" · {surpriseSpot.neighbourhood} · ★ 4.8
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {surpriseSpot.vibe?.slice(0, 2).map((v, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-md"
                    >
                      🕯 {v}
                    </span>
                  ))}

                  <span className="text-xs bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/30">
                    ● Open now
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleTryAnother}
                className="bg-[#FFF0B5] border border-[#E6D56D] text-brown py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                🔄 Try another
              </button>

              <button
                onClick={() => {
                  setShowSurpriseModal(false);
                  handlePlaceClick(surpriseSpot);
                }}
                className="bg-brown text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                Take me here →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">

        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4">

          <h1 className="text-3xl font-serif">
            Way<span className="italic text-[#8DBBD4]">ve</span>
          </h1>

          <div className="flex items-center gap-2">

            <button className="w-11 h-11 rounded-full bg-[#FFF0B5] flex items-center justify-center">
              🔍
            </button>

            <button className="w-11 h-11 rounded-full bg-[#FFF0B5] flex items-center justify-center">
              🔔
            </button>

            <button
              onClick={() => setShowLocationPicker(true)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-full border border-[#E6D56D] bg-white text-xs font-medium shadow-sm hover:border-brown transition-all max-w-[140px] truncate"
            >
              <span className="truncate">
                📍 {currentArea}
              </span>

              <span className="text-[10px]">
                ⌄
              </span>
            </button>

          </div>
        </header>

        {/* HERO */}
        <section className="px-6 pt-4">

          <h2 className="text-5xl font-serif leading-tight">
            Find your
            <br />
            <span className="italic text-[#8DBBD4]">
              next
            </span>{" "}
            spot
          </h2>

          <p className="mt-2 text-lg text-brown/80">
            Tell us the vibe. We'll show you where to go in Abuja.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSurpriseMe}
              className="bg-brown text-white px-5 py-3 rounded-full font-medium shadow-sm active:scale-95 transition-transform"
            >
              🎲 Surprise me
            </button>

            <button
              onClick={() => navigate("/businesses", { state: { selectedArea: currentArea } })}
              className="bg-white border border-[#E6D56D] text-brown px-5 py-3 rounded-full font-medium shadow-sm active:scale-95 transition-transform hover:bg-[#FFF0B5]/40"
            >
              🏪 Businesses
            </button>
          </div>

        </section>

        {/* AI SEARCH BAR */}
        <section className="px-6 mt-6">

          <div className="flex items-center gap-3 bg-white border border-[#E6D56D] rounded-2xl px-4 py-4 shadow-sm">

            <span className="text-xl text-brown/60">
              ⌕
            </span>

            <span className="text-[#967F78] text-sm md:text-base truncate">
              Dinner around {currentArea}, cozy,{" "}
              <span className="line-through">
                ₦₦
              </span>
            </span>

            <span className="ml-auto text-[#8DBBD4] bg-[#F1F7FA] px-3 py-1 rounded-full text-xs font-semibold shrink-0">
              AI ✦
            </span>

          </div>
        </section>

        {/* QUICK VIBES */}
        <section className="mt-7">

          <h3 className="px-6 font-medium text-lg mb-3">
            Quick vibes
          </h3>

          <div className="flex gap-3 overflow-x-auto px-6 pb-2 no-scrollbar">

            <button className="whitespace-nowrap px-5 py-3 rounded-full bg-white border border-[#E6D56D] text-sm">
              🟢 Open now
            </button>

            <button className="whitespace-nowrap px-5 py-3 rounded-full bg-white border border-[#E6D56D] text-sm">
              ✨ Aesthetic
            </button>

            <button className="whitespace-nowrap px-5 py-3 rounded-full bg-brown text-white text-sm">
              🕯 Cozy
            </button>

            <button className="whitespace-nowrap px-5 py-3 rounded-full bg-white border border-[#E6D56D] text-sm">
              🌆 Rooftop
            </button>

          </div>
        </section>

        {/* MORE FILTERS */}
        <section className="px-6 mt-5">

          <button
            onClick={() => setShowFilter(true)}
            className="w-full flex items-center justify-between bg-white border border-[#E6D56D] rounded-2xl px-5 py-4 text-brown font-medium"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">
                ☷
              </span>

              More filters
            </span>

            <span>
              ⌄
            </span>
          </button>

        </section>

        {/* BASED ON YOUR VIBE */}
        <section className="px-6 mt-4">

          <div className="flex items-center justify-between bg-white/60 border border-[#E6D56D]/60 rounded-2xl px-4 py-3 text-sm">

            <div className="flex items-center gap-2">

              <span>
                ✨
              </span>

              <span className="text-brown/70">
                Based on your vibe:
              </span>

              <span className="font-semibold text-[#8DBBD4]">
                Cozy
              </span>

              <span className="text-[#8DBBD4]">
                ·
              </span>

              <span className="font-semibold text-[#8DBBD4] line-through">
                ₦₦
              </span>

            </div>

            <span className="text-brown/50 text-xs">
              {places.length} spots
            </span>

          </div>
        </section>

        {/* WAYVE PICKS */}
        <section className="px-6 mt-4">

          <div className="bg-[#2E1E1A] text-[#ffffff] rounded-3xl p-5 flex items-center justify-between cursor-pointer shadow-md">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                📰
              </div>

              <div>

                <p className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">
                  WAYVE PICKS
                </p>

                <h4 className="font-serif text-lg font-bold mt-0.5">
                  Best rooftops in Abuja right now
                </h4>

                <p className="text-xs text-white/60 mt-0.5">
                  Curated by the Wayve team · This week
                </p>

              </div>

            </div>

            <span className="text-white/50 text-lg">
              ›
            </span>

          </div>
        </section>

        {/* PERFECT FOR YOU */}
        <section className="mt-8">

          <div className="flex items-center justify-between px-6 mb-4">

            <h3 className="font-serif text-2xl font-semibold flex items-center gap-2">
              ✨ Perfect for you
            </h3>

          </div>

          <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">

            {perfectForYou.map((place, idx) => {

              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlaceClick(place)}
                  className="min-w-[280px] max-w-[280px] bg-[#2E1E1A] text-white rounded-3xl p-5 cursor-pointer flex flex-col justify-between relative shadow-md"
                >

                  <div className="flex justify-between items-start mb-10">

                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs">
                      🏷️
                    </button>

                  </div>

                  <div>

                    <h4 className="font-serif text-2xl font-bold">
                      {place.name}
                    </h4>

                    <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                      📍 {place.neighbourhood}{" "}
                      {distance ? `· ${distance}` : ""}
                    </p>

                    <p className="text-xs text-white/80 italic mt-1 line-clamp-2">
                      "{place.known}"
                    </p>

                    <div className="flex items-center justify-between mt-4">

                      <div className="flex gap-1.5 flex-wrap">

                        {place.vibe?.slice(0, 2).map((v, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full text-white/90"
                          >
                            {v}
                          </span>
                        ))}

                      </div>

                      <span className="text-xs font-bold text-amber-300">
                        ★ 4.8
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/* DINING & SOCIAL */}
        <section className="mt-8">

          <div className="flex items-center justify-between px-6 mb-3">

            <h3 className="font-serif text-2xl font-semibold flex items-center gap-2">
              🍽️ Dining & Social
            </h3>

            <button className="text-sm text-[#8DBBD4] font-medium">
              See all →
            </button>

          </div>

          <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">

            {dinnerSpots.map((place, idx) => {

              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlaceClick(place)}
                  className="min-w-[210px] max-w-[210px] bg-white rounded-3xl overflow-hidden border border-[#E6D56D] cursor-pointer shadow-sm flex flex-col justify-between"
                >

                  <div className="h-32 bg-[#4A3B2C] relative flex items-center justify-center p-2">

                    <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full absolute top-3 left-3">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    {place.image ? (
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover rounded-t-3xl"
                      />
                    ) : (
                      <span className="text-3xl">
                        🍲
                      </span>
                    )}

                  </div>

                  <div className="p-4">

                    <h4 className="font-serif text-lg font-semibold truncate">
                      {place.name}
                    </h4>

                    <p className="text-[11px] text-brown/70 mt-0.5 font-medium truncate">
                      📍 {place.neighbourhood}{" "}
                      {distance ? `· ${distance}` : ""}
                    </p>

                    <div className="flex items-center justify-between mt-3">

                      <div className="flex gap-1">

                        {place.vibe?.slice(0, 1).map((v, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#F1F7FA] text-brown/80 px-2 py-0.5 rounded-full"
                          >
                            {v}
                          </span>
                        ))}

                      </div>

                      <span className="text-xs text-brown/80 font-bold">
                        ★ 4.6
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/* CAFÉS & DESSERTS */}
        <section className="mt-8">

          <div className="flex items-center justify-between px-6 mb-3">

            <h3 className="font-serif text-2xl font-semibold flex items-center gap-2">
              ☕ Cafés & Desserts
            </h3>

            <button className="text-sm text-[#8DBBD4] font-medium">
              See all →
            </button>

          </div>

          <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">

            {dessertAndCafes.map((place, idx) => {

              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlaceClick(place)}
                  className="min-w-[210px] max-w-[210px] bg-white rounded-3xl overflow-hidden border border-[#E6D56D] cursor-pointer shadow-sm flex flex-col justify-between"
                >

                  <div className="h-32 bg-[#2D4030] relative flex items-center justify-center p-2">

                    <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full absolute top-3 left-3">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    {place.image ? (
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover rounded-t-3xl"
                      />
                    ) : (
                      <span className="text-3xl">
                        ☕
                      </span>
                    )}

                  </div>

                  <div className="p-4">

                    <h4 className="font-serif text-lg font-semibold truncate">
                      {place.name}
                    </h4>

                    <p className="text-[11px] text-brown/70 mt-0.5 font-medium truncate">
                      📍 {place.neighbourhood}{" "}
                      {distance ? `· ${distance}` : ""}
                    </p>

                    <div className="flex items-center justify-between mt-3">

                      <div className="flex gap-1">

                        {place.vibe?.slice(0, 1).map((v, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#F1F7FA] text-brown/80 px-2 py-0.5 rounded-full"
                          >
                            {v}
                          </span>
                        ))}

                      </div>

                      <span className="text-xs text-brown/80 font-bold">
                        ★ 4.7
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </section>
        <BottomNav />
      </div>
    </>
  );
}

export default DiscoverPage;