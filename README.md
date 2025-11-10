# 🚀 StellarTrack

Application web immersive de visualisation en temps réel des satellites, astéroïdes et lancements spatiaux.

## ✨ Fonctionnalités

- **Globe 3D interactif** : Visualisation Earth avec Cesium.js
- **Suivi satellites** : Positions en temps réel (ISS, Starlink, etc.)
- **Astéroïdes proches** : Near-Earth Objects avec données NASA
- **Lancements spatiaux** : Calendrier des prochains lancements mondiaux
- **Auto-refresh** : Mise à jour automatique toutes les 60 secondes
- **Multilingue** : Interface FR/EN
- **Responsive** : Adapté mobile et desktop

## 🛠️ Technologies

- React 18 + Vite
- Cesium.js (globe 3D)
- Tailwind CSS
- Zustand (state management)
- React Router
- APIs : N2YO, NASA NeoWs, Space Devs

## 📦 Installation

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Cloner/Télécharger le projet**
```bash
cd stellartrack
```

2. **Installer les dépendances**
```bash
npm install --break-system-packages
```

3. **Configurer les clés API**

Copier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

Éditer `.env` et ajouter vos clés :

- **N2YO API** (satellites) : https://www.n2yo.com/api/
- **NASA API** (astéroïdes) : https://api.nasa.gov/ (utiliser `DEMO_KEY` pour tester)
- **Cesium Token** (globe 3D) : https://ion.cesium.com/ (compte gratuit)

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🚀 Utilisation

### Navigation
- **Home (/)** : Globe 3D avec satellites et astéroïdes
- **Lancements (/launches)** : Timeline des prochains lancements
- **About (/about)** : Informations et crédits

### Modes de visualisation
- **Satellites** : Cliquez sur un satellite pour voir ses détails
- **Astéroïdes** : Basculez sur le mode astéroïdes via le header

### Actualisation
- Auto-refresh toutes les 60 secondes
- Bouton refresh manuel dans le header

## 🌍 APIs utilisées

| API | Usage | Limite gratuite |
|-----|-------|----------------|
| N2YO | Position satellites | 1000 req/jour |
| NASA NeoWs | Astéroïdes proches | Illimité |
| Space Devs | Lancements spatiaux | Illimité |

## 📱 Responsive

- **Desktop** : Globe 3D complet + panneaux latéraux
- **Mobile** : Globe simplifié + modals bottom-sheet

## 🏗️ Build Production

```bash
npm run build
```

Les fichiers optimisés seront dans `/dist`

## 🚢 Déploiement

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📄 Licence

© 2025 StellarTrack - Développé par [Jawed](https://javed.fr)

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à ouvrir une issue ou PR.

## 📧 Contact

Pour toute question : [javed.fr](https://javed.fr)
