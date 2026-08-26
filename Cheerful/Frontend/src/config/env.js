// env.js — reads Vite-exposed environment variables
// defaults to a same-origin relative path so the Vite dev proxy (see vite.config.js)
// handles forwarding to the backend without needing a second port exposed to the browser
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
