import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Add these configurations for better Vercel compatibility
  build: {
    outDir: 'dist', // Make sure this matches Vercel's expected output directory
    emptyOutDir: true,
    sourcemap: true,
  },
  // Add this if your app is not at the root of the domain
  base: '/',
})