import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // binds to 0.0.0.0 so the dev server is reachable through Codespaces/devcontainer port forwarding
    host: true,
    // proxies same-origin /api calls to the backend, avoiding the need to
    // forward a second port (e.g. in GitHub Codespaces) for API requests
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
