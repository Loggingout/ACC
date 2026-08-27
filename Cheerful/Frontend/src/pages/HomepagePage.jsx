import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import AboutUsInformation from "../features/home/components/AboutUsInformation";
// import CaterRequestInformation from "../features/home/components/caterRequestInformation";
import WhyTrustUsInformation from "../features/home/components/whyTrustUsInformation";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function CoffeeRing({ className }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="90" r="70" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="112" cy="102" r="54" stroke="#f97316" strokeWidth="1.5" />
    </svg>
  );
}

export default function HomepagePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const heroWords = ["Love", "Passion", "Excitement"];

  const heroImages = [
    { src: "/new-acc-pic.jpeg", alt: "A Cheerful Cup Lobby" },
    { src: "/outside-view.jpeg", alt: "A Cheerful Cup Exterior View" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setHeroWordIndex((i) => (i + 1) % heroWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, [heroWords.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    // full-bleed: breaks out of MainLayout's max-w-7xl container so homepage sections span the viewport;
    // negative top/bottom margins cancel out MainLayout's py-* so hero/footer sit flush against the navbar/footer
    <div className="w-screen relative left-1/2 -translate-x-1/2 -mt-6 sm:-mt-8 md:-mt-10 -mb-6 sm:-mb-8 md:-mb-10 flex flex-col gap-6 lg:gap-8">
      {/* Hero Section */}
      <section
        className="relative bg-black/40 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 6% 100%, 0 92%)",
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("${GRAIN}")` }}
        />

        {/* Coffee ring accent */}
        <CoffeeRing className="absolute -top-10 -right-10 w-56 h-56 opacity-[0.12] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 sm:px-10 py-8 sm:py-12">

          
          <div className="flex flex-col gap-5 sm:gap-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Coffee brewed with{" "}
              <span
                className="relative inline-block bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
                style={{ perspective: 400 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroWords[heroWordIndex]}
                    className="inline-block"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {heroWords[heroWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              , served with a smile.
            </h1>

            <p className="text-white/80 text-sm sm:text-base max-w-md">
              From handcrafted espresso to fresh pastries, every cup is made
              to brighten your day.
            </p>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} className="fill-yellow-400" />
                <span className="font-semibold text-white">5.0</span>
              </div>
              <span className="text-white/60">from our customers</span>
            </div>
          </div>

          {/* Right: image slider card */}
          <div
            className="relative overflow-hidden h-64 sm:h-80 lg:h-[26rem]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 88%)",
              borderRadius: "1.25rem",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-4">
              <p className="text-xs uppercase tracking-wide text-orange-300 font-semibold mb-1">
                Featured
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  A Cheerful Cup
                </h3>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star size={14} className="fill-yellow-400" />
                  5.0
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main content, full width sections stacked */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <AboutUsInformation />
        <WhyTrustUsInformation />
        
      </div>
    </div>
  );
}