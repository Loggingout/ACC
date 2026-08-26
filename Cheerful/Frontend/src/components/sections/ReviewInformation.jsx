// ReviewInformation.jsx
import { reviews } from "./reviewInformation/reviewInformation";
import ReviewCards from "../../features/reviews/components/reviewCards"; // import your card component

export default function ReviewInformation() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        What Our Customers Say
      </h2>

      {/* Use the ReviewCards component to render reviews */}
      <ReviewCards reviews={reviews} />
    </section>
  );
}
