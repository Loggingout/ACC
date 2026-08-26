// menuApi.js — calls the backend /api/menu endpoints
import { apiRequest } from "../../../services/apiClient";

export function getCategories() {
  return apiRequest("/menu/categories");
}

export function getProductsByCategory(slug) {
  return apiRequest(`/menu/categories/${slug}/products`);
}
