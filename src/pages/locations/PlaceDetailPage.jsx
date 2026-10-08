import { useLocation, useNavigate } from "react-router-dom";

function PlaceDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const place = location.state?.place;

  if (!place) {
    return (
      <div className="min-h-screen bg-[#FEEFB8] text-[#432F2E] p-6">
        <p className="text-sm mb-4">No place details available.</p>
        <button onClick={() => navigate(-1)} className="text-sm font-medium underline">
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEEFB8] text-[#432F2E] pb-24">
      {/* Hero Image */}
      <div className="relative w-full h-64 bg-[#C4DAE8]">
        {place.image ? (
          <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm opacity-50">
            No photo yet
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/80 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-5">
        <div>
          <h1 className="text-3xl font-serif font-medium">{place.name}</h1>
          <p className="text-sm opacity-60 mt-1">
            📍 {place.neighbourhood || place.area} {place.distance ? `(${place.distance})` : ""} · {place.category}
          </p>
        </div>

        {place.status === "Verified" && (
          <span className="inline-block bg-[#C4DAE8] text-[#432F2E] text-xs font-medium px-3 py-1 rounded-full">
            ✓ Verified Spot
          </span>
        )}

        {place.known && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Known For</p>
            <p className="text-sm font-medium leading-relaxed">{place.known}</p>
          </div>
        )}

        {place.vibe?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Vibes</p>
            <div className="flex flex-wrap gap-2">
              {place.vibe.map((v) => (
                <span key={v} className="bg-[#C4DAE8]/60 text-[#432F2E] text-sm px-3 py-1 rounded-full">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {place.occasion?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Occasions</p>
            <div className="flex flex-wrap gap-2">
              {place.occasion.map((o) => (
                <span key={o} className="bg-[#FEEFB8] border border-[#432F2E]/20 text-[#432F2E] text-sm px-3 py-1 rounded-full">
                  {o}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {place.priceTier && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Price tier</p>
              <p className="text-sm font-medium">{place.priceTier}</p>
            </div>
          )}
          {place.neighbourhood && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Neighbourhood</p>
              <p className="text-sm font-medium">{place.neighbourhood}</p>
            </div>
          )}
        </div>

        {place.avgSpend && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Avg Spend</p>
            <p className="text-sm font-medium">{place.avgSpend}</p>
          </div>
        )}

        {place.hours && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Hours</p>
            <p className="text-sm font-medium">{place.hours}</p>
          </div>
        )}

        {place.address && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-1">Address</p>
            <p className="text-sm font-medium">{place.address}</p>
          </div>
        )}

        {place.amenities?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-50 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {place.amenities.map((a) => (
                <span key={a} className="bg-[#FEEFB8] border border-[#432F2E]/20 text-[#432F2E] text-sm px-3 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button 
            onClick={() => {
              if (place.address) {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`, "_blank");
              }
            }}
            className="w-full bg-[#432F2E] text-white text-xs font-medium py-3 rounded-xl flex items-center justify-center gap-1 hover:opacity-95 transition-opacity shadow-sm"
          >
            <span>Get directions</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

          <button 
            onClick={() => navigate("/saved", { state: { place } })}
            className="w-full bg-[#FFF0B5] text-[#432F2E] text-xs font-medium py-3 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity border border-[#432F2E]/10"
          >
            <span>♡</span>
            <span>Save to lists</span>
          </button>
          
          <button 
            onClick={() =>
              navigate("/writereview", {
                state: { place },
              })
            }
            className="w-full bg-[#C4DAE8] text-[#432F2E] text-xs font-medium py-3 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
          >
            <span>✍️</span>
            <span>Write a review</span>
          </button>

          <button className="w-full bg-transparent border border-[#432F2E]/20 text-[#432F2E] text-xs font-medium py-3 rounded-xl flex items-center justify-center gap-1 hover:opacity-95 transition-opacity">
            Share this spot
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailPage;