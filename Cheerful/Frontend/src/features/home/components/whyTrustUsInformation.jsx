import { Coffee, Users } from "lucide-react";

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

function Card({ children, className = "", clip = true }) {
  return (
    <div
      className={`relative bg-white/10 overflow-hidden ${className}`}
      style={
        clip
          ? {
              clipPath: "polygon(0 0, 100% 0, 100% 88%, 90% 100%, 0 100%)",
              borderRadius: "1.25rem",
            }
          : { borderRadius: "1.25rem" }
      }
    >
      {children}
    </div>
  );
}

export default function WhyTrustUsInformation() {
  return (
    <section
      className="relative bg-black/30 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />
      <CoffeeRing className="absolute top-0 right-0 w-48 h-48 opacity-[0.1] pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">

        <h2 className="bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10">
          Why Trust Us?
        </h2>

        {/* Woven bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 p-6 sm:p-8 flex items-center">
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              At A Cheerful Cup, trust comes first. We carefully source our
              beans from ethical farms and focus on quality in every cup we
              serve.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 flex items-center gap-4">
            <Coffee className="w-10 h-10 text-yellow-400 shrink-0" />
            <div>
              <p className="text-3xl font-extrabold text-white">180K+</p>
              <p className="text-white/70 text-sm">Cups served</p>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 flex items-center gap-4">
            <Users className="w-10 h-10 text-blue-400 shrink-0" />
            <div>
              <p className="text-3xl font-extrabold text-white">3K+</p>
              <p className="text-white/70 text-sm">Lives touched</p>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6 sm:p-8 flex items-center">
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              Our passionate team is committed to consistency, honesty, and
              genuine customer care — making every visit feel welcoming and
              memorable.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}