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
    CSS: {
      csso: {
        restructure: true,
        forceMediaMerge: true,
        comments: false
      }
    },
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        useShortDoctype: true
      }
    },
    Image: {
      webp: {
        quality: 80,
        effort: 6
      },
      avif: {
        quality: 75,
        effort: 9
      }
    },
    JavaScript: {
      terser: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          passes: 3,
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          top_retain: false,
          typeofs: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          inline: true,
          collapse_vars: true,
          comparisons: true,
          booleans: true,
          arrows: true
        },
        mangle: {
          safari10: true,
          toplevel: true,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false,
          beautify: false,
          semicolons: false
        }
      }
    },
    SVG: {
      svgo: {
        plugins: [
          'preset-default',
          'removeDimensions',
          'removeViewBox',
          'cleanupNumericValues'
        ]
      }
    }
  })
  ],
  // Built-in i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,     // serve default locale from the root (e.g., / instead of /en/)
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
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Core vendor libraries
            'vendor-react': ['react', 'react-dom'],
            'vendor-leaflet': ['leaflet', 'react-leaflet'],
            'vendor-icons': ['lucide-react', '@astrojs/react'],
            // Utility libraries
            'vendor-utils': ['clsx', 'tailwind-merge'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[ext]/[name]-[hash][extname]`;
          },
        },
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
        exclude: ['@astrojs/react'],
      },
      ssr: {
        noExternal: ['react-icons', 'lucide-react'],
      },
    }
  }
});