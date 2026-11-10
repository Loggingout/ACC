// cateringApi.js — calls the backend /api/catering endpoint
import { apiRequest } from "../../../services/apiClient";

export function submitCateringRequest(data) {
  return apiRequest("/catering", { method: "POST", body: data });
}

export function getCateringRequests(token) {
  return apiRequest("/catering", { token });
}

export function updateCateringStatus(id, status, token) {
  return apiRequest(`/catering/${id}/status`, { method: "PATCH", body: { status }, token });
}

export function deleteCateringRequest(id, token) {
  return apiRequest(`/catering/${id}`, { method: "DELETE", token });
}
