import React, { useState, useEffect } from 'react';
import { LaunchCard } from '../components/launches/LaunchCard';
import { Loader } from '../components/ui/Loader';
import { getUpcomingLaunches } from '../services/launchApi';
import { useTranslation } from '../hooks/useTranslation';
import { Rocket } from 'lucide-react';

export const Launches = () => {
  const { t } = useTranslation();
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      try {
        const data = await getUpcomingLaunches(20);
        setLaunches(data);
      } catch (error) {
        console.error('Error fetching launches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/20 rounded-xl">
          <Rocket size={32} className="text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t('launches.title')}</h1>
          <p className="text-gray-400">{t('launches.upcoming')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>

      {launches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">{t('common.error')}</p>
        </div>
      )}
    </div>
  );
};
