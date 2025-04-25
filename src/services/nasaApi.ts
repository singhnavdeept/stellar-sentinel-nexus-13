
const NASA_API_KEY = 'ZThlBSUgbRRdoK4aPby3FiEHy4majxRM93PzfecO';
const BASE_URL = 'https://api.nasa.gov/DONKI';

export interface SpaceWeatherEvent {
  activityID: string;
  catalog: string;
  startTime: string;
  sourceLocation?: string;
  activeRegionNum?: number;
  link: string;
  note: string;
}

export interface CMEEvent extends SpaceWeatherEvent {
  cmeAnalyses: Array<{
    latitude: number;
    longitude: number;
    speed: number;
    type: string;
    time21_5: string;
    estimatedShockArrivalTime: string;
  }>;
}

export interface SolarFlareEvent extends SpaceWeatherEvent {
  classType: string;
  intensity: string;
  peakTime: string;
}

export const fetchSpaceWeatherData = async (endpoint: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams({
    ...params,
    api_key: NASA_API_KEY,
  });

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`);
    if (!response.ok) throw new Error('NASA API request failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching space weather data:', error);
    return null;
  }
};

export const getRecentEvents = async () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const startDate = sevenDaysAgo.toISOString().split('T')[0];
  const endDate = today.toISOString().split('T')[0];

  const [cmeData, flareData, stormData] = await Promise.all([
    fetchSpaceWeatherData('CME', { startDate, endDate }),
    fetchSpaceWeatherData('FLR', { startDate, endDate }),
    fetchSpaceWeatherData('GST', { startDate, endDate }),
  ]);

  return {
    cmeEvents: cmeData || [],
    solarFlares: flareData || [],
    geomagneticStorms: stormData || [],
  };
};
