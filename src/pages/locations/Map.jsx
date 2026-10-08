import { useState } from "react";
import { useNavigate } from "react-router-dom";
import places, { getDistanceBetween, ABUJA_AREAS } from "../places";
import BottomNav from "../../components/BottomNav";

function Map() {
  const navigate = useNavigate();

  const [currentArea, setCurrentArea] = useState("Wuse");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Get places near the selected area
  const nearbyPlaces = places
    .map((place) => ({
      ...place,
      distance: getDistanceBetween(
        currentArea,
        place.neighbourhood
      ),
    }))
    .filter((place) => place.distance !== Infinity)
    .sort((a, b) => a.distance - b.distance);

  // Show only the closest few places on the map
  const mapPlaces = nearbyPlaces.slice(0, 12);

  // Open Place Detail
  const handlePlaceClick = (place) => {
    navigate("/detail", {
      state: {
        place: {
          ...place,
          distance: `${place.distance}km`,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">

      {/* Header */}
      <header className="px-5 pt-8 pb-4 max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="font-serif text-3xl font-bold">
              Map
            </h1>

            <button
              onClick={() => setShowLocationPicker(true)}
              className="mt-1 flex items-center gap-1 text-sm text-brown/60"
            >
              📍 {currentArea}
              <span className="text-xs">⌄</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/discover")}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            ✦
          </button>

        </div>

      </header>


      {/* Search */}
      <div className="px-5 max-w-md mx-auto">

        <button
          onClick={() => navigate("/businesses")}
          className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-3 text-left shadow-sm"
        >
          <span className="text-brown/50">
            🔍
          </span>

          <span className="text-sm text-brown/50">
            Search this area
          </span>
        </button>

      </div>


      {/* Map Area */}
      <section className="px-5 mt-5 max-w-md mx-auto">

        <div className="relative h-[420px] rounded-[2rem] overflow-hidden bg-[#E8E1D2] border border-[#E6D56D] shadow-sm">

          {/* Fake map background */}
          <div className="absolute inset-0">

            {/* Roads */}
            <div className="absolute w-[120%] h-5 bg-white/80 rotate-[20deg] top-[25%] -left-[10%]" />

            <div className="absolute w-[120%] h-4 bg-white/70 rotate-[-18deg] top-[55%] -left-[10%]" />

            <div className="absolute w-4 h-[120%] bg-white/70 rotate-[12deg] left-[38%] -top-[10%]" />

            <div className="absolute w-5 h-[120%] bg-white/60 rotate-[-30deg] left-[72%] -top-[10%]" />

            {/* Smaller roads */}
            <div className="absolute w-[90%] h-2 bg-white/50 rotate-[45deg] top-[75%] left-[0%]" />

            <div className="absolute w-[90%] h-2 bg-white/50 rotate-[-45deg] top-[10%] left-[15%]" />

          </div>


          {/* Current area indicator */}
          <div className="absolute top-5 left-5 bg-white rounded-full px-3 py-2 shadow-md text-xs font-medium">
            📍 {currentArea}
          </div>


          {/* Place Markers */}
          {mapPlaces.map((place, index) => {

            /*
              Spread markers around the map.

              This is temporary while we are using a
              custom map-style background.

              When we add a real map API later,
              these positions will become actual
              latitude/longitude positions.
            */

            const positions = [
              { top: "28%", left: "22%" },
              { top: "42%", left: "55%" },
              { top: "22%", left: "72%" },
              { top: "58%", left: "30%" },
              { top: "70%", left: "65%" },
              { top: "36%", left: "82%" },
              { top: "75%", left: "20%" },
              { top: "52%", left: "76%" },
              { top: "18%", left: "45%" },
              { top: "64%", left: "48%" },
              { top: "80%", left: "78%" },
              { top: "48%", left: "15%" },
            ];

            const position =
              positions[index % positions.length];

            const isSelected =
              selectedPlace?.id === place.id;

            return (
              <button
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                style={{
                  top: position.top,
                  left: position.left,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                  isSelected
                    ? "scale-125 z-20"
                    : "z-10"
                }`}
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 ${
                    isSelected
                      ? "bg-[#C4DAE8] border-brown"
                      : "bg-white border-[#E6D56D]"
                  }`}
                >
                  📍
                </div>

              </button>
            );
          })}


          {/* Selected Place Preview */}
          {selectedPlace && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl z-30">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-xs text-brown/50">
                    {selectedPlace.category}
                  </p>

                  <h3 className="font-serif text-lg font-bold">
                    {selectedPlace.name}
                  </h3>

                  <p className="text-sm text-brown/60 mt-1">
                    {selectedPlace.neighbourhood}
                    {" · "}
                    {selectedPlace.distance}km
                  </p>

                </div>

                <button
                  onClick={() => setSelectedPlace(null)}
                  className="text-brown/40 text-sm"
                >
                  ✕
                </button>

              </div>

              <button
                onClick={() => handlePlaceClick(selectedPlace)}
                className="mt-3 w-full bg-brown text-white rounded-xl py-2.5 text-sm font-medium"
              >
                View place
              </button>

            </div>
          )}

        </div>

      </section>


      {/* Nearby Places */}
      <section className="mt-6 max-w-md mx-auto px-5">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="font-serif text-xl font-bold">
              Nearby
            </h2>

            <p className="text-xs text-brown/50 mt-1">
              Closest spots around {currentArea}
            </p>
          </div>

          <span className="text-xs text-brown/50">
            {nearbyPlaces.length} places
          </span>

        </div>


        <div className="space-y-3">

          {nearbyPlaces.slice(0, 5).map((place) => (

            <button
              key={place.id}
              onClick={() => handlePlaceClick(place)}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm hover:shadow-md transition"
            >

              {/* Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#E8E1D2] shrink-0">

                {place.image ? (
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    📍
                  </div>
                )}

              </div>


              {/* Information */}
              <div className="flex-1 min-w-0">

                <p className="text-xs text-brown/50">
                  {place.category}
                </p>

                <h3 className="font-semibold truncate">
                  {place.name}
                </h3>

                <p className="text-xs text-brown/60 mt-1">
                  {place.neighbourhood}
                </p>

              </div>


              {/* Distance */}
              <div className="text-right shrink-0">

                <p className="text-sm font-semibold">
                  {place.distance}km
                </p>

                <p className="text-[10px] text-brown/40">
                  away
                </p>

              </div>

            </button>

          ))}

        </div>


        {/* See all */}
        {nearbyPlaces.length > 5 && (
          <button
            onClick={() => navigate("/businesses")}
            className="w-full mt-4 py-3 rounded-xl border border-brown/20 text-sm font-medium"
          >
            See all places
          </button>
        )}

      </section>


      {/* Location Picker */}
      {showLocationPicker && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">

          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-brown max-h-[80vh] flex flex-col">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="font-serif text-xl font-bold">
                  Choose your area
                </h2>

                <p className="text-xs text-brown/50 mt-1">
                  We'll show places closest to here.
                </p>
              </div>

              <button
                onClick={() => setShowLocationPicker(false)}
                className="text-brown/40 text-lg"
              >
                ✕
              </button>

            </div>


            <div className="overflow-y-auto space-y-2 pr-1">

              {ABUJA_AREAS.map((area) => {

                const selected = currentArea === area;

                return (
                  <button
                    key={area}
                    onClick={() => {
                      setCurrentArea(area);
                      setSelectedPlace(null);
                      setShowLocationPicker(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition ${
                      selected
                        ? "bg-[#C4DAE8] font-semibold"
                        : "bg-[#FCF1D0] hover:bg-[#F8E8A5]"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <span>
                        📍 {area}
                      </span>

                      {selected && (
                        <span>
                          ✓
                        </span>
                      )}

                    </div>

                  </button>
                );

              })}

            </div>

          </div>

        </div>

      )}


      {/* Shared Bottom Navigation */}
      <BottomNav />

    </div>
  );
}

export default Map;