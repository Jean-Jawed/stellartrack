import { useState, useEffect } from 'react';
import { getVisibleSatellites, getMockSatellites } from '../services/satelliteApi';
import { useStore } from '../store';

export const useSatellites = () => {
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userLocation } = useStore();

  useEffect(() => {
    const fetchSatellites = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Utilise la géolocalisation utilisateur ou Paris par défaut
        const position = userLocation || { latitude: 48.8566, longitude: 2.3522 };
        
        console.log('📍 Position utilisée pour satellites:', position);
        
        // Appel de la NOUVELLE fonction qui récupère tous les satellites visibles
        const data = await getVisibleSatellites(
          position.latitude,
          position.longitude,
          0,    // altitude observateur
          90,   // radius → HÉMISPHÈRE COMPLET (90°)
          0     // category → TOUS les satellites
        );
        
        console.log(`🛰️ ${data.above?.length || 0} satellites reçus de l'API`);
        
        if (data.above && data.above.length > 0) {
          setSatellites(data.above);
        } else {
          // Fallback sur les données mock si l'API retourne vide
          console.warn('API retourne 0 satellites, utilisation des données mock');
          setSatellites(getMockSatellites());
        }
        
      } catch (error) {
        console.error('❌ Erreur useSatellites:', error);
        setError(error.message);
        setSatellites(getMockSatellites());
      } finally {
        setLoading(false);
      }
    };

    fetchSatellites();
    
    // Rafraîchissement automatique toutes les 60 secondes
    const interval = setInterval(fetchSatellites, 60000);
    return () => clearInterval(interval);
  }, [userLocation]);

  return { satellites, loading, error };
};