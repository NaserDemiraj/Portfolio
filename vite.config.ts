import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site lives in web/ and builds to dist/, which Vercel serves as static files.
// The Express API in api/ + src/ stays a separate serverless function.
export default defineConfig({
  root: 'web',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    // `npm run dev:api` serves the API on :3000; proxy it so /api/chat works locally.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
