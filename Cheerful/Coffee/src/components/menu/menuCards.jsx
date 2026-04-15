// MenuCards.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuCards({ menu }) {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % menu.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + menu.length) % menu.length);
  };

  const swipeConfidenceThreshold = 100;

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      {/* MOBILE SWIPE VIEW */}
      <div className="sm:hidden w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextCard();
              } else if (swipe > swipeConfidenceThreshold) {
                prevCard();
              }
            }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="w-full"
          >
            {renderCard(menu[index], index)}
          </motion.div>
        </AnimatePresence>

        {/* Optional swipe hint */}
        <div className="text-center text-xs text-black mt-3">
          Swipe left or right
        </div>
      </div>

      {/* DESKTOP / TABLET GRID (UNCHANGED) */}
      <div className="menu-cards hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item, index) => renderCard(item, index))}
      </div>
    </>
  );
}

/* KEEP YOUR EXISTING CARD EXACTLY THE SAME */
function renderCard(item, index) {
  const isSeasonal = item.seasonal || item.availability === "seasonal";

  return (
    <div
      key={index}
      className="
  menu-card
  rounded-2xl
  p-8
  flex flex-col items-start
  bg-gradient-to-br from-pink-200 via-green-100 to-yellow-200
  border border-green-300 hover:border-pink-400
  shadow-lg
  hover:shadow-2xl hover:scale-[1.02]
  transition-all duration-300
  w-full
"
    >
      {/* Image if available */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-image w-full h-40 object-cover rounded-xl mb-3"
          onError={(e) => {
            e.currentTarget.src = "../../";
          }}
        />
      )}

      {/* Daily Sellers Badge */}
      {(item.name === "breakfast burritos" || item.name === "hot dogs") && (
        <div className="mb-2">
          <span className="text-xs font-semibold bg-green-500 text-black px-3 py-1 rounded-full shadow">
            Daily Sellers
          </span>
        </div>
      )}

      {/* Name + seasonal badge */}
      <div className="flex items-center justify-between w-full mb-2">
        <h3
          className="menu-card-name text-lg font-semibold text-black drop-shadow-lg"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          {item.name}
        </h3>

        {isSeasonal && (
          <span className="text-xs font-semibold bg-orange-400/90 text-black px-3 py-1 rounded-full shadow">
            Seasonal
          </span>
        )}
      </div>

      {/* Category */}
      {item.category && (
        <p
          className="text-sm font-semibold mb-2 text-black drop-shadow-lg"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          {item.category}
        </p>
      )}

      {/* Description */}
      {item.description && (
        <p
          className="menu-card-description text-sm mb-3 text-black drop-shadow-lg"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          {item.description}
        </p>
      )}

      {/* Type */}
      {item.type && <p className="text-xs text-black mb-3">{item.type}</p>}

      {/* Prices */}
      <div className="menu-card-prices font-medium w-full mt-auto">
        {item.prices ? (
          <>
            <span
              className="text-sm font-semibold mb-1 block text-black drop-shadow-lg"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              Price
            </span>

            {Object.entries(item.prices).map(([size, price]) => (
              <div
                key={size}
                className="flex justify-between items-center w-full text-sm mb-1 text-black"
              >
                <span className="capitalize">{size}</span>

                <div className="bg-black/50 text-white border border-amber-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
                  ${price.toFixed(2)}
                </div>
              </div>
            ))}
          </>
        ) : item.price ? (
          <div className="flex justify-between w-full text-sm text-white">
            <span
              className="text-black font-semibold drop-shadow-lg"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Price
            </span>

            <div className="bg-black/50 text-white border border-amber-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
              {item.price}
            </div>
          </div>
        ) : (
          <span
            className="text-sm text-white italic drop-shadow-lg"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Price not available
          </span>
        )}
      </div>
    </div>
  );
}
