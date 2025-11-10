const BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

export const getUpcomingLaunches = async (limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/launch/upcoming/?limit=${limit}&mode=detailed`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch launches');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching launches:', error);
    return getMockLaunches();
  }
};

export const getLaunchById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/launch/${id}/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch launch details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching launch details:', error);
    return null;
  }
};

// Mock data for demo
export const getMockLaunches = () => [
  {
    id: '1',
    name: 'Falcon 9 | Starlink Group 7-9',
    net: '2025-11-10T10:30:00Z',
    window_start: '2025-11-10T10:30:00Z',
    window_end: '2025-11-10T14:30:00Z',
    status: {
      name: 'Go for Launch',
      abbrev: 'Go',
    },
    rocket: {
      configuration: {
        name: 'Falcon 9 Block 5',
        family: 'Falcon',
      },
    },
    mission: {
      name: 'Starlink Group 7-9',
      description: 'SpaceX constellation internet deployment mission',
      type: 'Communications',
    },
    pad: {
      name: 'Space Launch Complex 40',
      location: {
        name: 'Cape Canaveral, FL, USA',
      },
    },
    launch_service_provider: {
      name: 'SpaceX',
    },
    image: null,
    webcast_live: false,
  },
  {
    id: '2',
    name: 'Ariane 6 | Inaugural Flight',
    net: '2025-11-15T22:00:00Z',
    window_start: '2025-11-15T22:00:00Z',
    window_end: '2025-11-16T02:00:00Z',
    status: {
      name: 'To Be Confirmed',
      abbrev: 'TBC',
    },
    rocket: {
      configuration: {
        name: 'Ariane 6',
        family: 'Ariane',
      },
    },
    mission: {
      name: 'Ariane 6 Maiden Flight',
      description: 'First flight of ESA new heavy-lift launch vehicle',
      type: 'Test Flight',
    },
    pad: {
      name: 'ELA-4',
      location: {
        name: 'Kourou, French Guiana',
      },
    },
    launch_service_provider: {
      name: 'Arianespace',
    },
    image: null,
    webcast_live: false,
  },
];
