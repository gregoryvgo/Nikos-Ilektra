// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Χωρίς output: 'server' και χωρίς adapter, γίνεται static και δεν σπάει ποτέ στο Vercel
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});