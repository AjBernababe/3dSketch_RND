import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5500,
        host: 'localhost'
    },
    base: './',
    build: {
        outDir: 'Compiled',
        assetsDir: '',
        clean: false,

        rollupOptions: {
            input: '/src/scripts/main.js',
            output: {
                entryFileNames: 'main.min.js',
            }
        }
    },
});