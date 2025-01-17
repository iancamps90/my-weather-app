import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-weather-app/', // Asegúrate de que este sea el nombre del repositorio
  build: {
    outDir: 'dist',
  },
});