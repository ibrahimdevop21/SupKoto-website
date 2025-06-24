import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Explicitly configure Tailwind
      config: { path: './tailwind.config.js' },
    }),
    react()
  ],
  output: 'static',
  adapter: vercel(),
  // Add built-in i18n routing
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,     // no /en/ prefix on default (English)
      redirectToDefaultLocale: true,  // redirect / to /en/
    }
  }
});