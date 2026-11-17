import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Dynamic base resolution:
// - Localhost: '/'
// - GitHub Pages (Project Repo): '/<repo-name>/'
// - GitHub Pages (User/Org Site: username.github.io): '/'
function getBasePath() {
  if (process.env.VITE_BASE) {
    return process.env.VITE_BASE;
  }
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1] || '';
    if (repoName.toLowerCase().endsWith('.github.io')) {
      return '/';
    }
    return `/${repoName}/`;
  }
  return '/';
}

function staticImagesPlugin() {
  return {
    name: 'static-images-plugin',
    configureServer(server) {
      server.middlewares.use('/Images', (req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(__dirname, 'Images', decodedUrl);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.gif': 'image/gif',
            '.mp3': 'audio/mpeg',
            '.mp4': 'video/mp4',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    },
    closeBundle() {
      // 1. Copy Images directory to dist/Images on build
      const distImages = path.join(__dirname, 'dist', 'Images');
      const srcImages = path.join(__dirname, 'Images');
      if (fs.existsSync(srcImages)) {
        fs.cpSync(srcImages, distImages, { recursive: true, force: true });
      }

      // 2. Create .nojekyll for GitHub Pages to prevent Jekyll bypass
      const distDir = path.join(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

        // 3. Create 404.html fallback from index.html for SPA GitHub Pages routing
        const indexPath = path.join(distDir, 'index.html');
        const notFoundPath = path.join(distDir, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      }
    }
  };
}

export default defineConfig({
  base: getBasePath(),
  plugins: [react(), staticImagesPlugin()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './Scripts'),
      '@images': path.resolve(__dirname, './Images'),
      '@styles': path.resolve(__dirname, './Styles'),
    },
  },
});
