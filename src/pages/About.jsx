import React from 'react';
import { Card } from '../components/ui/Card';
import { ExternalLink, Globe2, Satellite, Zap } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const About = () => {
  const { t } = useTranslation();

  const technologies = [
    'React 18',
    'Cesium.js',
    'Tailwind CSS',
    'Zustand',
    'React Router',
    'Vite',
  ];

  const apis = [
    { name: 'N2YO', description: 'Satellite tracking', url: 'https://www.n2yo.com' },
    { name: 'NASA NeoWs', description: 'Near-Earth asteroids', url: 'https://api.nasa.gov' },
    { name: 'Space Devs', description: 'Space launches', url: 'https://thespacedevs.com' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('about.title')}</h1>
        <p className="text-gray-400 text-lg">{t('home.subtitle')}</p>
      </div>

      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Globe2 className="text-primary" />
          StellarTrack
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          {t('about.description')}
        </p>
        <p className="text-gray-300 leading-relaxed">
          Cette application permet de visualiser en temps réel les satellites en orbite, les astéroïdes proches de la Terre, et les lancements spatiaux à venir. 
          Explorez l'espace de manière immersive et éducative.
        </p>
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="text-accent" />
          {t('about.technologies')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-surface rounded-lg border border-white/10 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Satellite className="text-accent" />
          {t('about.apis')}
        </h3>
        <div className="space-y-3">
          {apis.map((api) => (
            <a
              key={api.name}
              href={api.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface rounded-lg border border-white/10 hover:border-accent/50 transition-colors group"
            >
              <div>
                <p className="font-medium group-hover:text-accent transition-colors">{api.name}</p>
                <p className="text-sm text-gray-400">{api.description}</p>
              </div>
              <ExternalLink size={18} className="text-gray-400 group-hover:text-accent transition-colors" />
            </a>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-3">{t('about.developer')}</h3>
        <p className="text-gray-300 mb-4">
          Développé avec passion par{' '}
          <a
            href="https://javed.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1"
          >
            Jawed
            <ExternalLink size={14} />
          </a>
        </p>
        <p className="text-sm text-gray-400">
          Full Stack Developer passionné d'astronomie et de technologies spatiales.
        </p>
      </Card>
    </div>
  );
};
