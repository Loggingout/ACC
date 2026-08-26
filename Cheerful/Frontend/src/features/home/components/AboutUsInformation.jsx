import Ceo from "../../../assets/ceo-and-menu.jpg";
import BusinessRating from "../../../assets/acc-business-rating.jpg";

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

export default function AboutUsInformation() {
  return (
    <section
      className="relative bg-black/40 overflow-hidden"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 94%, 95% 100%, 0 100%)",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />

      {/* Coffee ring accent */}
      <CoffeeRing className="absolute -top-6 -left-6 w-40 h-40 opacity-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 px-6 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">

        {/* Image cluster */}
        <div className="lg:col-span-2 relative flex items-center justify-center gap-4 sm:gap-0">
          <div
            className="w-2/3 sm:w-1/2 lg:w-3/5 aspect-[4/5] overflow-hidden shadow-xl relative z-10"
            style={{ borderRadius: "63% 37% 54% 46% / 43% 37% 63% 57%" }}
          >
            <img src={Ceo} alt="CEO and Menu" className="w-full h-full object-cover" />
          </div>
          <div
            className="w-1/2 sm:w-2/5 aspect-square overflow-hidden shadow-xl -ml-8 sm:-ml-10 mt-16 sm:mt-24 border-4 border-black/40"
            style={{ borderRadius: "42% 58% 63% 37% / 41% 45% 55% 59%" }}
          >
            <img src={BusinessRating} alt="Business Rating" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-3 relative flex flex-col justify-center">
          <span
            aria-hidden="true"
            className="absolute -top-6 right-0 sm:right-4 text-[6rem] sm:text-[8rem] font-extrabold text-white/[0.05] leading-none select-none"
          >
            2015
          </span>

          <h2 className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">
            About Us
          </h2>

          <div className="relative space-y-5 sm:space-y-6 max-w-xl">
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              At A Cheerful Cup, we're dedicated to crafting the perfect cup of
              coffee. We bring warmth and joy through carefully sourced beans
              and expertly brewed drinks—because coffee isn't just a beverage,
              it's an experience that brings people together.
            </p>

            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              Founded in 2015, A Cheerful Cup is a community-loved spot
              offering exceptional service and a welcoming atmosphere—perfect
              for a quick boost or a relaxed visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}