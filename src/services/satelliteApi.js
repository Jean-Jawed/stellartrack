const API_KEY = import.meta.env.VITE_N2YO_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.n2yo.com/rest/v1/satellite';

// Popular satellite NORAD IDs
export const SATELLITE_IDS = {
  ISS: 25544,
  HUBBLE: 20580,
  TIANGONG: 48274,
  STARLINK_SAMPLE: [44713, 44714, 44715, 44716, 44717], // First 5 Starlink
};

// ⭐⭐ NOUVELLE FONCTION - Récupère TOUS les satellites visibles ⭐⭐
export const getVisibleSatellites = async (userLat, userLng, altitude = 0, radius = 90, category = 0) => {
  try {
    console.log(`📡 Appel API N2YO: ${userLat}, ${userLng}, radius: ${radius}`);
    
    const response = await fetch(
      `${BASE_URL}/above/${userLat}/${userLng}/${altitude}/${radius}/${category}/&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("✅ Réponse N2YO:", data.info);
    console.log(`🛰️ Nombre de satellites: ${data.above?.length}`);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching visible satellites:', error);
    // Fallback sur les données mock
    return { above: getMockSatellites(), info: { satcount: 3 } };
  }
};

export const getSatellitePosition = async (noradId, userLat, userLng) => {
  try {
    const response = await fetch(
      `${BASE_URL}/positions/${noradId}/${userLat}/${userLng}/0/1/${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch satellite position');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching satellite:', error);
    return null;
  }
};

export const getVisiblePasses = async (noradId, userLat, userLng, days = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/visualpasses/${noradId}/${userLat}/${userLng}/0/${days}/300/${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch visible passes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching passes:', error);
    return { passes: [] };
  }
};

// Mock data for demo if API fails
export const getMockSatellites = () => [
  {
    satid: 25544,
    satname: 'ISS (ZARYA)',
    satlatitude: 45.5,
    satlongitude: 12.3,
    sataltitude: 408,
    type: 'iss',
    color: '#fbbf24'
  },
  {
    satid: 20580,
    satname: 'HST',
    satlatitude: 28.5,
    satlongitude: -80.6,
    sataltitude: 540,
    type: 'science',
    color: '#06b6d4'
  },
  {
    satid: 48274,
    satname: 'TIANGONG',
    satlatitude: 41.5,
    satlongitude: 2.2,
    sataltitude: 390,
    type: 'station',
    color: '#fbbf24'
  }
];