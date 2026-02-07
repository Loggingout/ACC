// MenuCards.jsx
export default function MenuCards({ menu }) {
  return (
    <div className="menu-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menu.map((item, index) => {
        // Determine if item is seasonal
        const isSeasonal = item.seasonal || item.availability === "seasonal";

        return (
          <div
            key={index}
            className="menu-card rounded-lg shadow-md p-4 flex flex-col items-start bg-gradient-to-br from-purple-500 via-orange-500 to-blue-500"
          >
            {/* Image if available */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="menu-card-image w-full h-40 object-cover rounded-md mb-3"
                onError={(e) => {
                  e.currentTarget.src = "../../"; // fallback image path
                }}
              />
            )}

            {/* Name + seasonal badge */}
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="menu-card-name text-lg font-semibold">
                {item.name}
              </h3>
              {isSeasonal && (
                <span className="text-sm bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                  Seasonal
                </span>
              )}
            </div>

            {/* Category if exists */}
            {item.category && (
              <p className="text-sm text-gray-600 font-semibold mb-2">
                {item.category}
              </p>
            )}

            {/* Description */}
            {item.description && (
              <p className="menu-card-description text-black mb-2">
                {item.description}
              </p>
            )}

            {/* Type / extra info (e.g., fridge menu) */}
            {item.type && (
              <p className="text-sm text-white mb-2">{item.type}</p>
            )}

            {/* Prices */}
            <div className="menu-card-prices text-gray-900 font-medium w-full">
              {item.prices ? (
                Object.entries(item.prices).map(([size, price]) => (
                  <div
                    key={size}
                    className="flex justify-between w-full text-sm mb-1"
                  >
                    <span className="capitalize">{size}</span>
                    <div className="border-2 border-black rounded-full bg-white p-1">
                      <span>${price.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : item.price ? (
                <div className="flex justify-between w-full text-sm">
                  <span>Price</span>
                  <div className="border-2 border-black rounded-full bg-white p-1">
                    <span>{item.price}</span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-white">Price not available</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
