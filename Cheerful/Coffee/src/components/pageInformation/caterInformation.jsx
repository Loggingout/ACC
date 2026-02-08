import { Coffee, Heart, Clock, DollarSign } from "lucide-react";

export default function CaterInformation() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Catering That Brings People Together
        </h2>

        {/* Short & Sweet Paragraph */}
        <p className="text-center text-black max-w-3xl mx-auto mb-12 text-lg sm:text-xl leading-relaxed bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg">
          From corporate events to private gatherings, our full-service coffee
          catering delivers premium drinks, friendly service, and unforgettable
          moments — wherever you need us.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Metric 1 */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <Clock className="w-10 h-10 text-orange-400" />
            <div>
              <p className="text-3xl font-extrabold text-black">15+</p>
              <p className="text-black/80 text-sm sm:text-base">
                Years of catering experience
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <Heart className="w-10 h-10 text-red-400" />
            <div>
              <p className="text-3xl font-extrabold text-black">200K+</p>
              <p className="text-black text-sm sm:text-base">
                Hearts touched through service
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <Coffee className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-3xl font-extrabold text-black">350K+</p>
              <p className="text-black text-sm sm:text-base">
                Cups of coffee served
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="w-7 h-7 text-green-400" />
            <h3 className="text-2xl sm:text-3xl font-bold text-black">
              $300/hr
            </h3>
          </div>

          <p className="text-black/90 text-lg sm:text-xl font-semibold">
            Full-Service Catering Package
          </p>

          <p className="text-black/70 text-sm sm:text-base mt-2">
            Includes professional baristas, premium coffee, and on-site service
          </p>
        </div>

      </div>
    </section>
  );
}
