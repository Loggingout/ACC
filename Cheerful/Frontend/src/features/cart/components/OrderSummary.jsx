// OrderSummary.jsx — order totals + checkout CTA shown alongside the cart list
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/currency";
import { useCart } from "../../../hooks/useCart";

export default function OrderSummary() {
  const { itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-black/50 p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">Your Order</h2>

      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex items-center justify-between text-white/70">
          <span>Number of Products</span>
          <span className="text-white font-medium">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between text-white/70">
          <span>Order Total</span>
          <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-white/70">
          <span>Discount</span>
          <span className="text-white font-medium">{formatCurrency(0)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-white font-semibold">Total</span>
        <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-700 bg-clip-text text-transparent">
          {formatCurrency(subtotal)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        className="w-full px-5 py-3 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
