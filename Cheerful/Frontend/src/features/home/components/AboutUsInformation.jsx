import { ArrowRight, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import Ceo from "../../../assets/ceo-and-menu.jpg";
import Catering from "../../../assets/catering.jpg";
import AccLobby from "../../../assets/acc-lobby.png"; 
import BusinessRating from "../../../assets/acc-business-rating.jpg";
import Giftcard from "../../../assets/Giftcard.png";
import ACCAI from "../../../assets/acc-ai.png";

const GALLERY_IMAGES = [
  { src: BusinessRating, alt: "Business rating" },
  { src: Catering, alt: "A Cheerful Cup catering" },
  { src: Giftcard, alt: "Gift card" },
  { src: Ceo, alt: "A Cheerful Cup owner with the menu" },
  { src: ACCAI, alt: "Acc Coupple" },
];

const STATS = [
  { value: 2015, label: "Serving our community since" },
  { value: 190, suffix: "K+", label: "Cups served" },
  { value: 3, suffix: "K+", label: "Lives touched" },
  { value: 5, decimalPlaces: 1, label: "Customer rating" },
];

export default function AboutUsInformation() {
  return (
    <section id="about" className="overflow-hidden bg-white pt-10 sm:pt-14">
      <div className="overflow-x-auto overscroll-x-contain pb-2" aria-label="A Cheerful Cup photo gallery" tabIndex={0}>
        <div className="mx-auto flex min-w-max w-fit items-start justify-center gap-2 px-4 pb-8 sm:gap-5 sm:px-12 sm:pb-24">
          {GALLERY_IMAGES.map((image, index) => {
            const position = GALLERY_IMAGES.length > 1 ? (index / (GALLERY_IMAGES.length - 1)) * 2 - 1 : 0;
            const curve = position * position;
            return (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ transform: `translateY(clamp(${curve * 16}px, ${curve * 4}vw, ${curve * 52}px)) rotate(${position * 12}deg)` }}
                className="aspect-[4/5] w-[clamp(2.75rem,15vw,10rem)] shrink-0 rounded-lg object-cover shadow-md"
              />
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl rounded-t-[50%] border-t border-dashed border-orange-300 px-6 pb-14 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-14">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-orange-600"><Coffee size={15} /> About A Cheerful Cup</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-gray-950 sm:text-5xl">Good coffee. Even better company.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600">Since 2015, we've been bringing people together over thoughtfully crafted coffee, friendly service, and a warm welcome. Whether you're stopping in for a quick boost or staying awhile, there's a place for you here.</p>
        <Link to="/menu" className="mt-7 inline-flex items-center gap-3 rounded-full bg-yellow-300 px-5 py-3 text-sm font-bold text-gray-950 hover:bg-orange-400">Explore Our Menu <ArrowRight size={16} /></Link>

        <dl className="mt-12 grid grid-cols-2 gap-y-8 sm:mt-16 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-3 sm:border-r sm:border-gray-200 sm:last:border-r-0">
              <dt className="text-xs leading-snug text-gray-600">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-bold text-gray-950"><CountingNumber number={stat.value} decimalPlaces={stat.decimalPlaces ?? 0} inView transition={{ duration: 1.8, ease: "easeOut" }} />{stat.suffix}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}