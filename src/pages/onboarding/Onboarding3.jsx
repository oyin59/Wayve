import { useNavigate } from "react-router-dom";

function Onboarding3() {
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
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
        <div className="h-1.5 flex-1 rounded-full bg-[#432F2E]" />
      </div>

      {/* Image */}
      <div className="mt-10 h-[330px] rounded-[32px] overflow-hidden bg-[#2E1E1A] relative">

        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          🌆
        </div>

        <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4">

          <p className="text-xs text-[#432F2E]/60">
            Wayve recommendation
          </p>

          <p className="font-serif text-xl mt-1">
            A place that fits you.
          </p>

        </div>

      </div>

      {/* Text */}
      <div className="mt-8">

        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8DBBD4]">
          Curated for you
        </p>

        <h2 className="font-serif text-4xl leading-tight mt-2">
          Explore.
          <br />
          Come back.
        </h2>

        <p className="mt-4 text-base leading-relaxed text-[#432F2E]/70">
          Your favourite spots, in one place.
        </p>

      </div>

      {/* Button */}
      <div className="mt-auto pt-8">

        <button
          onClick={() => navigate("/vibe")}
          className="w-full bg-[#432F2E] text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition"
        >
          Get started
        </button>

      </div>

    </div>
  );
}

export default Onboarding3;