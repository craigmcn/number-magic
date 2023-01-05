import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: [
        { dir: 'dist' },
        { dir: 'dist/number-magic' }, // For Netlify subdirectory
      ],
    },
  },
  server: {
    port: 3100,
  },
  plugins: [react()],
});
