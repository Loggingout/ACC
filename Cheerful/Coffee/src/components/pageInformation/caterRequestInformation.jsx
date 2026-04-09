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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
      
      {/* Glass container */}
      <div className="
        relative
        rounded-2xl
        p-5 sm:p-8 md:p-10
        min-h-[240px]
        flex flex-col
        justify-between
        overflow-hidden
        max-w-full
      ">

        {/* Top row */}
        <div className="flex items-start gap-3 max-w-full">
          <motion.h1
            className="
              font-semibold
              bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500
              bg-clip-text text-transparent
              leading-tight
              w-full
              break-words
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            "
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedLetters("Rated 5 stars all year round")}
          </motion.h1>
        </div>

        {/* Middle row */}
        <div className="flex items-start gap-2 mt-4 max-w-full">
          <motion.p
            className="
              text-white/80
              font-semibold
              w-full
              break-words
              leading-relaxed
              text-lg sm:text-xl md:text-2xl lg:text-3xl
            "
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
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Calendar className="w-5 h-5 text-white/80 hidden sm:block" />
            <ScheduleCaterButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <ScheduleCater404Modal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}