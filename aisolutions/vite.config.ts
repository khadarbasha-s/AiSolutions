import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const apiPort = process.env.API_PORT ?? "5050";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: { "/api": `http://localhost:${apiPort}` },
  },
  build: {
    outDir: "dist/web",
    chunkSizeWarningLimit: 1500,
    // Routes and the 3D hero are lazy-loaded, so Rollup splits heavy libraries on its own.
  },
});
