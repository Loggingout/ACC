// CartLineItem.jsx — a single product row in the cart list
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import ImageWithLoader from "../../../components/shared/components/ImageWithLoader";
import { formatCurrency } from "../../../utils/currency";
import { useCart } from "../../../hooks/useCart";

export default function CartLineItem({ line }) {
  const { updateQuantity, removeItem, toggleFavorite } = useCart();

  const details = [line.subCategory, line.temperature, line.size, line.milk, line.flavor].filter(Boolean).join(" \u00b7 ");

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-black/40 p-4">
      {line.image ? (
        <ImageWithLoader
          src={line.image}
          alt={line.name}
          className="w-20 h-20 rounded-xl shrink-0"
          imgClassName="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
          {line.name?.charAt(0)}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold truncate">{line.name}</h3>
        {details && <p className="text-white/50 text-xs capitalize mt-0.5">{details}</p>}

        <div className="flex items-center gap-1.5 mt-3 bg-white/5 rounded-full w-fit">
          <button
            type="button"
            onClick={() => updateQuantity(line.id, line.quantity - 1)}
            aria-label="Decrease quantity"
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-medium text-white w-5 text-center">{line.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(line.id, line.quantity + 1)}
            aria-label="Increase quantity"
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => toggleFavorite(line.id)}
            aria-label="Toggle favorite"
            className="p-1.5 text-white/50 hover:text-red-400 transition-colors"
          >
            <Heart size={16} className={line.favorite ? "fill-red-400 text-red-400" : ""} />
          </button>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label="Remove item"
            className="p-1.5 text-white/50 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <span className="text-base font-bold bg-gradient-to-r from-orange-400 to-yellow-700 bg-clip-text text-transparent">
          {formatCurrency(line.unitPrice * line.quantity)}
        </span>
      </div>
    </div>
  );
}
