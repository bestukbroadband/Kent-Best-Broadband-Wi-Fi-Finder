/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '../public/favicon.svg');
const outDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const assets = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192.png', size: 192 },
  { name: 'android-chrome-512.png', size: 512 },
  { name: 'wbbw-app-icon.png', size: 192 },
  { name: 'wbbw-icon.png', size: 512 },
  { name: 'og-image.png', size: 1200, height: 630 }
];

async function generate() {
  console.log('Generating high-quality raster branding assets from SVG (ESM)...');
  
  // favicon.ico (usually 32x32) in standard format
  const icoDest = path.join(__dirname, '../public/favicon.ico');
  await sharp(svgPath)
    .resize(32, 32)
    .toFile(icoDest);
  console.log(`✔ Generated public/favicon.ico`);

  for (const asset of assets) {
    const width = asset.size;
    const height = asset.height || asset.size;
    const dest = path.join(outDir, asset.name);

    await sharp(svgPath)
      .resize(width, height)
      .toFile(dest);
    console.log(`✔ Generated public/icons/${asset.name} at ${width}x${height}`);

    // Standardize additional file placement:
    // PWA Icon, apple touch icon in the root of public for fallback
    if (asset.name === 'apple-touch-icon.png') {
      await sharp(svgPath)
        .resize(180, 180)
        .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
      console.log(`✔ Generated public/apple-touch-icon.png`);
    }

    // Also populate build /dist if it exists to keep hot state updated
    const distIconsDir = path.join(__dirname, '../dist/icons');
    if (fs.existsSync(distIconsDir)) {
      if (!fs.existsSync(distIconsDir)) {
        fs.mkdirSync(distIconsDir, { recursive: true });
      }
      await sharp(svgPath)
        .resize(width, height)
        .toFile(path.join(distIconsDir, asset.name));
    }
  }
  console.log('Successfully completed raster asset generation.');
}

generate().catch(err => {
  console.error('Fatal error during asset generation:', err);
  process.exit(1);
});
