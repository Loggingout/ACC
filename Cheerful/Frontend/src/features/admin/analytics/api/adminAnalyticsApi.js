// adminAnalyticsApi.js — admin dashboard aggregate stats
import { apiRequest } from "../../../../services/apiClient";

export function getDashboardStats(token) {
  return apiRequest("/analytics/dashboard", { token });
}
