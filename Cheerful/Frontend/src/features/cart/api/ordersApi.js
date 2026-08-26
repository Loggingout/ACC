// ordersApi.js — submits a guest/customer order (pay-in-store)
import { apiRequest } from "../../../services/apiClient";

export function submitOrder(data) {
  return apiRequest("/orders", { method: "POST", body: data });
}
