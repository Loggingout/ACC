// apiClient.js — thin fetch wrapper shared by every feature's api/ module
import { API_BASE_URL } from "../config/env";

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiRequest(path, { method = "GET", body, token, headers } = {}) {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(payload?.error || res.statusText, res.status, payload?.details);
  }

  return payload?.data;
}
