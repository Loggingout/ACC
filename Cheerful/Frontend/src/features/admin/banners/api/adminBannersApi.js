// adminBannersApi.js — admin banner CRUD calls
import { apiRequest } from "../../../../services/apiClient";

export function getBanners(token) {
  return apiRequest("/banners", { token });
}

export function createBanner(data, token) {
  return apiRequest("/banners", { method: "POST", body: data, token });
}

export function updateBanner(id, data, token) {
  return apiRequest(`/banners/${id}`, { method: "PATCH", body: data, token });
}

export function deleteBanner(id, token) {
  return apiRequest(`/banners/${id}`, { method: "DELETE", token });
}
