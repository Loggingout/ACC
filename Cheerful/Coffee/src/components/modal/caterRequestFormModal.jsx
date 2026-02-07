import CaterRequestForm from "../forms/CaterRequestForm";
import { X } from "lucide-react";

export default function CaterReuestFormModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 sm:p-4 md:p-6">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg
 h-screen overflow-y-auto relative inset-0"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-3 sm:m-4 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-md z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-900" />
        </button>

        <div className="clear-both">
          <CaterRequestForm />
        </div>
      </div>
    </div>
  );
}
