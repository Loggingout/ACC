import Navbar from "../components/header/Navbar";
import ReviewInformation from "../components/pageInformation/ReviewInformation";
// import LeaveReviewForm from "../components/forms/LeaveReviewForm"; // temporarily disabled
import Footer from "../components/footer/Footer";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Reviews Section */}
      <main className="flex-1">
        <ReviewInformation />

        {/* Leave a Review Section */}
        <section className="mt-12 mb-12 max-w-3xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <p className="text-gray-700 text-lg">
            Review form will be coming soon!
          </p>

          {/* If you want, you can uncomment later */}
          {/* <LeaveReviewForm /> */}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
