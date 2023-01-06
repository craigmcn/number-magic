import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    globals: true,
    setupFiles: './tests/setup.js',
  },
}));
