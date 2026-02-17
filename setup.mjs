import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Move assets to public directory
const assetsSource = path.join(__dirname, 'assets');
const assetsDestination = path.join(publicDir, 'assets');

if (fs.existsSync(assetsSource) && !fs.existsSync(assetsDestination)) {
  fs.renameSync(assetsSource, assetsDestination);
  console.log('✓ Assets moved to public folder');
} else if (fs.existsSync(assetsDestination)) {
  console.log('✓ Assets already in public folder');
} else {
  console.log('✗ Assets folder not found');
}
