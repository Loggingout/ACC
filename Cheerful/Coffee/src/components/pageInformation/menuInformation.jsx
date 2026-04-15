import { motion } from "framer-motion";
import MenuCards from "../menu/menuCards";
import { coffeeMenu, lunchMenu, fridgeMenu } from "../pageInformation/menuInformation/menuInformation";
import { Coffee, Utensils, Box } from "lucide-react";

export default function MenuInformation() {

  const letterContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.12,
      },
    },
  };

  const letterVariant = {
    hidden: {
      y: -24,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 260,
      },
    },
  };

  // Prevents single-letter wrapping issues
  const renderAnimatedLetters = (text) =>
    text.split(" ").map((word, wordIndex) => (
      <span
        key={`word-${wordIndex}`}
        className="inline-block whitespace-nowrap mr-2"
      >
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
    <div className="menu-information px-4 sm:px-6 md:px-8 py-8">

      {/* Header */}
      <motion.h1
        className="menu-title text-3xl sm:text-4xl font-bold mb-2 text-black"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.35)" }}
        variants={letterContainer}
        initial="hidden"
        animate="visible"
      >
        {renderAnimatedLetters("Our Menu")}
      </motion.h1>

      <motion.p
        className="menu-description text-gray-700 mb-8 text-base sm:text-lg leading-relaxed"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
        variants={letterContainer}
        initial="hidden"
        animate="visible"
      >
        {renderAnimatedLetters(
          "Discover our delicious selection of coffee and treats, crafted with love and the finest ingredients."
        )}
      </motion.p>

      {/* Coffee Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Coffee className="w-6 h-6 text-orange-500" />
          Coffee
        </h2>
        <MenuCards menu={coffeeMenu} />
      </section>

      {/* Lunch Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-yellow-500" />
          Lunch
        </h2>
        <MenuCards menu={lunchMenu} />
      </section>

      {/* Fridge Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Box className="w-6 h-6 text-blue-500" />
          Fridge Items
        </h2>
        <MenuCards menu={fridgeMenu} />
      </section>

    </div>
  );
}