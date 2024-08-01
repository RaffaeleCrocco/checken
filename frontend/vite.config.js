import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173, // Port for the Vite server
  },
});
