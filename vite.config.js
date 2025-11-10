import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

// Nom du dépôt qui sert de sous-chemin sur GitHub Pages
const REPO_NAME = 'stellartrack'; 
// Variable pour le chemin de base complet
const VITE_BASE_PATH = `/${REPO_NAME}/`;

export default defineConfig({
  // 🚀 Utilisation du chemin de base pour toutes les références d'assets
  base: VITE_BASE_PATH,
  
  plugins: [
    react(), 
    // 🚨 MODIFICATION : Passer le chemin de base explicitement au plugin Cesium
    // Ceci force le plugin à référencer Cesium.js et widgets.css avec le préfixe /stellartrack/
    cesium({
        publicPath: VITE_BASE_PATH + 'cesium/',
    })
  ],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {}
  }
});