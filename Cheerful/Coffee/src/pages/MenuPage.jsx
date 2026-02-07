import Navbar from "../components/header/Navbar";
// import MenuBackground from "../assets/menu-background.jpg";
import MenuInformation from "../components/pageInformation/menuInformation";
import Footer from '../components/footer/Footer';

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 gap-6 sm:gap-8 md:gap-10">
                    {/* Menu Information Section */}
                    <div className="w-full max-w-7xl">
                        <MenuInformation />
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
