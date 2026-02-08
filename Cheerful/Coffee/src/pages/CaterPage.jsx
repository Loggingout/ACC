import Navbar from "../components/header/Navbar";
import CaterImg from "../assets/catering.jpg";
import CaterInformation from "../components/pageInformation/caterInformation";
import Footer from "../components/footer/Footer";

export default function CaterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
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
      <main className="flex-1">
        <CaterInformation />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
