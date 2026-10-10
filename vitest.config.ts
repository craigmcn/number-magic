import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      // Node 25+ has its own localStorage global that shadows jsdom's and is undefined without a file.
      execArgv: ["--no-experimental-webstorage"],
      exclude: [...configDefaults.exclude, "e2e/**"],
      globals: true,
      setupFiles: "./tests/setup.ts",
    },
  }),
);
