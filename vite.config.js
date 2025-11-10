import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

// Nom du dépôt qui sert de sous-chemin sur GitHub Pages
const REPO_NAME = 'stellartrack'; 

export default defineConfig({
  // 🚀 Ajout crucial pour le déploiement GitHub Pages
  base: `/${REPO_NAME}/`,
  
  plugins: [react(), cesium()],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {}
  }
});