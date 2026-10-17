// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node'; // Προσθήκη του Node adapter

// https://astro.build/config
export default defineConfig({
  output: 'server', // <-- ΥΠΟΧΡΕΩΤΙΚΟ για να τρέχει δυναμικά και να μην σκάει το Supabase
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});