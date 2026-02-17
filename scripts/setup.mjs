import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const assetsSource = path.join(projectRoot, 'assets');
const publicDir = path.join(projectRoot, 'public');
const assetsDestination = path.join(publicDir, 'assets');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Move assets if they exist and destination doesn't
if (fs.existsSync(assetsSource) && !fs.existsSync(assetsDestination)) {
  fs.renameSync(assetsSource, assetsDestination);
  console.log('Moved assets to public/assets');
} else if (fs.existsSync(assetsDestination)) {
  console.log('Assets already in public folder');
} else if (!fs.existsSync(assetsSource)) {
  console.log('Assets source not found');
}
