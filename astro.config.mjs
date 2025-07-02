import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
    })
  ],
  // Add built-in i18n routing
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,     // no /en/ prefix on default (English)
      redirectToDefaultLocale: true,  // redirect / to /en/
    }
  },
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',  // Inline small CSS files
    minify: true,
    format: 'file',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Create separate chunks for large dependencies
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              return 'vendor';
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['react-icons'],
    },
  }
});