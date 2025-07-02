import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source images to optimize
const images = [
  { 
    src: 'public/images/hero.webp',
    outputBase: 'public/images/optimized/hero'
  },
  { 
    src: 'public/images/ceramic-coating.webp',
    outputBase: 'public/images/optimized/ceramic-coating'
  },
  { 
    src: 'public/images/luxury-detailing.webp',
    outputBase: 'public/images/optimized/luxury-detailing'
  }
];

// Sizes for responsive images
const sizes = [
  { suffix: 'mobile', width: 640, height: 360, quality: 80 },
  { suffix: 'tablet', width: 1024, height: 576, quality: 80 },
  { suffix: 'desktop', width: 1920, height: 1080, quality: 85 }
];

async function optimizeImages() {
  // Create output directory if it doesn't exist
  const projectRoot = path.resolve(__dirname, '..');
  const outputDir = path.join(projectRoot, 'public/images/optimized');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Update image paths to use absolute paths
  images.forEach(image => {
    image.src = path.join(projectRoot, image.src);
    image.outputBase = path.join(projectRoot, image.outputBase);
  });

  // Process each image
  for (const image of images) {
    console.log(`Processing ${image.src}...`);
    
    // Create optimized versions for each size
    for (const size of sizes) {
      const outputPath = `${image.outputBase}-${size.suffix}.webp`;
      
      try {
        await sharp(image.src)
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: size.quality, effort: 6 }) // Higher effort = better compression
          .toFile(outputPath);
          
        console.log(`Created ${outputPath} (${size.width}x${size.height})`);
      } catch (error) {
        console.error(`Error processing ${image.src} to ${outputPath}:`, error);
      }
    }
  }
}

optimizeImages()
  .then(() => console.log('Image optimization complete!'))
  .catch(err => console.error('Error optimizing images:', err));
