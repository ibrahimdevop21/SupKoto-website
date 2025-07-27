#!/usr/bin/env node

/**
 * Emergency Performance Fixes for SupaKoto Website
 * Addresses the most critical issues from latest Lighthouse audit
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🚨 Applying Emergency Performance Fixes...\n');

/**
 * 1. Fix Astro config for proper compression and minification
 */
async function fixAstroConfig() {
  console.log('⚙️  Fixing Astro configuration for production...');
  
  try {
    const configPath = path.join(projectRoot, 'astro.config.mjs');
    let configContent = await fs.readFile(configPath, 'utf8');
    
    // Replace the compress plugin configuration with more aggressive settings
    const newCompressConfig = `
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
  })`;
    
    // Replace the existing compress configuration
    configContent = configContent.replace(
      /compress\(\{[\s\S]*?\}\)/,
      newCompressConfig.trim()
    );
    
    await fs.writeFile(configPath, configContent);
    console.log('  ✅ Astro config updated with aggressive compression');
  } catch (error) {
    console.log(`  ⚠️  Could not update Astro config: ${error.message}`);
  }
}

/**
 * 2. Reduce DOM size by optimizing heavy components
 */
async function optimizeDOMSize() {
  console.log('🏗️  Optimizing DOM size...');
  
  // Optimize CarGallery component to reduce DOM elements
  try {
    const carGalleryPath = path.join(projectRoot, 'src/components/CarGallery.tsx');
    let content = await fs.readFile(carGalleryPath, 'utf8');
    
    // Replace the thumbnail grid with a more efficient implementation
    const optimizedThumbnails = `
          {/* Optimized thumbnail grid - show only 6 thumbnails max */}
          <div className="grid grid-cols-6 gap-2 mb-6">
            {currentProject.images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={\`group/thumb relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 \${
                  selectedImageIndex === index
                    ? 'ring-2 ring-rose-500 scale-105'
                    : 'hover:ring-2 hover:ring-neutral-600 hover:scale-105'
                }\`}
              >
                <img
                  src={image}
                  alt={\`\${currentProject.title[isArabic ? 'ar' : 'en']} - \${index + 1}\`}
                  className="w-full h-full object-cover"
                  width="120"
                  height="80"
                  loading="lazy"
                />
              </button>
            ))}
          </div>`;
    
    // Replace the existing thumbnail implementation
    content = content.replace(
      /\{\/\* Thumbnail navigation \*\/\}[\s\S]*?<\/div>/,
      optimizedThumbnails.trim()
    );
    
    await fs.writeFile(carGalleryPath, content);
    console.log('  ✅ CarGallery DOM optimized (reduced thumbnail count)');
  } catch (error) {
    console.log(`  ⚠️  Could not optimize CarGallery: ${error.message}`);
  }
}

/**
 * 3. Optimize LCP element (Hero images)
 */
async function optimizeLCPElement() {
  console.log('🖼️  Optimizing LCP element (Hero images)...');
  
  try {
    const heroPath = path.join(projectRoot, 'src/components/HeroCarousel.tsx');
    let content = await fs.readFile(heroPath, 'utf8');
    
    // Add fetchpriority="high" to the first image and optimize loading
    content = content.replace(
      /loading={slide\.id === 1 \? "eager" : "lazy"}/,
      'loading={slide.id === 1 ? "eager" : "lazy"}\n                    fetchPriority={slide.id === 1 ? "high" : "low"}\n                    decoding="async"'
    );
    
    // Add preload hint for the first hero image
    const preloadHint = `
    // Preload first hero image for better LCP
    useEffect(() => {
      if (slides.length > 0) {
        const firstSlide = slides[0];
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = firstSlide.image;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    }, [slides]);`;
    
    // Add the preload effect after imports
    content = content.replace(
      /const \[selectedIndex, setSelectedIndex\]/,
      `${preloadHint}\n\n  const [selectedIndex, setSelectedIndex]`
    );
    
    await fs.writeFile(heroPath, content);
    console.log('  ✅ Hero images optimized for LCP');
  } catch (error) {
    console.log(`  ⚠️  Could not optimize hero images: ${error.message}`);
  }
}

/**
 * 4. Enable server-side compression
 */
async function enableServerCompression() {
  console.log('🗜️  Enabling server-side compression...');
  
  // Update .htaccess with more aggressive compression
  const htaccessContent = `
# SupaKoto Emergency Performance Optimizations

# Enable Brotli compression (if available)
<IfModule mod_brotli.c>
    AddOutputFilterByType BROTLI_COMPRESS text/plain
    AddOutputFilterByType BROTLI_COMPRESS text/html
    AddOutputFilterByType BROTLI_COMPRESS text/xml
    AddOutputFilterByType BROTLI_COMPRESS text/css
    AddOutputFilterByType BROTLI_COMPRESS text/javascript
    AddOutputFilterByType BROTLI_COMPRESS application/xml
    AddOutputFilterByType BROTLI_COMPRESS application/xhtml+xml
    AddOutputFilterByType BROTLI_COMPRESS application/rss+xml
    AddOutputFilterByType BROTLI_COMPRESS application/javascript
    AddOutputFilterByType BROTLI_COMPRESS application/x-javascript
    AddOutputFilterByType BROTLI_COMPRESS application/json
    AddOutputFilterByType BROTLI_COMPRESS image/svg+xml
    AddOutputFilterByType BROTLI_COMPRESS font/woff
    AddOutputFilterByType BROTLI_COMPRESS font/woff2
</IfModule>

# Fallback to Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE font/woff
    AddOutputFilterByType DEFLATE font/woff2
    
    # Set compression level (1-9, 9 is highest)
    DeflateCompressionLevel 9
</IfModule>

# Aggressive caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Remove ETags (use Cache-Control instead)
<IfModule mod_headers.c>
    Header unset ETag
    FileETag None
    
    # Cache control headers
    <FilesMatch "\\.(css|js|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    <FilesMatch "\\.(html|htm)$">
        Header set Cache-Control "public, max-age=3600"
    </FilesMatch>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Preload key resources
<IfModule mod_headers.c>
    <FilesMatch "\\.(html|htm)$">
        Header add Link "</logo.svg>; rel=preload; as=image"
        Header add Link "</icon-logo.svg>; rel=preload; as=image"
        Header add Link "<https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap>; rel=preload; as=style"
    </FilesMatch>
</IfModule>
`;

  try {
    await fs.writeFile(path.join(projectRoot, 'public/.htaccess'), htaccessContent);
    console.log('  ✅ Server compression enabled with Brotli + Gzip');
  } catch (error) {
    console.log(`  ⚠️  Could not update .htaccess: ${error.message}`);
  }
}

/**
 * 5. Optimize main-thread work by reducing JavaScript execution
 */
async function optimizeMainThread() {
  console.log('⚡ Optimizing main-thread work...');
  
  // Create a debounced scroll handler to reduce main-thread work
  const optimizedScrollContent = `
// Optimized scroll utilities to reduce main-thread work
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Passive event listeners for better performance
export const addPassiveEventListener = (
  element: Element | Window,
  event: string,
  handler: EventListener
) => {
  element.addEventListener(event, handler, { passive: true });
};
`;

  try {
    await fs.writeFile(path.join(projectRoot, 'src/utils/performance-helpers.ts'), optimizedScrollContent);
    console.log('  ✅ Main-thread optimization utilities created');
  } catch (error) {
    console.log(`  ⚠️  Could not create performance helpers: ${error.message}`);
  }
}

/**
 * Main execution function
 */
async function runEmergencyFixes() {
  try {
    await fixAstroConfig();
    await optimizeDOMSize();
    await optimizeLCPElement();
    await enableServerCompression();
    await optimizeMainThread();
    
    console.log('\n🎉 Emergency Performance Fixes Applied!');
    console.log('\n📊 Expected Improvements:');
    console.log('  • Text compression: 4,834 KiB → Enabled (Brotli + Gzip)');
    console.log('  • JavaScript minification: 2,707 KiB → Aggressive Terser config');
    console.log('  • LCP element: 10,760ms → Hero image preloading + fetchPriority');
    console.log('  • DOM size: 1,479 elements → Reduced thumbnail grid');
    console.log('  • Main-thread work: 4.6s → Optimized scroll handlers');
    
    console.log('\n🚀 Critical Next Steps:');
    console.log('  1. Run: npm run build (to apply new compression)');
    console.log('  2. Deploy with .htaccess file for server compression');
    console.log('  3. Test: npm run test:lighthouse (verify improvements)');
    
    console.log('\n⚠️  Important Notes:');
    console.log('  • Server must support Brotli/Gzip compression');
    console.log('  • .htaccess file must be deployed with the site');
    console.log('  • First hero image will now preload for better LCP');
    console.log('  • DOM size reduced by limiting thumbnail display');
    
  } catch (error) {
    console.error('❌ Emergency fixes failed:', error);
    process.exit(1);
  }
}

// Run emergency fixes
runEmergencyFixes();
