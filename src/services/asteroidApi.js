const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export const getNearEarthObjects = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch asteroids');
    }
    
    const data = await response.json();
    
    // Flatten and process asteroids
    const asteroids = [];
    Object.values(data.near_earth_objects).forEach(dayAsteroids => {
      dayAsteroids.forEach(asteroid => {
        const approach = asteroid.close_approach_data[0];
        asteroids.push({
          id: asteroid.id,
          name: asteroid.name,
          diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
          isHazardous: asteroid.is_potentially_hazardous_asteroid,
          closeApproachDate: approach.close_approach_date_full,
          velocity: parseFloat(approach.relative_velocity.kilometers_per_second),
          missDistance: parseFloat(approach.miss_distance.kilometers),
          lunarDistance: parseFloat(approach.miss_distance.lunar),
        });
      });
    });
    
    return asteroids;
  } catch (error) {
    console.error('Error fetching asteroids:', error);
    return getMockAsteroids();
  }
};

export const getAsteroidDetails = async (asteroidId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/neo/${asteroidId}?api_key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch asteroid details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching asteroid details:', error);
    return null;
  }
};

// Mock data for demo
export const getMockAsteroids = () => [
  {
    id: '2021277',
    name: '2021 AF8',
    diameter: 230,
    isHazardous: false,
    closeApproachDate: '2025-01-15 12:34',
    velocity: 12.5,
    missDistance: 5800000,
    lunarDistance: 15.1
  },
  {
    id: '3726710',
    name: '2015 RG2',
    diameter: 450,
    isHazardous: true,
    closeApproachDate: '2025-01-20 08:12',
    velocity: 18.3,
    missDistance: 2100000,
    lunarDistance: 5.46
  },
  {
    id: '3727639',
    name: '2015 SB13',
    diameter: 89,
    isHazardous: false,
    closeApproachDate: '2025-01-18 15:45',
    velocity: 9.8,
    missDistance: 7200000,
    lunarDistance: 18.7
  }
];

export const formatDate = (daysFromNow = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};
