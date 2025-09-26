import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@engine": path.resolve(__dirname, "../src/engine.ts"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/deck": {
        target: "https://sandbox.getunleash.io",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/deck/, ""),
      },
    },
  },
  build: { outDir: "dist" },
  
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    css: true,
    globals: true,
    coverage: {
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
