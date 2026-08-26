// CheckoutPage.jsx — guest checkout: collect contact info, place a pay-in-store order
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { submitOrder } from "../features/cart/api/ordersApi";
import { formatCurrency } from "../utils/currency";

const INITIAL_FORM = { customerName: "", customerPhone: "", customerEmail: "" };

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await submitOrder({
        ...form,
        items: lines.map((l) => ({
          productId: l.productId,
          name: l.name,
          image: l.image,
          subCategory: l.subCategory,
          size: l.size,
          milk: l.milk,
          sugar: l.sugar,
          flavor: l.flavor,
          temperature: l.temperature,
          quantity: l.quantity,
          unitPrice: l.unitPrice,
        })),
      });
      clearCart();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong placing your order. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-sky-400" />
        <h1 className="text-2xl font-bold text-white">Order Placed!</h1>
        <p className="text-white/70 max-w-sm">
          Thanks, {form.customerName}! We'll have your order ready soon — pay in-store at pickup.
        </p>
        <Link
          to="/menu"
          className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <ShoppingBag className="w-12 h-12 text-white/40" />
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
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
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>

      <div className="rounded-2xl bg-black/40 p-5 flex flex-col gap-2">
        {lines.map((line) => (
          <div key={line.id} className="flex items-center justify-between text-sm text-white/80">
            <span>
              {line.quantity}× {line.name}
              {line.size ? ` (${line.size})` : ""}
            </span>
            <span>{formatCurrency(line.unitPrice * line.quantity)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/10 text-white font-semibold">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-black/40 p-5 flex flex-col gap-4">
        <div>
          <label htmlFor="customerName" className="block text-xs font-semibold text-white/70 mb-2">
            Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="customerPhone" className="block text-xs font-semibold text-white/70 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={form.customerPhone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="customerEmail" className="block text-xs font-semibold text-white/70 mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
          <input type="radio" checked readOnly />
          Pay In Store — pay when you pick up your order
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full px-5 py-3 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "submitting" ? "Placing Order…" : "Place Order"}
        </button>
      </form>
    </div>
  );
}

