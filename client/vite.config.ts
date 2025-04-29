import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), tailwindcss()

  ],
  base: '/', 
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL || 'http://localhost:3300',
        changeOrigin: true,
        secure: false,
      }
    }    
  }
})
