import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app at /vibe-ui/ — only set base in production
  // so `npm run dev` still works at http://localhost:5173/
  base: process.env.NODE_ENV === 'production' ? '/vibe-ui/' : '/',
});
