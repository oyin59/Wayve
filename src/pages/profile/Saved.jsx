import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function Saved() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("Places");

  // Initialize saved places with default items plus any newly passed place from navigation state
  const [savedPlaces, setSavedPlaces] = useState([
    {
      id: 1,
      name: "Pink Bear",
      category: "Café",
      area: "Wuse",
      image: "/images/pink-bear.jpg",
      distance: "1.0km",
    },
    {
      id: 2,
      name: "Café de Vie",
      category: "Café",
      area: "Maitama",
      image: "/images/cafe-de-vie.jpg",
      distance: "3.2km",
    },
    {
      id: 3,
      name: "Nosta",
      category: "Café",
      area: "Wuse",
      image: "/images/nosta.jpg",
      distance: "1.4km",
    },
    {
      id: 4,
      name: "Eli & Lulu's",
      category: "Dining",
      area: "Maitama",
      image: "/images/eli-lulus.jpg",
      distance: "3.8km",
    },
  ]);

  // Handle incoming place from PlaceDetailPage
  useEffect(() => {
    const incomingPlace = location.state?.place;
    if (incomingPlace) {
      setSavedPlaces((prev) => {
        // Check if it's already in the list to avoid duplicates
        const exists = prev.some((p) => p.name === incomingPlace.name);
        if (!exists) {
          return [
            {
              id: Date.now(),
              name: incomingPlace.name,
              category: incomingPlace.category || "Spot",
              area: incomingPlace.neighbourhood || incomingPlace.area || "Abuja",
              image: incomingPlace.image || "",
              distance: incomingPlace.distance || "",
            },
            ...prev,
          ];
        }
        return prev;
      });
    }
  }, [location.state]);

  const savedLists = [
    {
      id: 1,
      name: "Abuja Date Spots",
      places: 8,
    },
    {
      id: 2,
      name: "Cute Cafés",
      places: 6,
    },
    {
      id: 3,
      name: "Places to Try",
      places: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">
      {/* Header with Back Button */}
      <header className="px-5 pt-8 pb-5 max-w-md mx-auto">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-brown/70 hover:text-brown transition-colors"
          >
            ← Back
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Saved</h1>
            <p className="text-sm text-brown/55 mt-1">
              Keep track of places you want to visit.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-list")}
            className="w-11 h-11 rounded-full bg-brown text-white flex items-center justify-center text-xl shadow-sm"
          >
            +
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-1 flex shadow-sm">
          {["Places", "Lists"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm transition ${
                activeTab === tab
                  ? "bg-brown text-white font-semibold shadow-sm"
                  : "text-brown/55 hover:text-brown"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Places */}
      {activeTab === "Places" && (
        <main className="max-w-md mx-auto px-5 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl font-bold">Saved places</h2>
              <p className="text-xs text-brown/50 mt-1">
                {savedPlaces.length} places saved
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {savedPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() =>
                  navigate("/detail", {
                    state: { place },
                  })
                }
                className="w-full bg-white rounded-2xl p-3 flex gap-3 text-left shadow-sm hover:shadow transition-shadow"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#E8E1D2] shrink-0">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 py-1">
                  <p className="text-xs text-brown/50">{place.category}</p>
                  <h3 className="font-semibold truncate mt-1">{place.name}</h3>
                  <p className="text-xs text-brown/55 mt-1">📍 {place.area}</p>
                  {place.distance && (
                    <p className="text-xs text-brown/40 mt-1">
                      {place.distance} away
                    </p>
                  )}
                </div>

                <div className="text-brown/40 pt-2">♥</div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Saved Lists */}
      {activeTab === "Lists" && (
        <main className="max-w-md mx-auto px-5 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl font-bold">Your lists</h2>
              <p className="text-xs text-brown/50 mt-1">
                Organise places your way.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-list")}
              className="text-sm font-semibold text-brown hover:underline"
            >
              + New list
            </button>
          </div>

          <div className="space-y-3">
            {savedLists.map((list) => (
              <button
                key={list.id}
                onClick={() => navigate("/saved-list")}
                className="w-full bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold">{list.name}</h3>
                    <p className="text-xs text-brown/50 mt-1">
                      {list.places} saved places
                    </p>
                  </div>
                  <span className="text-xl text-brown/40">→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Group Planning */}
          <button
            onClick={() => navigate("/group-planning")}
            className="w-full mt-5 bg-[#C4DAE8] rounded-2xl p-5 text-left shadow-sm hover:opacity-95 transition-opacity"
          >
            <p className="text-xs font-semibold uppercase tracking-wide">
              Planning something?
            </p>
            <h3 className="font-serif text-xl font-bold mt-1">
              Plan a day out together
            </h3>
            <p className="text-sm text-brown/65 mt-2">
              Create a plan and share places with your friends.
            </p>
            <span className="inline-block mt-4 text-sm font-semibold">
              Start planning →
            </span>
          </button>
        </main>
      )}

      <BottomNav />
    </div>
  );
}

export default Saved;