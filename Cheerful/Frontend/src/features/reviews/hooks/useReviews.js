// useReviews.js — fetches reviews and exposes a refetch for after a new submission
import { useCallback, useEffect, useState } from "react";
import { getReviews } from "../api/reviewsApi";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);

    return getReviews()
      .then(setReviews)
      .catch((err) => setError(err.message || "Failed to load reviews"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { reviews, loading, error, refetch };
}
