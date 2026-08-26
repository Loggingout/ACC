// adminSettingsApi.js — update the signed-in admin's own profile (name/email/password/avatar)
import { apiRequest } from "../../../../services/apiClient";

export function updateProfile(fields, token) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    form.append(key === "avatarFile" ? "avatar" : key, value);
  });
  return apiRequest("/customers/me", { method: "PATCH", body: form, token });
}

export function createAdmin({ name, email, password }, token) {
  return apiRequest("/customers/admins", { method: "POST", body: { name, email, password }, token });
}
