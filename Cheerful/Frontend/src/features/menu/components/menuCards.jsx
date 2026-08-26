// MenuCards.jsx — item strip + spotlight detail card (size/milk selectors, add to basket)
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ImageWithLoader from "../../../components/shared/components/ImageWithLoader";
import { formatCurrency } from "../../../utils/currency";
import { useCart } from "../../../hooks/useCart";

function priceLabel(item) {
  if (item.prices) {
    const min = Math.min(...Object.values(item.prices));
    return `From ${formatCurrency(min)}`;
  }
  if (item.price) return formatCurrency(item.price);
  return "Ask in store";
}

export default function MenuCards({ menu }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = menu[selectedIndex];

  if (!menu || menu.length === 0) {
    return <p className="text-white/60 text-sm">Nothing here yet — check back soon.</p>;
  }

  return (
    <div className="menu-cards flex flex-col gap-6">
      {selectedItem && (
        <SpotlightCard key={selectedItem.id ?? selectedItem.name} item={selectedItem} />
      )}

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {menu.map((item, i) => (
          <MiniCard
            key={item.id ?? item.name ?? i}
            item={item}
            isSelected={i === selectedIndex}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

function MiniCard({ item, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`snap-start shrink-0 w-28 sm:w-36 flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition-all duration-200 ${
        isSelected ? "bg-black/60 ring-2 ring-yellow-700" : "bg-black/30 hover:bg-black/40"
      }`}
    >
      {item.image ? (
        <ImageWithLoader
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md shrink-0"
          imgClassName="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold">
          {item.name?.charAt(0)}
        </div>
      )}
      <span className="text-xs sm:text-sm font-medium text-white leading-tight line-clamp-2">
        {item.name}
      </span>
      <span className="text-[11px] text-white/50">{priceLabel(item)}</span>
    </button>
  );
}

/* Small reusable dropdown for size / milk selection */
function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3.5 py-2 text-white transition-colors"
      >
        <span className="text-white/50">{label}</span>
        <span className="flex items-center gap-1 font-medium capitalize">
          {value}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 w-full max-h-56 overflow-y-auto bg-black border border-white/10 rounded-xl shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-sm capitalize hover:bg-white/10 transition-colors ${
                opt === value ? "text-yellow-700" : "text-white/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpotlightCard({ item }) {
  const { addItem } = useCart();
  const isSeasonal = item.seasonal || item.availability === "seasonal";

  const sizeKeys = item.prices ? Object.keys(item.prices) : [];
  const hasSizeChoice = sizeKeys.length > 1;
  const [selectedSize, setSelectedSize] = useState(sizeKeys[0] ?? null);

  const hasMilkChoice = Array.isArray(item.milkOptions) && item.milkOptions.length > 0;
  const [selectedMilk, setSelectedMilk] = useState(
    hasMilkChoice ? item.milkOptions[0] : null
  );

  const hasFlavorChoice = Array.isArray(item.flavorOptions) && item.flavorOptions.length > 0;
  const [selectedFlavor, setSelectedFlavor] = useState(
    hasFlavorChoice ? item.flavorOptions[0] : null
  );

  const hasTemperatureChoice = Array.isArray(item.temperatureOptions) && item.temperatureOptions.length > 0;
  const [selectedTemperature, setSelectedTemperature] = useState(
    hasTemperatureChoice ? item.temperatureOptions[0] : null
  );

  const [added, setAdded] = useState(false);

  const activePrice = item.prices ? item.prices[selectedSize ?? sizeKeys[0]] : null;

  return (
    <div className="relative rounded-3xl bg-black/50 shadow-2xl">
      <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
        {item.image && (
          <ImageWithLoader
            src={item.image}
            alt={item.name}
            className="w-full sm:w-56 h-48 sm:h-56 rounded-2xl shrink-0"
            imgClassName="w-full h-full object-cover rounded-2xl"
          />
        )}

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {item.subCategory && (
              <span className="text-[11px] uppercase tracking-wide text-white/50">
                {item.subCategory}
              </span>
            )}
            {isSeasonal && (
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-full border border-orange-500/30">
                Seasonal
              </span>
            )}
            {item.type && (
              <span className="text-[11px] text-white/50">{item.type}</span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white">{item.name}</h3>

          {item.description && (
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {item.description}
            </p>
          )}

          {Array.isArray(item.condiments) && item.condiments.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wide text-white/50 mr-1">Includes:</span>
              {item.condiments.map((condiment) => (
                <span
                  key={condiment}
                  className="text-[11px] text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                >
                  {condiment}
                </span>
              ))}
            </div>
          )}

          {(hasSizeChoice || hasMilkChoice || hasFlavorChoice || hasTemperatureChoice) && (
            <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:max-w-sm">
              {hasSizeChoice && (
                <Dropdown label="Size" value={selectedSize} options={sizeKeys} onChange={setSelectedSize} />
              )}
              {hasMilkChoice && (
                <Dropdown label="Milk" value={selectedMilk} options={item.milkOptions} onChange={setSelectedMilk} />
              )}
              {hasFlavorChoice && (
                <Dropdown label="Flavor" value={selectedFlavor} options={item.flavorOptions} onChange={setSelectedFlavor} />
              )}
              {hasTemperatureChoice && (
                <Dropdown
                  label="Temperature"
                  value={selectedTemperature}
                  options={item.temperatureOptions}
                  onChange={setSelectedTemperature}
                />
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/10">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-700 bg-clip-text text-transparent">
              {activePrice != null ? formatCurrency(activePrice) : item.price != null ? formatCurrency(item.price) : "Ask in store"}
            </span>
            <button
              type="button"
              onClick={() => {
                addItem({
                  productId: item._id ?? item.id ?? item.name,
                  name: item.name,
                  image: item.image,
                  subCategory: item.subCategory,
                  size: selectedSize ?? undefined,
                  milk: selectedMilk ?? undefined,
                  flavor: selectedFlavor ?? undefined,
                  temperature: selectedTemperature ?? undefined,
                  unitPrice: activePrice ?? item.price ?? 0,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {added ? "Added ✓" : "Add to Basket"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}