import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src'],
    format: 'cjs',
    outDir: 'build/cjs',
    clean: true,
  },
  {
    entry: ['src'],
    format: 'esm',
    outDir: 'build/esm',
    clean: true,
  },
  {
    entry: ['src'],
    format: ['iife'],
    outDir: 'build/umd',
    name: 'monitor-sdk-browser',
  },
]);
