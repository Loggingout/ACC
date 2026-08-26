// reviewsApi.js — calls the backend /api/reviews endpoints
import { apiRequest } from "../../../services/apiClient";

export function getReviews() {
  return apiRequest("/reviews");
}

export function submitReview({ author, rating, comment }) {
  return apiRequest("/reviews", { method: "POST", body: { author, rating, comment } });
}
