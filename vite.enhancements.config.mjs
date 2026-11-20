import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  publicDir: false,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    minify: true,
    lib: {
      entry: resolve(projectRoot, 'enhancements.js'),
      formats: ['es'],
      fileName: () => 'enhancements.bundle.js'
    },
    outDir: resolve(projectRoot, 'public/vendor'),
    emptyOutDir: true,
    sourcemap: false
  }
});
