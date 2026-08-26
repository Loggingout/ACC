// ReviewInformation.jsx
import { useReviews } from "../hooks/useReviews";
import ReviewCards from "./reviewCards"; // import your card component

export default function ReviewInformation() {
  const { reviews, loading, error } = useReviews();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2
        className="text-3xl font-bold mb-8 text-center text-white"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.35)" }}
      >
        What Our Customers Say
      </h2>

      {loading && <p className="text-white/70 text-center">Loading reviews…</p>}
      {error && !loading && (
        <p className="text-red-300 text-center">Couldn't load reviews: {error}</p>
      )}
      {!loading && !error && <ReviewCards reviews={reviews} />}
    </section>
  );
}
