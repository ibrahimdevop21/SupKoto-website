import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import compress from 'astro-compress';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        mdi: ["*"],
      }
    }),
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
  // Built-in i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: true,      // add /en/ prefix for default locale
      strategy: 'pathname',           // use pathname strategy for locale detection
      exclude: {
        ar: ['en/**'],
        en: ['ar/**']
      }
    },
    fallback: {
      ar: 'en'                       // fallback to English for missing Arabic translations
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