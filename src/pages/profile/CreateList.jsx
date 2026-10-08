import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function CreateList() {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!listName.trim()) return;

    // Here you would typically save to state or backend
    // For now, we navigate back or to the saved lists page with state
    navigate("/saved", { state: { newListName: listName } });
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
          <p className="text-sm text-[#432F2E]/50">New collection</p>
          <h1 className="font-serif text-3xl font-semibold mt-1">Create a list</h1>
          <p className="text-sm text-[#432F2E]/60 mt-2">
            Organize your favorite spots by vibe, neighborhood, or occasion.
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-md mx-auto px-6 mt-2">
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="bg-white/75 rounded-2xl p-4 border border-[#E6D56D]/60 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#432F2E]/50">
              List Name
            </label>
            <input
              type="text"
              placeholder="e.g., Abuja Date Spots, Cute Cafés"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full bg-transparent text-lg font-serif outline-none placeholder-[#432F2E]/30 text-[#432F2E]"
              required
            />
          </div>

          <div className="bg-white/75 rounded-2xl p-4 border border-[#E6D56D]/60 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#432F2E]/50">
              Description (Optional)
            </label>
            <textarea
              placeholder="Add a short note about this list..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full bg-transparent text-sm outline-none resize-none placeholder-[#432F2E]/30 text-[#432F2E]"
            />
          </div>

          <div className="bg-white/75 rounded-2xl p-4 border border-[#E6D56D]/60 flex items-center justify-between">
            <div>
              <p className="font-serif font-medium text-base">Private list</p>
              <p className="text-xs text-[#432F2E]/50 mt-0.5">
                Only you can view this collection
              </p>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-5 h-5 accent-[#432F2E] rounded cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#432F2E] text-white font-medium py-3.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-4"
          >
            Create list
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}

export default CreateList;