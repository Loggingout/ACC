import Ceo from "../../assets/ceo-and-menu.jpg";
import BusinessRating from "../../assets/acc-business-rating.jpg";

export default function AboutUsInformation() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 rounded-2xl shadow-xl overflow-hidden">
      
      {/* Decorative Background Images */}

      {/* CEO Image */}
      <div
        className="
          relative
          mx-auto
          mb-6
          w-40
          sm:absolute
          sm:top-6
          sm:right-6
          sm:w-52
          md:w-64
          lg:w-72
          opacity-100
          rotate-0
          sm:rotate-6
        "
      >
        <img
          src={Ceo}
          alt="CEO and Menu"
          className="
            w-full
            h-full
            object-cover
            rounded-xl
            shadow-xl
            border-4
            border-white
          "
        />
      </div>

      {/* Business Rating Image */}
      <div
        className="
          relative
          mx-auto
          mb-6
          w-32
          sm:absolute
          sm:bottom-6
          sm:right-10
          sm:w-44
          md:w-56
          lg:w-64
          opacity-100
          rotate-0
          sm:rotate-6
        "
      >
        <img
          src={BusinessRating}
          alt="Business Rating"
          className="
            w-full
            h-full
            object-cover
            rounded-xl
            shadow-xl
            border-4
            border-white
          "
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 sm:p-10 md:p-12">
        
        {/* Title */}
        <h2 className="bg-gradient-to-r from-white via-yellow-400 to-blue-500 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl text-center">
          About Us
        </h2>

        {/* Paragraphs */}
        <div className="space-y-6 sm:space-y-8">
          <p className="text-black text-lg sm:text-xl md:text-2xl leading-relaxed font-medium bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg">
            At A Cheerful Cup, we’re dedicated to crafting the perfect cup of
            coffee. We bring warmth and joy through carefully sourced beans and
            expertly brewed drinks—because coffee isn’t just a beverage, it’s an
            experience that brings people together.
          </p>

          <p className="text-black text-lg sm:text-xl md:text-2xl leading-relaxed font-medium bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg">
            Founded in 2015, A CheerfulCup is a community-loved spot offering
            exceptional service and a welcoming atmosphere—perfect for a quick
            boost or a relaxed visit.
          </p>
        </div>
      </div>
    </section>
  );
}