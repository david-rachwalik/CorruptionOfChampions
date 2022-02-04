import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [vue()],

  // Auto launch browser: https://vitejs.dev/config/#server-open
  server: { open: '/' },
  // decided against VSCode Extension: Vite, by Anthony Fu

  root: 'src',
  publicDir: 'assets/public',
  build: {
    outDir: '../dist', // '../wwwroot'
    emptyOutDir: true, // confirm because outDir jumps up from root
  },
});
