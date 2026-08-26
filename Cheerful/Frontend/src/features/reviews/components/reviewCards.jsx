// ReviewCards.jsx
export default function ReviewCards({ reviews }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review._id ?? review.id}
          className="rounded-xl p-6 bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border border-yellow-300 hover:border-yellow-400 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{review.author}</h3>
              <span className="text-sm text-gray-500">{review.source}</span>
            </div>

            <div className="mb-3 text-yellow-500 text-sm">
              {"★".repeat(review.rating)}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            {review.date ?? (review.createdAt && new Date(review.createdAt).toLocaleDateString())}
          </div>
        </div>
      ))}
    </div>
  );
}
