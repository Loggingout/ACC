import { useNavigate } from "react-router-dom";

export default function ScheduleCaterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
    >
      Schedule Catering
    </button>
  );
}

