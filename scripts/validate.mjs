import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = [
  'index.html', '404.html', 'projects/index.html',
  'projects/secure-me-pls/index.html',
  'projects/canvas-copy-pasta/index.html',
  'projects/phishhook/index.html',
  'projects/sentiflow-network-lab/index.html',
  'projects/project-chameleon/index.html',
  'projects/huli-na-honeypot/index.html',
  'projects/network-security-lab/index.html'
];
const errors = [];
const optionalAssets = new Set(['/public/Cedrick-Vales-CV.pdf']);

async function exists(path) { try { await stat(path); return true; } catch { return false; } }

for (const relative of pages) {
  const file = resolve(root, relative);
  const html = await readFile(file, 'utf8');
  if (!/<html lang="en"/.test(html)) errors.push(`${relative}: missing language declaration`);
  if (!/<meta name="viewport"/.test(html)) errors.push(`${relative}: missing viewport metadata`);
  if (/<script(?![^>]*\bsrc=)/i.test(html)) errors.push(`${relative}: inline script is not allowed`);
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/i.test(match[0])) errors.push(`${relative}: image missing alt text`);
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/rel="[^"]*noopener[^"]*"/i.test(match[0])) errors.push(`${relative}: external link missing noopener`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    const link = match[1];
    if (link === '/' || link.startsWith('/#') || optionalAssets.has(link)) continue;
    const target = link.endsWith('/') ? resolve(root, `.${link}`, 'index.html') : resolve(root, `.${link}`);
    if (!(await exists(target))) errors.push(`${relative}: missing local target ${link}`);
  }
}

const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
if (!config.headers?.length) errors.push('vercel.json: security headers missing');

const catalogPath = resolve(root, 'public/content/certifications.js');
const catalog = await readFile(catalogPath, 'utf8');
const certificates = [...catalog.matchAll(/\{\s*title:\s*'([^']+)',\s*issuer:\s*'([^']+)',\s*image:\s*'([^']+)'(?:,\s*(issued|expires):\s*'([^']+)')?\s*\}/g)];
if (!certificates.length) errors.push('certifications: no certificate entries found');
for (const [, title, issuer, image, dateKind, date] of certificates) {
  if (!title || !issuer || !image.startsWith('/public/assets/certifications/')) errors.push(`certifications: invalid entry for ${title || 'untitled certificate'}`);
  if (!dateKind || !date) errors.push(`certifications: ${title} needs an issued or expiry date`);
  if (!(await exists(resolve(root, `.${image}`)))) errors.push(`certifications: missing badge image ${image}`);
}

if (errors.length) {
  console.error(`Validation failed:\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exit(1);
}
console.log(`Validated ${pages.length} pages, local assets, links, and security configuration.`);
