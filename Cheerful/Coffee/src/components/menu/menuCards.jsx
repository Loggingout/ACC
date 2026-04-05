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
              p-8
              flex flex-col items-start
              bg-gradient-to-br from-amber-900 to-amber-400 border border-amber-800 hover:border-amber-300
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

            {/* Daily Sellers Badge */}
            {(item.name === 'breakfast burritos' || item.name === 'hot dogs') && (
              <div className="mb-2">
                <span className="text-xs font-semibold bg-green-500 text-white px-3 py-1 rounded-full shadow">
                  Daily Sellers
                </span>
              </div>
            )}

            {/* Name + seasonal badge */}
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="menu-card-name text-lg font-semibold text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
              <p className="text-sm font-semibold mb-2 text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {item.category}
              </p>
            )}

            {/* Description */}
            {item.description && (
              <p className="menu-card-description text-sm mb-3 text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
                  <span className="text-sm font-semibold mb-1 block text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Price
                  </span>

                  {Object.entries(item.prices).map(([size, price]) => (
                    <div
                      key={size}
                      className="flex justify-between items-center w-full text-sm mb-1 text-white"
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
                  <span className="text-white font-semibold drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Price
                  </span>
                  <div className="bg-black/50 text-white border border-amber-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {item.price}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-white italic drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
