import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function WriteReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const place = location.state?.place;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/review-success", {
      state: {
        place,
        rating,
        review,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E]">

      <div className="max-w-md mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#432F2E]/60 mb-6"
        >
          ← Back
        </button>

        {/* Heading */}
        <p className="text-sm text-[#432F2E]/50">
          Share your experience
        </p>

        <h1 className="font-serif text-3xl font-semibold mt-1">
          Write a review
        </h1>

        {place && (
          <div className="mt-6 bg-white/70 rounded-2xl p-4 border border-[#E6D56D]/60">
            <p className="font-serif text-xl font-semibold">
              {place.name}
            </p>

            <p className="text-sm text-[#432F2E]/55 mt-1">
              {place.category} · {place.neighbourhood || place.area}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">

          {/* Rating */}
          <div>
            <p className="font-semibold text-sm">
              How was your experience?
            </p>

            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl ${
                    star <= rating
                      ? "bg-[#E6D56D] border-[#E6D56D]"
                      : "bg-white/70 border-[#432F2E]/15"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="mt-8">
            <label className="font-semibold text-sm">
              Your review
            </label>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you think?"
              rows={6}
              className="w-full mt-3 rounded-2xl border border-[#432F2E]/15 bg-white/70 px-4 py-4 outline-none resize-none placeholder:text-[#432F2E]/35 focus:border-[#432F2E]/40"
            />

            <p className="text-xs text-[#432F2E]/40 mt-2">
              {review.length}/500
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!rating || !review.trim()}
            className={`w-full mt-6 py-4 rounded-2xl font-semibold ${
              rating && review.trim()
                ? "bg-[#432F2E] text-[#FCF1D0]"
                : "bg-[#432F2E]/20 text-[#432F2E]/40"
            }`}
          >
            Post review
          </button>

        </form>
      </div>
    </div>
  );
}

export default WriteReview;