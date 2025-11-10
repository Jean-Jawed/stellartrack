import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Satellite, Globe2, Rocket, Info, RefreshCw, Languages } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useStore } from '../../store';

export const Header = ({ onRefresh }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { language, setLanguage, viewMode, setViewMode } = useStore();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Satellite size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold hidden sm:block">StellarTrack</span>
        </Link>

        <nav className="flex items-center gap-2">
          {location.pathname === '/' && (
            <>
              <Button
                variant={viewMode === 'satellites' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('satellites')}
                icon={<Satellite size={16} />}
              >
                <span className="hidden sm:inline">{t('nav.satellites')}</span>
              </Button>
              <Button
                variant={viewMode === 'asteroids' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('asteroids')}
                icon={<Globe2 size={16} />}
              >
                <span className="hidden sm:inline">{t('nav.asteroids')}</span>
              </Button>
            </>
          )}

          <Link to="/launches">
            <Button
              variant={isActive('/launches') ? 'primary' : 'ghost'}
              size="sm"
              icon={<Rocket size={16} />}
            >
              <span className="hidden sm:inline">{t('nav.launches')}</span>
            </Button>
          </Link>

          <Link to="/about">
            <Button
              variant={isActive('/about') ? 'primary' : 'ghost'}
              size="sm"
              icon={<Info size={16} />}
            >
              <span className="hidden sm:inline">{t('nav.about')}</span>
            </Button>
          </Link>

          {onRefresh && (
            <Button variant="ghost" size="icon" onClick={onRefresh} icon={<RefreshCw size={18} />} />
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            icon={<Languages size={18} />}
          />
        </nav>
      </div>
    </header>
  );
};
