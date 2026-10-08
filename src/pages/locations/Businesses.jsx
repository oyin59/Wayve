import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import places, { getDistanceBetween, ABUJA_AREAS } from "../places";

function Businesses() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentArea, setCurrentArea] = useState(
    location.state?.selectedArea || "Wuse"
  );

  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cafés",
    "Dining",
    "Social",
    "Sweets",
  ];

  // Calculate distance from selected area
  const getDistance = (placeArea) => {
    if (!placeArea) return null;

    const distance = getDistanceBetween(
      currentArea,
      placeArea
    );

    return distance !== Infinity
      ? `${distance}km`
      : null;
  };

  // Filter businesses
  const filteredBusinesses = places
    .filter((place) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        place.category === selectedCategory;

      // Search filter
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        place.name?.toLowerCase().includes(searchTerm) ||
        place.neighbourhood?.toLowerCase().includes(searchTerm) ||
        place.category?.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    })
    .map((place) => ({
      ...place,
      distance: getDistanceBetween(
        currentArea,
        place.neighbourhood
      ),
    }))
    .filter((place) => place.distance !== Infinity)
    .sort((a, b) => a.distance - b.distance);

  // Open business details
  const handlePlaceClick = (place) => {
    const distance = getDistance(place.neighbourhood);

    navigate("/detail", {
      state: {
        place: {
          ...place,
          distance,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">

      {/* LOCATION PICKER */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">

          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-brown max-h-[80vh] flex flex-col">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">

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

            <p className="text-xs text-brown/70 mb-4">
              Businesses will be shown from nearest to furthest
              based on your selected area.
            </p>

            {/* Areas */}
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">

              {ABUJA_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setCurrentArea(area);
                    setShowLocationPicker(false);
                  }}
                  className={`p-3 text-xs rounded-2xl border text-left transition-all ${
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

      {/* HEADER */}
      <header className="px-6 pt-5">

        <div className="flex items-center justify-between">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-[#E6D56D] flex items-center justify-center"
          >
            ←
          </button>

          {/* Title */}
          <h1 className="font-serif text-2xl font-semibold">
            Businesses
          </h1>

          {/* Location */}
          <button
            onClick={() => setShowLocationPicker(true)}
            className="w-10 h-10 rounded-full bg-white border border-[#E6D56D] flex items-center justify-center"
          >
            📍
          </button>

        </div>

        {/* Location label */}
        <button
          onClick={() => setShowLocationPicker(true)}
          className="mt-4 flex items-center gap-2 text-sm text-brown/70"
        >
          <span>📍</span>
          <span>
            Showing businesses near{" "}
            <span className="font-semibold text-brown">
              {currentArea}
            </span>
          </span>
          <span className="text-xs">
            ⌄
          </span>
        </button>

      </header>

      {/* HERO */}
      <section className="px-6 mt-7">

        <h2 className="font-serif text-4xl leading-tight">
          Find a place
          <br />
          <span className="italic text-[#8DBBD4]">
            you'll love.
          </span>
        </h2>

        <p className="mt-2 text-brown/70">
          Explore places to eat, chill and hang out around Abuja.
        </p>

      </section>

      {/* SEARCH */}
      <section className="px-6 mt-6">

        <div className="flex items-center gap-3 bg-white border border-[#E6D56D] rounded-2xl px-4 py-3.5 shadow-sm">

          <span className="text-lg text-brown/50">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search businesses or areas..."
            className="w-full bg-transparent outline-none text-sm text-brown placeholder:text-brown/40"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-brown/40 text-sm"
            >
              ✕
            </button>
          )}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="mt-6">

        <h3 className="px-6 font-medium text-lg mb-3">
          Browse by category
        </h3>

        <div className="flex gap-3 overflow-x-auto px-6 pb-2 no-scrollbar">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-3 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? "bg-brown text-white"
                  : "bg-white border border-[#E6D56D] text-brown"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </section>

      {/* RESULTS HEADER */}
      <section className="px-6 mt-8">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="font-serif text-2xl font-semibold">
              Places near you
            </h3>

            <p className="text-xs text-brown/60 mt-1">
              {filteredBusinesses.length}{" "}
              {filteredBusinesses.length === 1
                ? "place"
                : "places"}{" "}
              near {currentArea}
            </p>
          </div>

          <button
            onClick={() => setShowLocationPicker(true)}
            className="text-sm text-[#8DBBD4] font-semibold"
          >
            Change area
          </button>

        </div>

      </section>

      {/* BUSINESS LIST */}
      <section className="px-6 mt-4">

        {filteredBusinesses.length > 0 ? (
          <div className="grid gap-4">

            {filteredBusinesses.map((place) => {

              const distance =
                place.distance !== Infinity
                  ? `${place.distance}km`
                  : null;

              return (
                <div
                  key={place.id || place.name}
                  onClick={() => handlePlaceClick(place)}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E6D56D] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >

                  {/* IMAGE */}
                  <div className="h-44 bg-[#4A3B2C] relative">

                    {place.image ? (
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        🍽️
                      </div>
                    )}

                    {/* PRICE */}
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {place.priceTier === "Budget"
                        ? "₦"
                        : place.priceTier === "Splurge"
                        ? "₦₦₦"
                        : "₦₦"}
                    </span>

                    {/* CATEGORY */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brown text-xs px-3 py-1 rounded-full font-medium">
                      {place.category}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h4 className="font-serif text-xl font-semibold truncate">
                          {place.name}
                        </h4>

                        <p className="text-xs text-brown/60 mt-1">
                          📍 {place.neighbourhood}
                          {distance ? ` · ${distance}` : ""}
                        </p>

                      </div>

                      <span className="text-sm font-bold text-brown shrink-0">
                        ★ 4.7
                      </span>

                    </div>

                    {/* VIBES */}
                    <div className="flex gap-2 flex-wrap mt-4">

                      {place.vibe?.slice(0, 3).map((vibe, index) => (
                        <span
                          key={index}
                          className="text-[10px] bg-[#F1F7FA] text-brown/80 px-3 py-1 rounded-full"
                        >
                          {vibe}
                        </span>
                      ))}

                    </div>

                    {/* DESCRIPTION */}
                    {place.known && (
                      <p className="text-xs text-brown/65 italic mt-4 line-clamp-2">
                        "{place.known}"
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-[#E6D56D] p-8 text-center">

            <div className="text-5xl mb-4">
              🔎
            </div>

            <h3 className="font-serif text-xl font-semibold">
              No places found
            </h3>

            <p className="text-sm text-brown/60 mt-2">
              Try another search, category or area.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 bg-brown text-white px-5 py-3 rounded-full text-sm font-medium"
            >
              Clear filters
            </button>

          </div>
        )}

      </section>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E6D56D] z-40">

        <div className="max-w-md mx-auto flex items-center justify-around px-4 py-3">

          <button
            onClick={() => navigate("/discover")}
            className="flex flex-col items-center gap-1 text-brown/50 text-xs"
          >
            <span className="text-lg">
              ✦
            </span>
            Discover
          </button>

          <button
            onClick={() => navigate("/businesses")}
            className="flex flex-col items-center gap-1 text-brown font-semibold text-xs"
          >
            <span className="text-lg">
              🏪
            </span>
            Businesses
          </button>

          <button
            onClick={() => navigate("/map")}
            className="flex flex-col items-center gap-1 text-brown/50 text-xs"
          >
            <span className="text-lg">
              🗺️
            </span>
            Map
          </button>

          <button
            onClick={() => navigate("/community")}
            className="flex flex-col items-center gap-1 text-brown/50 text-xs"
          >
            <span className="text-lg">
              💬
            </span>
            Community
          </button>

          <button
            onClick={() => navigate("/saved")}
            className="flex flex-col items-center gap-1 text-brown/50 text-xs"
          >
            <span className="text-lg">
              ♡
            </span>
            Saved
          </button>

        </div>

      </nav>

    </div>
  );
}

export default Businesses;