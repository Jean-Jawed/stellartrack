import React, { useState, useEffect } from 'react';
import { CesiumGlobe } from '../components/globe/CesiumGlobe';
import { SatelliteInfo } from '../components/panels/SatelliteInfo';
import { AsteroidInfo } from '../components/panels/AsteroidInfo';
import { Loader } from '../components/ui/Loader';
import { useStore } from '../store';
import { useGeolocation } from '../hooks/useGeolocation';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import { useSatellites } from '../hooks/useSatellites'; // ⭐⭐ NOUVEAU HOOK ⭐⭐
import { getNearEarthObjects, formatDate, getMockAsteroids } from '../services/asteroidApi';
import { useTranslation } from '../hooks/useTranslation';

export const Home = () => {
  const { t } = useTranslation();
  const { viewMode } = useStore();
  const { userLocation, loading: geoLoading } = useGeolocation();
  
  // ⭐⭐ REMPLACÉ - Utilisation du nouveau hook satellites ⭐⭐
  const { satellites, loading: satellitesLoading } = useSatellites();
  
  const [asteroids, setAsteroids] = useState([]);
  const [asteroidsLoading, setAsteroidsLoading] = useState(true);

  const fetchAsteroids = async () => {
    setAsteroidsLoading(true);
    try {
      const startDate = formatDate(0);
      const endDate = formatDate(7);
      const neos = await getNearEarthObjects(startDate, endDate);
      setAsteroids(neos);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      setAsteroids(getMockAsteroids());
    } finally {
      setAsteroidsLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchAsteroids();
    }
  }, [userLocation]);

  const { timeLeft, manualRefresh } = useAutoRefresh(() => {
    // Le hook useSatellites gère son propre rafraîchissement
    fetchAsteroids();
  });

  const loading = geoLoading || satellitesLoading || asteroidsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <CesiumGlobe satellites={satellites} asteroids={asteroids} />
      
      {viewMode === 'satellites' && <SatelliteInfo />}
      {viewMode === 'asteroids' && <AsteroidInfo />}

      <div className="fixed bottom-4 left-4 glass px-4 py-2 rounded-lg text-sm text-gray-300">
        {t('common.refresh')} : {timeLeft}s
      </div>
    </div>
  );
};