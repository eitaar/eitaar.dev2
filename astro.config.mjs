import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import vue from '@astrojs/vue';
import expressiveCode from 'astro-expressive-code'
//import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // ...
  integrations: [vue(), icon(), expressiveCode({
    themes: ["tokyo-night"]
  }), mdx()],
  //output:'server',
  //adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "tokyo-night"
    },
  },
});