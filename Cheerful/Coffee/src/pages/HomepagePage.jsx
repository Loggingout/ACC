import Navbar from "../components/header/Navbar";
import LobbyImage from "../assets/acc-lobby.png";
import AboutUsInformation from "../components/pageInformation/AboutUsInformation";
import CaterRequestInformation from "../components/pageInformation/caterRequestInformation";
import WhyTrustUsInformation from "../components/pageInformation/whyTrustUsInformation";
import Footer from "../components/footer/Footer";

export default function HomepagePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Blurred Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 filter blur-sm"
        style={{ backgroundImage: `url(${LobbyImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 gap-6 sm:gap-8 md:gap-10">
          
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

        </div>

        <Footer />
      </div>
    </div>
  );
}
