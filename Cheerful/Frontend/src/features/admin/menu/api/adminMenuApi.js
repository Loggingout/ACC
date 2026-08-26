// adminMenuApi.js — admin-only category + product CRUD calls
import { apiRequest } from "../../../../services/apiClient";

export function getAdminProducts(token) {
  return apiRequest("/menu/admin/products", { token });
}

export function createCategory(data, token) {
  return apiRequest("/menu/categories", { method: "POST", body: data, token });
}

export function updateCategory(slug, data, token) {
  return apiRequest(`/menu/categories/${slug}`, { method: "PATCH", body: data, token });
}

export function deleteCategory(slug, token) {
  return apiRequest(`/menu/categories/${slug}`, { method: "DELETE", token });
}

export function bulkUpdateProducts(slug, data, token) {
  return apiRequest(`/menu/categories/${slug}/products/bulk`, { method: "PATCH", body: data, token });
}

// fields whose values are arrays/objects and must be JSON-stringified for multipart form data
const JSON_FIELDS = ["prices", "milkOptions", "sugarOptions", "flavorOptions", "temperatureOptions", "condiments"];

// builds multipart form data so an optional image file can be uploaded alongside the fields
function toProductFormData(fields) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "imageFile") {
      form.append("image", value);
    } else if (JSON_FIELDS.includes(key)) {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, value);
    }
  });
  return form;
}

export function createProduct(fields, token) {
  return apiRequest("/menu/products", { method: "POST", body: toProductFormData(fields), token });
}

export function updateProduct(id, fields, token) {
  return apiRequest(`/menu/products/${id}`, { method: "PATCH", body: toProductFormData(fields), token });
}

export function deleteProduct(id, token) {
  return apiRequest(`/menu/products/${id}`, { method: "DELETE", token });
}
