// adminAnalyticsApi.js — admin dashboard aggregate stats
import { apiRequest } from "../../../../services/apiClient";

export function getDashboardStats(token) {
  return apiRequest("/analytics/dashboard", { token });
}

export function getTrafficStats(token) {
  return apiRequest("/analytics/traffic", { token });
}
