import CaterImg from "../../../assets/catering.jpg";
import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";

const badges = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "K+", label: "Hearts touched" },
  { value: 5.4, suffix: "K+", decimalPlaces: 1, label: "Cups served" },
  { value: 350, prefix: "$", label: "2-hour package" },
];

export default function CaterInformation() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 p-6 sm:p-10 lg:p-12 xl:p-14">
      <div>
        <p className="text-xs font-bold uppercase text-orange-600">A Cheerful Cup / Catering</p>
        <h1 className="mt-5 max-w-lg font-serif text-4xl sm:text-5xl xl:text-6xl leading-[1.05] text-gray-950">
          Coffee that brings people together.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600">
          From corporate events to private gatherings, we bring premium coffee,
          friendly baristas, and full-service catering to you.
        </p>
        <a href="#catering-request" className="inline-block mt-5 border-b border-orange-500 pb-1 text-sm font-semibold text-gray-900 hover:text-orange-600">
          Plan your event <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <img src={CaterImg} alt="A Cheerful Cup coffee catering at an event" className="w-full aspect-[4/4.5] sm:aspect-[4/3] object-cover object-center" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {badges.map((badge) => (
              <div key={badge.label} className="min-w-0 bg-white/95 rounded-md px-2.5 py-2 sm:px-3 sm:py-3 text-gray-900">
                <p className="text-lg sm:text-xl font-bold leading-none">
                  {badge.prefix}<CountingNumber number={badge.value} decimalPlaces={badge.decimalPlaces ?? 0} inView transition={{ duration: 1.8, ease: "easeOut" }} />{badge.suffix}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-gray-600">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}