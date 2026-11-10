import { ArrowRight, Coffee, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const VALUES = [
  { icon: Coffee, title: "Care in every cup", text: "Thoughtfully sourced beans and expertly crafted drinks, made just for you." },
  { icon: Heart, title: "A warm welcome", text: "Genuine care and friendly service make every visit feel a little brighter." },
  { icon: Sparkles, title: "Made for sharing", text: "From your morning coffee to your next gathering, we're here for the moments that matter." },
];

export default function WhyTrustUsInformation() {
  return (
    <section className="bg-sky-50 px-6 py-14 sm:px-10 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-orange-600">The Cheerful Cup difference</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-gray-950 sm:text-5xl">A little joy in every visit.</h2>
          </div>
          <Link to="/catering-page" className="inline-flex w-fit items-center gap-2 border-b border-orange-500 pb-1 text-sm font-bold text-gray-950 hover:text-orange-600">Bring us to your event <ArrowRight size={16} /></Link>
        </div>

        <div className="mt-10 grid gap-8 border-t border-sky-200 pt-8 md:grid-cols-3 md:gap-10">
          {VALUES.map((value) => (
            <div key={value.title}>
              <value.icon size={24} className="text-orange-500" />
              <h3 className="mt-4 text-lg font-bold text-gray-950">{value.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}