#!/usr/bin/env node

/**
 * Performance Optimization Script for SupaKoto Website
 * Addresses critical issues identified in Lighthouse audit
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🚀 Starting SupaKoto Performance Optimization...\n');

/**
 * 1. Add explicit width and height to images to prevent layout shifts
 */
async function optimizeImages() {
  console.log('📸 Optimizing images for layout stability...');
  
  const imageOptimizations = [
    {
      file: 'src/components/HeroCarousel.tsx',
      replacements: [
        {
          from: '<img',
          to: '<img width="1920" height="1080"'
        }
      ]
    },
    {
      file: 'src/components/CarGallery.tsx',
      replacements: [
        {
          from: 'className="w-full h-full object-cover"',
          to: 'className="w-full h-full object-cover" width="400" height="300"'
        }
      ]
    }
  ];

  for (const optimization of imageOptimizations) {
    try {
      const filePath = path.join(projectRoot, optimization.file);
      let content = await fs.readFile(filePath, 'utf8');
      
      for (const replacement of optimization.replacements) {
        content = content.replace(new RegExp(replacement.from, 'g'), replacement.to);
      }
      
      await fs.writeFile(filePath, content);
      console.log(`  ✅ Optimized ${optimization.file}`);
    } catch (error) {
      console.log(`  ⚠️  Could not optimize ${optimization.file}: ${error.message}`);
    }
  }
}

/**
 * 2. Create service worker for caching
 */
async function createServiceWorker() {
  console.log('⚡ Creating service worker for caching...');
  
  const serviceWorkerContent = `
// SupaKoto Service Worker for Performance Optimization
const CACHE_NAME = 'supakoto-v1';
const STATIC_ASSETS = [
  '/',
  '/logo.svg',
  '/icon-logo.svg',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event with cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

  try {
    await fs.writeFile(path.join(projectRoot, 'public/sw.js'), serviceWorkerContent);
    console.log('  ✅ Service worker created');
  } catch (error) {
    console.log(`  ⚠️  Could not create service worker: ${error.message}`);
  }
}

/**
 * 3. Optimize package.json scripts for production builds
 */
async function optimizePackageScripts() {
  console.log('📦 Optimizing package.json scripts...');
  
  try {
    const packagePath = path.join(projectRoot, 'package.json');
    const packageContent = await fs.readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    
    // Add performance-optimized build script
    packageJson.scripts = {
      ...packageJson.scripts,
      'build:optimized': 'NODE_ENV=production astro build --experimental-static-build',
      'analyze': 'npx astro build --experimental-static-build && npx bundlesize',
      'lighthouse': 'npx lighthouse http://localhost:4321 --output=html --output-path=./lighthouse-report.html'
    };
    
    await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('  ✅ Package.json scripts optimized');
  } catch (error) {
    console.log(`  ⚠️  Could not optimize package.json: ${error.message}`);
  }
}

/**
 * 4. Create .htaccess for server-side optimizations
 */
async function createHtaccess() {
  console.log('🌐 Creating .htaccess for server optimizations...');
  
  const htaccessContent = `
# SupaKoto Performance Optimizations

# Enable compression
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
</IfModule>

# Set cache headers
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
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
`;

  try {
    await fs.writeFile(path.join(projectRoot, 'public/.htaccess'), htaccessContent);
    console.log('  ✅ .htaccess created for server optimizations');
  } catch (error) {
    console.log(`  ⚠️  Could not create .htaccess: ${error.message}`);
  }
}

/**
 * Main optimization function
 */
async function runOptimizations() {
  try {
    await optimizeImages();
    await createServiceWorker();
    await optimizePackageScripts();
    await createHtaccess();
    
    console.log('\n🎉 Performance optimization completed!');
    console.log('\n📊 Expected improvements:');
    console.log('  • Reduced layout shifts (CLS improvement)');
    console.log('  • Better caching strategy');
    console.log('  • Server-side compression enabled');
    console.log('  • Optimized build process');
    console.log('\n🚀 Run "npm run build:optimized" for production build');
    console.log('🔍 Run "npm run lighthouse" to test performance');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

// Run optimizations
runOptimizations();
