// LeaveReviewForm.jsx
import { useState } from "react";
import { submitReview } from "../api/reviewsApi";

export default function LeaveReviewForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await submitReview({ author: name, rating, comment: message });
      setName("");
      setRating(5);
      setMessage("");
      setStatus("idle");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to submit your review. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Leave a Review
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Number of Stars */}
        <div className="flex flex-col">
          <label htmlFor="rating" className="mb-1 font-medium text-gray-700">
            Number of Stars
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </div>

        {/* Leave a message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-medium text-gray-700">
            Leave a Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder="Write your review here..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Notice text */}
        <p className="text-sm text-gray-600 italic text-center">
          Be sure to read your review before submission, once submitted it will be displayed above with all other testimonials.
        </p>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
