// cateringApi.js — calls the backend /api/catering endpoint
import { apiRequest } from "../../../services/apiClient";

export function submitCateringRequest(data) {
  return apiRequest("/catering", { method: "POST", body: data });
}
