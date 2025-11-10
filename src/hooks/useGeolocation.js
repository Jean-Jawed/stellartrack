import { useEffect, useState } from 'react';
import { useStore } from '../store';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userLocation, setUserLocation } = useStore();

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      setUserLocation(JSON.parse(stored));
      setLoading(false);
      return;
    }

    // Request geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(location);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
          // Default to Paris if denied
          setUserLocation({ latitude: 48.8566, longitude: 2.3522 });
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
      setUserLocation({ latitude: 48.8566, longitude: 2.3522 });
    }
  }, [setUserLocation]);

  return { userLocation, loading, error };
};
