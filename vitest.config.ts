import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: "./src/test/setup.ts",
    globals: true,
    coverage: {
        reporter: ["text", "lcov"],
        reportsDirectory: "./coverage",
        thresholds: {
          lines: 85,
          branches: 80,
          functions: 85,
          statements: 85,
        },
      },
  },
  resolve: {
    alias: {
      "@engine": path.resolve(__dirname, "src/engine"),
      "@root": path.resolve(__dirname, "src"),
    },
  },
});
