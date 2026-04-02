import { Home } from "lucide-react";

export default function ReturnHomeButton() {
  return (
    <button
      className="
        group flex items-center gap-1.5 sm:gap-2
        px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2
        text-white
        text-xs sm:text-sm md:text-base
        font-semibold
        rounded-md
        shadow-sm hover:shadow-md
        bg-[length:200%_200%]
        bg-gradient-to-br from-red-500 via-orange-500 to-blue-500
        transition-all duration-500
        hover:bg-[position:100%_0]
        active:scale-95
      "
    >
      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />

      <span className="drop-shadow">Home</span>
    </button>
  );
}