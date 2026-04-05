import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import ScheduleCaterButton from "../buttons/ScheduleCaterButton";
import ScheduleCater404Modal from "../modal/scheduleCater404Modal";

export default function CaterRequestInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const letterContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
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
    text.split("").map((char, index) => (
      <motion.span key={`${char}-${index}`} variants={letterVariant} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
      {/* Glass container */}
      <div className="relative rounded-2xl p-6 sm:p-10 min-h-[260px] flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start gap-3">
          <motion.h1
            className="font-semibold bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedLetters("Rated 5 stars all year round")}
          </motion.h1>
        </div>

        {/**
         * <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-extrabold drop-shadow-lg
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome to A Cheerful Cup
          </h1>

          <p className="text-white/90 mt-3 max-w-2xl
                        text-sm sm:text-base md:text-lg">
            Fresh coffee, friendly service, and catering you can count on.
          </p>
        </div>
         */}


        {/* Middle row */}
        <div className="flex items-start gap-2 mt-5">
          <motion.p
            className="text-white/80 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedLetters(
              "Where customer service and quality of our coffee exceed expectations."
            )}
          </motion.p>
        </div>

        {/* Bottom row */}
        <div className="flex justify-end mt-10">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white/80 hidden sm:block" />
            <ScheduleCaterButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* "Coming Soon" Modal */}
      {isModalOpen && (
        <ScheduleCater404Modal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
