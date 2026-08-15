import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/*.crdownload',
        '**/*.tmp',
        '**/*.part',
        '**/node_modules/**'
      ]
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        connected: resolve(process.cwd(), 'stay-connected.html')
      }
    }
  }
});
