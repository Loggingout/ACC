import { Coffee, Users } from "lucide-react";

export default function WhyTrustUsInformation() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20">
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 sm:p-10 md:p-12">
        
        {/* Title */}
        <h2 className="bg-gradient-to-r from-white via-yellow-400 to-blue-500 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 text-center drop-shadow-lg">
          Why Trust Us?
        </h2>

        {/* Shortened Paragraphs */}
        <div className="space-y-6 mb-12">
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed font-medium bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg">
            At A Cheerful Cup, trust comes first. We carefully source our beans
            from ethical farms and focus on quality in every cup we serve.
          </p>

          <p className="text-white/90 text-lg sm:text-xl leading-relaxed font-medium bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg">
            Our passionate team is committed to consistency, honesty, and genuine
            customer care — making every visit feel welcoming and memorable.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Metric Card 1 */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <Coffee className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-3xl font-extrabold text-white">180K+</p>
              <p className="text-white/80 text-sm sm:text-base">
                Cups of coffee served
              </p>
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <Users className="w-10 h-10 text-blue-400" />
            <div>
              <p className="text-3xl font-extrabold text-white">3K+</p>
              <p className="text-white/80 text-sm sm:text-base">
                Lives touched in our community
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
