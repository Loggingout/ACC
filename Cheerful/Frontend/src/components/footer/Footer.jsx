import Logo from "../../../public/acc-logo.jpg";
import PartnerLogo from "../../assets/partner-logo.png";
import { Clock, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const COMPANY_LINKS = [
  { label: "Book for Catering", to: "/catering-page" },
  { label: "Leave A Review", to: "/review-page" },
  {/** 
  { label: "Reward Program", to: "/" },
  { label: "Refer to a Friend", to: "/" },
  { label: "Data Policy", to: "/" },
  { label: "Privacy Policy", to: "/" },
  { label: "Terms of Service", to: "/" },
   */}
];

export default function Footer() {
  return (
    <div className="bg-white text-black py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <img
              src={Logo}
              alt="A Cheerful Cup Logo"
              className="h-10 sm:h-12 w-auto rounded-md"
            />
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-sky-500" />
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Brewing joy, one cup at a time
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
            <Clock className="w-5 h-5 text-sky-500 shrink-0 mt-0 sm:mt-1" />
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-semibold text-black mb-1">
                Business Hours
              </p>
              <p className="text-xs sm:text-sm text-gray-700">
                7:30am - 2:00pm M-F
              </p>
              <p className="text-xs text-gray-600">
                Closed all holidays & on weekends
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-sm sm:text-base font-semibold text-black mb-1">
              Contact Us
            </p>
            <div className="flex items-center gap-2">
              <a
                href="tel:5551234567"
                className="text-xs sm:text-sm text-gray-700 hover:text-black transition-colors"
              >
                (720) 468-9468
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:Acheerfulcup@gmail.com"
                className="text-xs sm:text-sm text-gray-700 hover:text-black transition-colors"
              >
                Acheerfulcup@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.google.com/maps/place/A+cheerful+Cup/@39.6898918,-104.9447929,17z/data=!3m1!5s0x8707e28c84994409:0x507bd2e0b6c7f442!4m6!3m5!1s0x876c7f0bdbd727b5:0xd4eadbdad48a8d99!8m2!3d39.6898918!4d-104.942218!16s%2Fg%2F11qnc2c9k7?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-gray-700 hover:underline"
              >
                3801 E Florida Ave Denver, CO 80210
              </a>
            </div>
          </div>

          {/* Company Pages */}
          
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-sm sm:text-base font-semibold text-black mb-1">
              Company
            </p>
            <nav aria-label="Company">
              <ul className="flex flex-col items-center sm:items-start gap-2">
                {COMPANY_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-xs sm:text-sm text-gray-700 hover:text-black transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
       

          {/* Partner Logo */}
          <div className="flex flex-col items-center sm:items-start lg:items-center gap-2">
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Powered By
            </p>

            <a
              href="https://fantometechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={PartnerLogo}
                alt="Partner Logo"
                className="h-6 sm:h-7 lg:h-8 w-auto rounded-1xl hover:opacity-90 transition"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            © 2026 A Cheerful Cup. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
