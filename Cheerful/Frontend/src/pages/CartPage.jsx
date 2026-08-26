// CartPage.jsx — review cart items and order summary before checkout
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartLineItem from "../features/cart/components/CartLineItem";
import OrderSummary from "../features/cart/components/OrderSummary";

export default function CartPage() {
  const { lines, itemCount } = useCart();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingCart className="w-12 h-12 text-white/40" />
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="text-white/60 max-w-sm">
          Looks like you haven't added anything yet. Browse the menu to find your next favorite drink.
        </p>
        <Link
          to="/menu"
          className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">Cart</h1>
      <p className="text-white/60 mb-4">
        {itemCount} {itemCount === 1 ? "Product" : "Products"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
