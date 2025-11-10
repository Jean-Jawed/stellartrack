import React from 'react';
import { X, MapPin, Gauge, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useStore } from '../../store';

export const SatelliteInfo = () => {
  const { t } = useTranslation();
  const { selectedObject, setSelectedObject } = useStore();

  if (!selectedObject) return null;

  const sat = selectedObject;

  return (
    <div className="fixed right-4 top-20 w-80 max-h-[calc(100vh-6rem)] overflow-auto z-30 hidden md:block">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">{sat.satname || sat.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedObject(null)}
            icon={<X size={18} />}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('satellites.altitude')}</p>
              <p className="font-medium">{Math.round(sat.sataltitude || sat.altitude)} {t('common.km')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('satellites.speed')}</p>
              <p className="font-medium">~7.8 {t('common.kmh')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('satellites.period')}</p>
              <p className="font-medium">~90 {t('common.minutes')}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-2">{t('satellites.nextPass')}</p>
          <p className="text-sm">Calcul en cours...</p>
        </div>
      </Card>
    </div>
  );
};
