import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "packages/template/*", "e2e/**"],
      globals: true,
      setupFiles: "./tests/setup.ts",
    },
  }),
);
