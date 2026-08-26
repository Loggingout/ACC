// bannersApi.js — public active-banner lookup
import { apiRequest } from "../services/apiClient";

export function getActiveBanners() {
  return apiRequest("/banners/active");
}
