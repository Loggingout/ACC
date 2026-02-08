export default function ScheduleCater404Modal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose} // closes modal when clicking outside content
    >
      <div
        className="bg-gradient-to-br from-orange-100 via-yellow-100 to-blue-100 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-xl ring-1 ring-orange-200"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Coming Soon 🙌
        </h2>
        <p className="text-gray-700 mb-6">
          Scheduling form coming soon 🔐 -Stayed tuned for further updates. 
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 text-white rounded-full font-semibold hover:pointer shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
