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

const NASA_API_BASE = 'https://api.nasa.gov';
const NASA_IMAGES_BASE = 'https://images-api.nasa.gov';

interface APODResponse {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

interface NASAImage {
  title: string;
  description: string;
  href: string;
  thumbnail?: string;
}

export const getAPOD = async (): Promise<APODResponse> => {
  const response = await fetch(
    `${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch APOD');
  return response.json();
};

export const searchNASAImages = async (query: string): Promise<NASAImage[]> => {
  const response = await fetch(
    `${NASA_IMAGES_BASE}/search?q=${encodeURIComponent(query)}&media_type=image`
  );
  if (!response.ok) throw new Error('Failed to fetch NASA images');
  const data = await response.json();
  
  return data.collection.items
    .slice(0, 5)
    .map((item: any) => ({
      title: item.data[0].title,
      description: item.data[0].description,
      href: item.links?.[0]?.href || '',
      thumbnail: item.links?.[0]?.href || ''
    }));
};
