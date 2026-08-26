// adminOrdersApi.js — admin order listing + status updates
import { apiRequest } from "../../../../services/apiClient";

export function getOrders(token) {
  return apiRequest("/orders", { token });
}

export function updateOrderStatus(id, status, token) {
  return apiRequest(`/orders/${id}/status`, { method: "PATCH", body: { status }, token });
}
