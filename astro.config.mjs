import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://asedelacruz.com',
  integrations: [
    react()
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  experimental: {
    contentLayer: true
  },
  vite: {
    plugins: [tailwind()],
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});
