// Builds web/public/Naser_Demiraj_CV.pdf from cv/cv.html using the Chrome you already have.
//   npm run build:cv
// No extra dependencies. Set CHROME_PATH if Chrome isn't in a standard location.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'cv', 'cv.html');
const output = path.join(root, 'web', 'public', 'Naser_Demiraj_CV.pdf');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome/Edge not found. Set CHROME_PATH to its executable.');
  process.exit(1);
}

const profile = mkdtempSync(path.join(tmpdir(), 'cv-build-'));
const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'inherit' },
);
rmSync(profile, { recursive: true, force: true });
if (result.status !== 0 || !existsSync(output)) {
  console.error('PDF build failed.');
  process.exit(1);
}
console.log('Wrote', path.relative(root, output));
