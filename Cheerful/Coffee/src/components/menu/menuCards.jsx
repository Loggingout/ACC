// MenuCards.jsx
export default function MenuCards({ menu }) {
  return (
    <div className="menu-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menu.map((item, index) => {
        const isSeasonal = item.seasonal || item.availability === "seasonal";

        return (
          <div
            key={index}
            className="
              menu-card
              rounded-2xl
              p-4
              flex flex-col items-start
              bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-300 hover:border-gray-400
              shadow-lg
              hover:shadow-2xl
              transition-all duration-300
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

            {/* Name + seasonal badge */}
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="menu-card-name text-lg font-semibold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
                {item.name}
              </h3>

              {isSeasonal && (
                <span className="text-xs font-semibold bg-orange-400/90 text-white px-3 py-1 rounded-full shadow">
                  Seasonal
                </span>
              )}
            </div>

            {/* Category */}
            {item.category && (
              <p className="text-sm font-semibold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow">
                {item.category}
              </p>
            )}

            {/* Description */}
            {item.description && (
              <p className="menu-card-description text-sm mb-3 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow">
                {item.description}
              </p>
            )}

            {/* Type */}
            {item.type && (
              <p className="text-xs text-black mb-3">{item.type}</p>
            )}

            {/* Prices */}
            <div className="menu-card-prices font-medium w-full mt-auto">
              {item.prices ? (
                <>
                  {/* Price title */}
                  <span className="text-sm font-semibold mb-1 block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow">
                    Price
                  </span>

                  {Object.entries(item.prices).map(([size, price]) => (
                    <div
                      key={size}
                      className="flex justify-between items-center w-full text-sm mb-1 text-black"
                    >
                      <span className="capitalize">{size}</span>

                      <div className="bg-white/80 text-gray-900 border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
                        ${price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </>
              ) : item.price ? (
                <div className="flex justify-between w-full text-sm text-white">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent font-semibold">
                    Price
                  </span>
                  <div className="bg-white/80 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {item.price}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-black/70 italic">
                  Price not available
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
