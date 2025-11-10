import React from 'react';
import { X, Ruler, Navigation, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useStore } from '../../store';

export const AsteroidInfo = () => {
  const { t } = useTranslation();
  const { selectedObject, setSelectedObject } = useStore();

  if (!selectedObject) return null;

  const asteroid = selectedObject;

  return (
    <div className="fixed right-4 top-20 w-80 max-h-[calc(100vh-6rem)] overflow-auto z-30 hidden md:block">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">{asteroid.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedObject(null)}
            icon={<X size={18} />}
          />
        </div>

        <div className="mb-4 p-3 rounded-lg" style={{
          backgroundColor: asteroid.isHazardous ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'
        }}>
          <div className="flex items-center gap-2">
            {asteroid.isHazardous ? (
              <>
                <AlertTriangle size={20} className="text-danger" />
                <span className="text-danger font-medium">{t('asteroids.hazardous')}</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} className="text-success" />
                <span className="text-success font-medium">{t('asteroids.safe')}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('asteroids.diameter')}</p>
              <p className="font-medium">{Math.round(asteroid.diameter)} {t('common.meters')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Navigation size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('asteroids.distance')}</p>
              <p className="font-medium">
                {(asteroid.missDistance / 1000).toFixed(0)} km
                <span className="text-xs text-gray-400 ml-1">
                  ({asteroid.lunarDistance?.toFixed(2)} LD)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap size={16} className="text-accent" />
            <div>
              <p className="text-xs text-gray-400">{t('asteroids.speed')}</p>
              <p className="font-medium">{asteroid.velocity?.toFixed(1)} {t('common.kms')}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-1">{t('asteroids.closeApproach')}</p>
          <p className="text-sm font-medium">{new Date(asteroid.closeApproachDate).toLocaleString()}</p>
        </div>
      </Card>
    </div>
  );
};
