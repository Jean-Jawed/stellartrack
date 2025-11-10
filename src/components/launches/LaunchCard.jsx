import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Rocket, MapPin, Building2, Clock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const LaunchCard = ({ launch }) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const launchDate = new Date(launch.net);
      const diff = launchDate - now;

      if (diff <= 0) {
        setCountdown(t('launches.status'));
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown(`${days}j ${hours}h ${minutes}m`);
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 60000);

    return () => clearInterval(timer);
  }, [launch.net, t]);

  const statusColor = launch.status?.abbrev === 'Go' ? 'bg-success' : 'bg-yellow-500';

  return (
    <Card hover>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Rocket size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg leading-tight mb-1">{launch.name}</h3>
            <p className="text-sm text-gray-400">{launch.rocket?.configuration?.name}</p>
          </div>
        </div>
        <span className={`${statusColor} text-xs px-2 py-1 rounded-full font-medium`}>
          {launch.status?.abbrev || 'TBD'}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Building2 size={14} className="text-accent" />
          <span>{launch.launch_service_provider?.name}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <MapPin size={14} className="text-accent" />
          <span className="truncate">{launch.pad?.location?.name}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Clock size={14} className="text-accent" />
          <span>{new Date(launch.net).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{t('launches.countdown')}</span>
          <span className="text-lg font-mono font-bold text-primary">{countdown}</span>
        </div>
      </div>
    </Card>
  );
};
