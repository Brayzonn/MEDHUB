import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), tailwindcss()

  ],
  server: {
    port: 3000,
    proxy: {
      '/api': process.env.VITE_SERVER_URL ? process.env.VITE_SERVER_URL : 'http://localhost:3300', 
    },
  }
})
