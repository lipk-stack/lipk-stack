import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No API key is baked into the build — the app is BYOK (the user enters their own
// Gemini key at runtime, stored only in their browser). `base` is configurable so
// the same build works at a domain root or under a GitHub Pages project subpath
// (the deploy workflow sets BASE_PATH=/<repo>/).
export default defineConfig(() => {
  return {
    base: process.env.BASE_PATH || '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
