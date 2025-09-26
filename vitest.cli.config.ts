import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: [
      "src/engine/**/__tests__/**/*.test.ts",
      "src/engine/**/__tests__/*.test.ts",
      "src/**/__tests__/*.test.ts",
    ],
    exclude: ["ui/**", "tests/**", "node_modules/**", "dist/**"],
    coverage: { reporter: ["text", "lcov"], reportsDirectory: "./coverage-cli" },
  },
  resolve: {
    alias: {
      "@engine": path.resolve(__dirname, "src/engine"),
      "@root": path.resolve(__dirname, "src"),
    },
  },
});
