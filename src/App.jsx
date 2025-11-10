import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Launches } from './pages/Launches';
import { About } from './pages/About';

function App() {
  const handleRefresh = () => {
    // Note: Dans l'implémentation finale, vous voudrez probablement
    // déclencher un rechargement des données plutôt qu'un window.location.reload()
    window.location.reload();
  };

  // Définition du chemin de base pour GitHub Pages. 
  // Il doit correspondre au 'base' de vite.config.js et au nom du dépôt.
  // On utilise une variable d'environnement pour s'assurer que cela n'est appliqué
  // qu'en production (déploiement sur GitHub Pages), pas en développement local.
  const basename = import.meta.env.PROD ? '/stellartrack/' : '/';

  return (
    // 🚨 AJOUT DE L'ATTRIBUT basename ICI
    <BrowserRouter basename={basename}>
      <div className="min-h-screen bg-background flex flex-col">
        <Header onRefresh={handleRefresh} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;