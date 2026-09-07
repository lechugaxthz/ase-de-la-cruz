import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://asedelacruz.com',
  integrations: [
    react(),
    sitemap()
  ],
  output: 'hybrid',
  adapter: undefined,
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    plugins: [tailwind()],
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});