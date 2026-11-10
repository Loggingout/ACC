import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AboutUsInformation from "../features/home/components/AboutUsInformation";
import WhyTrustUsInformation from "../features/home/components/whyTrustUsInformation";

const HERO_IMAGES = [
  { src: "/new-acc-pic.jpeg", alt: "The team at A Cheerful Cup" },
  { src: "/outside-view.jpeg", alt: "The entrance to A Cheerful Cup" },
];

export default function HomepagePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = (direction) => {
    setCurrentImageIndex((current) => (current + direction + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  return (
    <div className="w-full bg-white text-gray-950">
      <section className="relative isolate flex min-h-[min(42rem,calc(100svh-7rem))] overflow-hidden bg-gray-900">
        {HERO_IMAGES.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={index === currentImageIndex ? image.alt : ""}
            aria-hidden={index !== currentImageIndex}
            className={`absolute inset-0 h-full w-full object-cover object-[30%_center] transition-opacity duration-700 motion-reduce:transition-none ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent lg:bg-linear-to-l lg:from-black/85 lg:via-black/30 lg:to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-24 pt-24 sm:px-10 sm:pt-36 lg:items-end lg:justify-center lg:px-14 lg:py-20">
          <div className="w-full max-w-xl text-white">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-yellow-300">
              <span className="h-2 w-2 rounded-full bg-orange-400" /> Coffee, community &amp; a smile
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">A Cheerful Cup</h1>
            <p className="mt-4 max-w-md text-xl font-medium leading-snug sm:text-2xl">Coffee brewed with love, served with a smile.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">From handcrafted espresso to fresh pastries, every cup is made to brighten your day.</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/menu" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-gray-950 hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <ShoppingBag size={16} /> Order Online
              </Link>
              <Link to="/review-page" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/80 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <Star size={16} /> Leave a Review
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:right-10 lg:bottom-8 lg:right-14">
          <span className="mr-2 text-xs font-semibold tabular-nums text-white">0{currentImageIndex + 1} / 0{HERO_IMAGES.length}</span>
          <button type="button" onClick={() => changeImage(-1)} aria-label="Previous photo" title="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/70 text-white hover:bg-white hover:text-gray-950"><ArrowLeft size={16} /></button>
          <button type="button" onClick={() => changeImage(1)} aria-label="Next photo" title="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-white/70 text-white hover:bg-white hover:text-gray-950"><ArrowRight size={16} /></button>
        </div>
        <a href="#about" aria-label="Explore A Cheerful Cup" className="absolute bottom-7 left-6 hidden items-center gap-2 text-xs font-semibold text-white/90 hover:text-white sm:flex sm:left-10 lg:left-14"><ArrowDown size={16} /> Discover more</a>
      </section>

      <AboutUsInformation />
      <WhyTrustUsInformation />
    </div>
  );
}