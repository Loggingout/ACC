import { Link } from "react-router-dom";

export default function Universal404Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-yellow-100 to-blue-100">
      <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl max-w-md mx-4">
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl sm:text-3xl text-gray-700 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mb-6">
          The page you are looking for is under construction.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 text-white font-semibold rounded-full transition shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
