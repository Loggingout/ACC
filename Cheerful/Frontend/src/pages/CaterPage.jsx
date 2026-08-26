import CaterImg from "../assets/catering.jpg";
import CaterInformation from "../features/catering/components/caterInformation";

export default function CaterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl">
        <img
          src={CaterImg}
          alt="Coffee Catering"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl">
            Professional Coffee Catering
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <CaterInformation />
    </>
  );
}
