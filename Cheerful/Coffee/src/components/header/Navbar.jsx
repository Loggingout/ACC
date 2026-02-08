import { useState } from "react";
import Logo from "../../../public/acc-logo.jpg";
import CaterButton from "../buttons/CaterButton";
import MenuButton from "../buttons/MenuButton";
import ReviewsButton from "../buttons/ReviewsButton";
import ReturnHomeButton from "../buttons/ReturnHomeButton";
import { Link } from "react-router-dom";
import { Menu, X, Home, Utensils, Star, Coffee } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={Logo}
            alt="A Cheerful Cup Logo"
            className="h-10 sm:h-12 w-auto rounded-md"
          />
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
            A Cheerful Cup
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-500" />
            <ReturnHomeButton />
          </Link>
          <Link to="/menu" className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-500" />
            <MenuButton />
          </Link>
          <Link to="/review-page" className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-700" />
            <ReviewsButton />
          </Link>
          <Link to="/catering" className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-red-500" />
            <CaterButton />
          </Link>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-black p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden  px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 text-blue-500" />
            <ReturnHomeButton />
          </Link>
          <Link
            to="/menu"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Utensils className="w-5 h-5 text-orange-500" />
            <MenuButton />
          </Link>
          <Link
            to="/review-page"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Star className="w-5 h-5 text-yellow-700" />
            <ReviewsButton />
          </Link>
          <Link
            to="/catering"
            onClick={toggleMenu}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Coffee className="w-5 h-5 text-red-600" />
            <CaterButton />
          </Link>
        </div>
      )}
    </nav>
  );
}
