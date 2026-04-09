import Navbar from "../components/header/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutUsInformation from "../components/pageInformation/AboutUsInformation";
import CaterRequestInformation from "../components/pageInformation/caterRequestInformation";
import WhyTrustUsInformation from "../components/pageInformation/whyTrustUsInformation";
import Footer from "../components/footer/Footer";

export default function HomepagePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      src: "/new-acc-pic.jpeg",
      alt: "A Cheerful Cup Lobby"
    },
    {
      src: "/outside-view.jpeg",
      alt: "A Cheerful Cup Exterior View"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
        
        {/* Hero Images Slider */}
        <div className="relative w-full h-full">
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

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        

      </section>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 gap-6 sm:gap-8 md:gap-10">
        
        {/* Catering Section */}
        <div className="w-full max-w-7xl">
          <CaterRequestInformation />
        </div>
        
        {/* About Us Section */}
        <div className="w-full max-w-7xl">
          <AboutUsInformation />
        </div>

        {/* Why Trust Us Section */}
        <div className="w-full max-w-7xl">
          <WhyTrustUsInformation />
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}