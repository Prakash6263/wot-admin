#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root paths
const rootDir = path.join(__dirname, '..');
const assetsSource = path.join(rootDir, 'assets');
const publicDir = path.join(rootDir, 'public');
const assetsDest = path.join(publicDir, 'assets');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('[Setup] Created public/ directory');
}

// Function to copy directory recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copy assets if source exists
if (fs.existsSync(assetsSource)) {
  try {
    const filesInDest = fs.existsSync(assetsDest)
      ? fs.readdirSync(assetsDest).length
      : 0;

    if (filesInDest === 0) {
      copyDirRecursive(assetsSource, assetsDest);
      console.log('[Setup] Copied assets to public/assets');
    } else {
      console.log('[Setup] Assets already exist in public/assets');
    }
  } catch (err) {
    console.error('[Setup] Error copying assets:', err.message);
    process.exit(1);
  }
} else {
  console.warn('[Setup] Warning: assets/ directory not found at root');
}

console.log('[Setup] Setup complete!');
