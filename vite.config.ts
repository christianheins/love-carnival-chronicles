import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/invitation/",  // 👈 Add this line
  server: {
    host: "::",
    port: 8081,
    allowedHosts: [
      "kattychristian.online",
      "www.kattychristian.online",
    ],
  },
    build: {
    outDir: "dist",
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
