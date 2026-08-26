import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import ScheduleCaterButton from "./ScheduleCaterButton";
import CaterRequestFormModal from "../../../components/modal/caterRequestFormModal";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function CoffeeRing({ className }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <circle cx="100" cy="90" r="70" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="112" cy="102" r="54" stroke="#f97316" strokeWidth="1.5" />
    </svg>
  );
}

export default function CaterRequestInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const letterContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
  };

  const letterVariant = {
    hidden: { y: -24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 260 },
    },
  };

  const renderAnimatedLetters = (text) =>
    text.split(" ").map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-2">
        {word.split("").map((char, charIndex) => (
          <motion.span
            key={`${wordIndex}-${char}-${charIndex}`}
            variants={letterVariant}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    ));

  return (
    <section
      className="relative bg-black/40 overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 94% 0, 100% 6%, 100% 100%, 0 100%)",
        borderRadius: "1.5rem",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />
      <CoffeeRing className="absolute -bottom-10 -right-10 w-56 h-56 opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 px-6 sm:px-8 py-8 sm:py-10">

        {/* Headline + CTA */}
        <div className="flex flex-col gap-4">
          <motion.h1
            className="font-semibold bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent leading-tight text-2xl sm:text-3xl"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedLetters("Rated 5 stars all year round")}
          </motion.h1>

          <motion.p
            className="text-white/75 font-medium leading-relaxed text-base"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedLetters(
              "Where customer service and quality of our coffee exceed expectations."
            )}
          </motion.p>

          <div className="mt-2">
            <ScheduleCaterButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* Rating badge */}
        <div className="flex items-center gap-4 pt-4 border-t border-dashed border-white/15">
          <Calendar className="w-5 h-5 text-white/60 shrink-0" />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/60 text-xs uppercase tracking-wide">
              <span className="text-white font-bold text-base mr-1">5.0</span>
              Customer rating
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CaterRequestFormModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}