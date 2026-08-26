import { Outlet } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import BannerStrip from "../../components/banner/BannerStrip";
import { useBanners } from "../../hooks/useBanners";

export default function MainLayout() {
  const { otherBanners } = useBanners();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-purple-500 to-purple-700">

      <BannerStrip banners={otherBanners} />

      {/* Navbar */}
      <Navbar />

      {/* Page Content Grid */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}