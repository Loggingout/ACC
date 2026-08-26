// useCategoryProducts.js — fetches a category's products from the backend
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api/menuApi";

export function useCategoryProducts(slug) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getProductsByCategory(slug)
      .then((data) => {
        if (!cancelled) setProducts(data.products);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load menu items");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { products, loading, error };
}
