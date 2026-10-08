import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function SavedList() {
  const navigate = useNavigate();
  const location = useLocation();

  const listName = location.state?.listName || "Abuja Date Spots";

  const places = [
    {
      id: 1,
      name: "Pink Bear",
      category: "Café",
      area: "Wuse",
      price: "Mid-Range",
      vibe: "Aesthetic",
      image: "/images/pink-bear.jpg",
    },
    {
      id: 2,
      name: "Café de Vie",
      category: "Café",
      area: "Maitama",
      price: "Mid-Range",
      vibe: "Cosy",
      image: "/images/cafe-de-vie.jpg",
    },
    {
      id: 3,
      name: "Eli & Lulu's",
      category: "Dining",
      area: "Wuse",
      price: "Mid-Range",
      vibe: "Chill",
      image: "/images/eli-lulus.jpg",
    },
  ];

  const handlePlaceClick = (place) => {
    navigate("/detail", {
      state: {
        place,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] pb-24">

      {/* Header */}
      <header className="max-w-md mx-auto px-6 pt-8 pb-5">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#432F2E]/60 mb-5"
        >
          ← Back
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#432F2E]/50">
              Saved list
            </p>

            <h1 className="font-serif text-3xl font-semibold mt-1">
              {listName}
            </h1>

            <p className="text-sm text-[#432F2E]/60 mt-2">
              {places.length} places saved
            </p>
          </div>

          <button
            className="w-10 h-10 rounded-full bg-white/70 border border-[#E6D56D] flex items-center justify-center"
            title="Share list"
            onClick={() => navigate("/share-list")}
          >
            ↗
          </button>
        </div>
      </header>

      {/* Places */}
      <main className="max-w-md mx-auto px-6">
        <div className="space-y-4">
          {places.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place)}
              className="w-full text-left bg-white/75 rounded-2xl overflow-hidden border border-[#E6D56D]/60"
            >
              {/* Image */}
              <div className="h-40 bg-[#C4DAE8]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      {place.name}
                    </h2>

                    <p className="text-sm text-[#432F2E]/55 mt-1">
                      {place.category} · {place.area}
                    </p>
                  </div>

                  <span className="text-[#432F2E]/40">
                    ♡
                  </span>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#FEEFB8]">
                    {place.price}
                  </span>

                  <span className="text-xs px-3 py-1 rounded-full bg-[#C4DAE8]/60">
                    {place.vibe}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default SavedList;