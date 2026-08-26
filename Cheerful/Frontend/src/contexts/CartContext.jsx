// CartContext.jsx — client-side shopping cart state, persisted to localStorage
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "acc-cart";

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lineId(productId, size, milk, flavor, temperature) {
  return `${productId}-${size ?? "default"}-${milk ?? "none"}-${flavor ?? "none"}-${temperature ?? "none"}`;
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((item, quantity = 1) => {
    const id = lineId(item.productId, item.size, item.milk, item.flavor, item.temperature);
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { id, ...item, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setLines((prev) =>
      quantity <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, quantity } : l))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, favorite: !l.favorite } : l)));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0), [lines]);

  const value = { lines, addItem, updateQuantity, removeItem, toggleFavorite, clearCart, itemCount, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
