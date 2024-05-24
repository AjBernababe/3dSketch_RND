import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        outDir: 'Compiled',
        assetsDir: '',
        rollupOptions: {
            input: '/src/scripts/main.js',
            output: {
                entryFileNames: 'main.min.js',
            }
        }
    },
});