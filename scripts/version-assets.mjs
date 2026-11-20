import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { transform } from 'lightningcss';

// /public assets are cached immutably in production. Change the URL when the
// bundle changes so returning visitors never receive the old interaction code.
const root = resolve(import.meta.dirname, '..');
const bundle = await readFile(join(root, 'public/vendor/enhancements.bundle.js'));
const version = createHash('sha256').update(bundle).digest('hex').slice(0, 12);
const scriptVersions = {};
for (const file of ['script.js', 'theme-init.js', 'public/content/certifications.js']) {
  scriptVersions[file] = createHash('sha256').update(await readFile(join(root,file))).digest('hex').slice(0,12);
}
const [base, overrides, redesign] = await Promise.all(['styles.css','custom-overrides.css','redesign.css'].map(name => readFile(join(root,name),'utf8')));
const sheets = {};
for (const [name, source] of Object.entries({ site: base + overrides + redesign, case: base + redesign })) {
  const { code } = transform({ filename: `${name}.css`, code: Buffer.from(source), minify: true });
  const hash = createHash('sha256').update(code).digest('hex').slice(0,12);
  sheets[name] = `/public/vendor/${name}.css?v=${hash}`;
  await writeFile(join(root,`public/vendor/${name}.css`), code);
}
async function updatePages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await updatePages(path); continue; }
    if (!entry.name.endsWith('.html')) continue;
    const html = await readFile(path, 'utf8');
    let updated = html.replace(/\/public\/vendor\/enhancements\.bundle\.js(?:\?v=[a-z\d-]+)?/g, `/public/vendor/enhancements.bundle.js?v=${version}`);
    updated = updated.replace(/src="\/(script\.js|theme-init\.js|public\/content\/certifications\.js)(?:\?v=[a-z\d]+)?"/g,
      (_, file) => `src="/${file}?v=${scriptVersions[file]}"`);
    const kind = /custom-overrides\.css|\/vendor\/site\.css/.test(updated) ? 'site' : 'case';
    let styled = false;
    updated = updated.replace(/<link rel="stylesheet" href="\/(?:styles\.css|custom-overrides\.css|redesign\.css|public\/vendor\/(?:site|case)\.css(?:\?v=[a-z\d]+)?)">/g, () => {
      if (styled) return '';
      styled = true;
      return `<link rel="stylesheet" href="${sheets[kind]}">`;
    });
    updated = updated.replace(/[\t ]+$/gm, '');
    if (updated !== html) await writeFile(path, updated);
  }
}
await updatePages(root);
console.log(`Versioned animation bundle: ${version}`);
