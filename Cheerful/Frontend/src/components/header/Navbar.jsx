import { useState } from "react";
import Logo from "../../../public/acc-logo.jpg";
import CaterButton from "../../features/catering/components/CaterButton";
import MenuButton from "../../features/menu/components/MenuButton";
import ReviewsButton from "../../features/reviews/components/ReviewsButton";
import ReturnHomeButton from "../shared/components/ReturnHomeButton";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const accountLink = isAuthenticated && isAdmin ? "/admin" : "/sign-in";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-2.5 sm:py-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
          <img
            src={Logo}
            alt="A Cheerful Cup Logo"
            className="h-7 w-7 sm:h-10 sm:w-auto rounded-full shrink-0"
          />
          <h1 className="min-w-0 text-[13px] leading-tight xs:text-sm sm:text-xl font-bold bg-gradient-to-r from-orange-400 via-yellow-700 to-blue-500 bg-clip-text text-transparent">
            A Cheerful Cup
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
          <Link to="/">
            <ReturnHomeButton />
          </Link>
          <Link to="/menu">
            <MenuButton />
          </Link>
          <Link to="/review-page">
            <ReviewsButton />
          </Link>

          <div className="flex items-center gap-1 lg:gap-2 pl-2 lg:pl-4 border-l border-gray-200">
            <Link
              to="/cart"
              aria-label="View cart"
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 flex items-center justify-center rounded-full bg-sky-500 text-white text-[10px] font-bold leading-none">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              to={accountLink}
              aria-label="Sign in"
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link to="/catering-page">
              <CaterButton />
            </Link>
          </div>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden shrink-0 text-gray-700 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-3 pb-4 space-y-1 border-t border-gray-200 pt-3">
          <Link
            to="/"
            onClick={toggleMenu}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ReturnHomeButton />
          </Link>
          <Link
            to="/menu"
            onClick={toggleMenu}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <MenuButton />
          </Link>
          <Link
            to="/review-page"
            onClick={toggleMenu}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ReviewsButton />
          </Link>
          <Link
            to="/cart"
            onClick={toggleMenu}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <span className="relative">
              <ShoppingCart className="w-4 h-4 text-gray-800" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[1rem] h-[1rem] px-0.5 flex items-center justify-center rounded-full bg-sky-500 text-white text-[9px] font-bold leading-none">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="text-sm sm:text-base font-medium text-gray-800">Cart</span>
          </Link>
          <Link
            to={accountLink}
            onClick={toggleMenu}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <User className="w-4 h-4 text-gray-800" />
            <span className="text-sm sm:text-base font-medium text-gray-800">Sign In</span>
          </Link>
          <Link
            to="/catering-page"
            onClick={toggleMenu}
            className="flex items-center px-3 py-2.5"
          >
            <CaterButton />
          </Link>
        </div>
      )}
    </nav>
  );
}