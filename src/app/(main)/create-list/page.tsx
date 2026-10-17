"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function CreateListPage() {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;
    // TODO: persist the new list (localStorage / backend). The React MVP passed
    // the name through router state but Saved never used it, so for now we
    // just head back to the Saved page.
    router.push("/saved");
  };
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29291F] pb-24">
      {/* Header */}
      <header className="max-w-md mx-auto px-6 pt-8 pb-5">
        <button
          onClick={() => router.back()}
          className="text-sm text-[#29291F]/60 mb-5 hover:text-[#29291F] transition-colors"
        >
          ← Back
        </button>
        <div>
          <p className="text-sm text-[#29291F]/50">New collection</p>
          <h1 className="font-serif text-3xl font-semibold mt-1">Create a list</h1>
          <p className="text-sm text-[#29291F]/60 mt-2">
            Organize your favorite spots by vibe, neighborhood, or occasion.
          </p>
        </div>
      </header>
      {/* Form */}
      <main className="max-w-md mx-auto px-6 mt-2">
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="bg-white/75 rounded-2xl p-4 border border-[#29291F]/15 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#29291F]/50">
              List Name
            </label>
            <input
              type="text"
              placeholder="e.g., Abuja Date Spots, Cute Cafés"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full bg-transparent text-lg font-serif outline-none placeholder-[#29291F]/30 text-[#29291F]"
              required
            />
          </div>
          <div className="bg-white/75 rounded-2xl p-4 border border-[#29291F]/15 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#29291F]/50">
              Description (Optional)
            </label>
            <textarea
              placeholder="Add a short note about this list..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-transparent text-sm outline-none resize-none placeholder-[#29291F]/30 text-[#29291F]"
            />
          </div>
          <div className="bg-white/75 rounded-2xl p-4 border border-[#29291F]/15 flex items-center justify-between">
            <div>
              <p className="font-serif font-medium text-base">Private list</p>
              <p className="text-xs text-[#29291F]/50 mt-0.5">
                Only you can view this collection
              </p>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-5 h-5 accent-[#29291F] rounded cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#29291F] text-white font-medium py-3.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-4"
          >
            Create list
          </button>
        </form>
      </main>
    </div>
  );
}
