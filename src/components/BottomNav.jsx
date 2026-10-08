import { useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brown/95 backdrop-blur-md border-t border-brown z-40">
      <div className="max-w-md mx-auto flex items-center justify-around px-4 py-3">

        {/* Discover */}
        <button
          onClick={() => navigate("/discover")}
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/discover")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">✦</span>
          Discover
        </button>

        {/* Map */}
        <button
          onClick={() => navigate("/map")}
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/map")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">🗺️</span>
          Map
        </button>

        {/* Community */}
        <button
          onClick={() => navigate("/community")}
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/community")
             ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">💬</span>
          Community
        </button>

        {/* Saved */}
        <button
          onClick={() => navigate("/saved")}
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/saved")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">♡</span>
          Saved
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center gap-1 text-xs ${
            isActive("/profile")
              ? "text-butter font-semibold"
              : "text-butter/50"
          }`}
        >
          <span className="text-lg">◯</span>
          Profile
        </button>

      </div>
    </nav>
  );
}

export default BottomNav;