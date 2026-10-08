import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function GroupPlanning() {
  const navigate = useNavigate();
  const [planTitle, setPlanTitle] = useState("");
  const [date, setDate] = useState("");

  const handleStartPlanning = (e) => {
    e.preventDefault();
    if (!planTitle.trim()) return;
    
    // Proceed to a shared itinerary or view
    navigate("/saved", { state: { message: "Group plan created successfully!" } });
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] pb-24">
      {/* Header */}
      <header className="max-w-md mx-auto px-6 pt-8 pb-5">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#432F2E]/60 mb-5 hover:text-[#432F2E] transition-colors"
        >
          ← Back
        </button>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#432F2E]/50">
            Collaborative
          </span>
          <h1 className="font-serif text-3xl font-semibold mt-1">Plan a day out</h1>
          <p className="text-sm text-[#432F2E]/60 mt-2">
            Create an outing itinerary and easily gather votes or suggestions with friends.
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-md mx-auto px-6 mt-2">
        <form onSubmit={handleStartPlanning} className="space-y-5">
          <div className="bg-white/75 rounded-2xl p-4 border border-[#E6D56D]/60 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#432F2E]/50">
              Outing Title
            </label>
            <input
              type="text"
              placeholder="e.g., Saturday Cafe Crawl, Birthday Dinner"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              className="w-full bg-transparent text-lg font-serif outline-none placeholder-[#432F2E]/30 text-[#432F2E]"
              required
            />
          </div>

          <div className="bg-white/75 rounded-2xl p-4 border border-[#E6D56D]/60 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#432F2E]/50">
              Target Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none text-[#432F2E]"
            />
          </div>

          <div className="bg-[#C4DAE8]/40 border border-[#C4DAE8] rounded-2xl p-4 text-sm text-[#432F2E]/80 space-y-1">
            <p className="font-semibold">💡 How it works</p>
            <p className="text-xs leading-relaxed">
              Once created, you can add saved spots to this plan and generate a shareable link for your friends to view or vote on locations.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#432F2E] text-white font-medium py-3.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-2"
          >
            Start planning session
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}

export default GroupPlanning;