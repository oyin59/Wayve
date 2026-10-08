import { useNavigate } from "react-router-dom";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col px-6 py-6 max-w-md mx-auto">

      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif">
          Way<span className="italic text-[#8DBBD4]">ve</span>
        </h1>

        <button
          onClick={() => navigate("/discover")}
          className="text-sm text-[#432F2E]/60"
        >
          Skip
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mt-6">
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#E6D56D]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#E6D56D]" />
      </div>

      {/* Image */}
      <div className="mt-10 h-[330px] rounded-[32px] bg-[#C4DAE8] overflow-hidden flex items-center justify-center">
        <div className="text-center px-8">
          <div className="text-7xl mb-5">🍽️☕</div>
          <p className="text-sm text-[#432F2E]/50">
            Discover amazing places around Abuja
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8DBBD4]">
          Welcome to Wayve
        </p>

        <h2 className="font-serif text-4xl leading-tight mt-2">
          Discover amazing
          <br />
          spots in Abuja
        </h2>

        <p className="mt-4 text-base leading-relaxed text-[#432F2E]/70">
          Cafés, restaurants, hangouts and more — all in one place.
        </p>
      </div>

      {/* Button */}
      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate("/onboarding2")}
          className="w-full bg-[#432F2E] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Onboarding;