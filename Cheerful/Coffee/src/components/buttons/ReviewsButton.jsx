import { Star } from "lucide-react";

export default function ReviewsButton() {
  return (
    <button
      className="
        flex items-center gap-1.5 sm:gap-2
        px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2
        bg-gradient-to-br from-red-500 via-orange-500 to-blue-500
        text-white
        text-xs sm:text-sm md:text-base
        font-semibold
        rounded-md
        hover:opacity-90
        transition-all duration-300
        shadow-sm hover:shadow-md
        active:scale-95
      "
    >
      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />

      <span className="drop-shadow">Reviews</span>
    </button>
  );
}