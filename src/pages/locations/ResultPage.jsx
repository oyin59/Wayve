import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterPage from "./FilterPage";
import { getDistanceBetween } from "../places";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);

  const matches = location.state?.matches || [];
  const currentArea = location.state?.currentArea || "Wuse";

  const getDistanceStr = (placeArea) => {
    const dist = getDistanceBetween(currentArea, placeArea);
    return dist !== Infinity ? ` · ${dist}km` : "";
  };

  return (
    <>
      {showFilter && (
        <FilterPage setShowFilter={setShowFilter} currentArea={currentArea} />
      )}

      <div className="min-h-screen bg-butter text-[#432F2E] pb-24 p-4">

        <header className="flex items-center justify-between py-4 px-2 mb-2">
          <button aria-label="Menu" className="p-1 focus:outline-none">
            <svg className="w-6 h-6 text-[#432F2E]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16" />
            </svg>
          </button>
          <h1 className="text-3xl font-serif tracking-tight text-[#432F2E] font-medium">Wayve</h1>
          <button className="flex items-center gap-1.5 bg-[#C4DAE8] text-[#432F2E] border border-[#432F2E]/20 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm max-w-[120px] truncate">
            <span>📍</span>
            <span className="truncate">{currentArea}</span>
          </button>
        </header>

        <button onClick={() => navigate("/discover")} className="text-sm text-[#432F2E]/70 mb-4 flex items-center gap-1">
          ← Back
        </button>

        <div className="bg-[#FFEFEF] text-[#432F2E] text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5 w-fit mb-4">
          <span>✨</span>
          <span>Here are {matches.length} great matches for you</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matches.length > 0 ? (
            matches.map((place, index) => {
              const distStr = getDistanceStr(place.neighbourhood);
              return (
                <div
                  key={place.id || index}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-[#432F2E]/10 flex flex-col justify-between"
                  onClick={() =>
                    navigate("/detail", {
                      state: { place: { ...place, distance: distStr } }
                    })
                  }
                >
                  <div>
                    <div className="relative w-full h-44 bg-[#C4DAE8]">
                      {place.image ? (
                        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs opacity-40">
                          No photo yet
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-base font-medium leading-snug">{place.name}</h3>
                          <p className="text-xs opacity-50 mt-0.5 flex items-center gap-1">
                            <span>📍</span> {place.neighbourhood}{distStr}
                          </p>
                        </div>
                        <span className="text-[#432F2E]/30 text-base">→</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {place.vibe?.map((v) => (
                          <span key={v} className="text-xs bg-[#FEEFB8] border border-[#432F2E]/15 text-[#432F2E] px-2.5 py-0.5 rounded-full">
                            {v}
                          </span>
                        ))}
                      </div>

                      {place.priceTier && (
                        <div className="text-xs text-[#432F2E]/70 flex items-center gap-1">
                          <span>💳</span>
                          <span>{place.priceTier}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (place.address) {
                          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`, "_blank");
                        }
                      }}
                      className="w-full bg-[#432F2E] text-white text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
                    >
                      <span>Get directions</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-[#432F2E]/70 italic">No matches found.</p>
          )}
        </div>

        <button
          onClick={() => setShowFilter(true)}
          className="w-full bg-[#432F2E] text-[#FEEFB8] py-4 rounded-2xl text-sm font-semibold gap-1.5 flex items-center justify-center mt-6 shadow-sm hover:opacity-90 transition-opacity"
        >
          <span>Repick your vibe</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ResultPage;