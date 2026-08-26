// MaintenancePage.jsx — full-site takeover shown while a maintenance banner is active
import { Wrench } from "lucide-react";

export default function MaintenancePage({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700 px-4">
      <div className="bg-black/40 rounded-3xl shadow-2xl max-w-md w-full text-center px-6 sm:px-10 py-10 sm:py-14">
        <div className="mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500">
          <Wrench className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">We'll be back soon</h1>
        <p className="text-white/70 leading-relaxed">
          {message || "We're currently down for scheduled maintenance. Thanks for your patience!"}
        </p>
      </div>
    </div>
  );
}
