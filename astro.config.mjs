// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import clerk from "@clerk/astro";
import react from '@astrojs/react';
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: "standalone" }),
  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [clerk(), react()]
});