import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Cualquier petición que empiece con '/api'
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
    },
  },
})