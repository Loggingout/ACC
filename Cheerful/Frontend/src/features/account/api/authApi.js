// authApi.js — calls the backend /api/auth endpoints
import { apiRequest } from "../../../services/apiClient";

export function login({ email, password }) {
  return apiRequest("/auth/login", { method: "POST", body: { email, password } });
}

export function fetchMe(token) {
  return apiRequest("/auth/me", { token });
}
