import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: { 
        hmr: {
            host: 'localhost',
        },
    }, 
    // build: {
    //     rollupOptions: {
    //       input: {
    //         main: './resources/js/app.js', // Adjust the path to your entry file
    //         custom: './resources/js/custom.js', // Add this line to include your custom JavaScript file
    //       },
    //     },
    // },
});
