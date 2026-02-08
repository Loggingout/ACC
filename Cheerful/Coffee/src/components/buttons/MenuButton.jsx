import { BookOpen } from "lucide-react";

export default function MenuButton() {
  return (
    <button className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md">
      
      {/* Icon */}
      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />

      {/* Text */}
      <span>Menu</span>
    </button>
  );
}
