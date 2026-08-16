import { defineConfig } from 'vite';
import { resolve } from 'path';

const cleanUrlsPlugin = () => ({
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0];
      const hasExtension = /\.[a-zA-Z0-9]+$/.test(url);
      
      if (!hasExtension) {
        if (url === '/team') {
          req.url = '/team.html' + req.url.substring(5);
        } else if (url === '/stay-connected') {
          req.url = '/stay-connected.html' + req.url.substring(15);
        } else if (url === '/404') {
          req.url = '/404.html' + req.url.substring(4);
        } else if (url !== '/' && url !== '') {
          // Serve custom 404 page for any unmatched page routes
          req.url = '/404.html';
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [cleanUrlsPlugin()],
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
        connected: resolve(process.cwd(), 'stay-connected.html'),
        team: resolve(process.cwd(), 'team.html'),
        error: resolve(process.cwd(), '404.html')
      }
    }
  }
});
