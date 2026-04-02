import Navbar from "../components/header/Navbar";
import LobbyImage from "../assets/acc-lobby.png";
import AboutUsInformation from "../components/pageInformation/AboutUsInformation";
import CaterRequestInformation from "../components/pageInformation/caterRequestInformation";
import WhyTrustUsInformation from "../components/pageInformation/whyTrustUsInformation";
import Footer from "../components/footer/Footer";

export default function HomepagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
        
        {/* Hero Image */}
        <img
          src={LobbyImage}
          alt="A Cheerful Cup Lobby"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-extrabold drop-shadow-lg
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome to A Cheerful Cup
          </h1>

          <p className="text-white/90 mt-3 max-w-2xl
                        text-sm sm:text-base md:text-lg">
            Fresh coffee, friendly service, and catering you can count on.
          </p>
        </div>

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