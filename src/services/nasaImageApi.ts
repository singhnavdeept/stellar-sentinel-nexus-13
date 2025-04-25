
interface NASAImage {
  title: string;
  description: string;
  nasa_id: string;
  preview_url: string;
  date_created: string;
}

export const searchNASAImages = async (query: string): Promise<NASAImage[]> => {
  try {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
    if (!response.ok) throw new Error('NASA API request failed');
    
    const data = await response.json();
    return data.collection.items
      .slice(0, 5) // Limit to 5 results
      .map((item: any) => ({
        title: item.data[0].title,
        description: item.data[0].description,
        nasa_id: item.data[0].nasa_id,
        preview_url: item.links?.[0]?.href || '',
        date_created: item.data[0].date_created
      }));
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    return [];
  }
};
