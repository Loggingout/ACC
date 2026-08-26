// CheckoutLayout.jsx — a distraction-free shell for the checkout flow (no full nav/footer)
import { Link, Outlet } from "react-router-dom";
import { Lock } from "lucide-react";
import Logo from "../../../public/acc-logo.jpg";

export default function CheckoutLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 max-w-3xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="A Cheerful Cup Logo" className="h-8 w-8 rounded-full" />
            <span className="font-bold text-sm sm:text-base text-gray-800">A Cheerful Cup</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
            <Lock className="w-3.5 h-3.5" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 px-4 sm:px-6 py-8 sm:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
