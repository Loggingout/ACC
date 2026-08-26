import { useState } from "react";
import ReviewInformation from "../features/reviews/components/ReviewInformation";
import LeaveReviewForm from "../features/reviews/components/LeaveReviewForm";

export default function ReviewsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <ReviewInformation key={refreshKey} />

      {/* Leave a Review Section */}
      <section className="mb-12">
        <LeaveReviewForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
      </section>
    </>
  );
}
