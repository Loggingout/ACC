import { Home } from "lucide-react";

export default function ReturnHomeButton() {
  return (
    <button
      className="
        group flex items-center gap-2 sm:gap-3
        px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3
        text-white text-sm sm:text-base md:text-lg font-semibold
        rounded-lg shadow-md
        bg-[length:200%_200%]
        bg-gradient-to-br from-red-500 via-orange-500 to-blue-500
        transition-all duration-500
        hover:bg-[position:100%_0]
        hover:shadow-lg
        active:scale-95
      "
    >
      <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      <span className="drop-shadow-lg">Home</span>
    </button>
  );
}
