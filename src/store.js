import { create } from 'zustand';

export const useStore = create((set) => ({
  // Language
  language: 'fr',
  setLanguage: (lang) => set({ language: lang }),
  
  // View mode
  viewMode: 'satellites', // 'satellites' | 'asteroids'
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // Selected object
  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),
  
  // Geolocation
  userLocation: null,
  setUserLocation: (location) => {
    localStorage.setItem('userLocation', JSON.stringify(location));
    set({ userLocation: location });
  },
  
  // Auto refresh
  lastRefresh: Date.now(),
  setLastRefresh: () => set({ lastRefresh: Date.now() }),
  
  // Filters
  satelliteFilters: {
    types: [],
    altitudes: [],
  },
  setSatelliteFilters: (filters) => set({ satelliteFilters: filters }),
  
  asteroidFilters: {
    dates: '7',
    sizes: [],
    distances: [],
  },
  setAsteroidFilters: (filters) => set({ asteroidFilters: filters }),
}));
