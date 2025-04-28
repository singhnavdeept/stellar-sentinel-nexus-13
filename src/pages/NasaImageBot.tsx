
import { useState } from 'react';
import { searchNASAImages } from '@/services/nasaImageApi';
import StarField from '@/components/ui/StarField';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const NasaImageBot = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await searchNASAImages(query);
      if (searchResults.length === 0) {
        toast({
          title: "No Results",
          description: "No images found for your search. Try different keywords!",
          variant: "default"
        });
      } else {
        setImages(searchResults);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch NASA images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space">
      <StarField />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-space-muted hover:text-white flex items-center gap-2 mb-4">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">NASA Image Search</h1>
            <p className="text-space-muted">
              Search NASA's image database for space photographs, illustrations, and more.
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for space images..."
              className="flex-grow bg-space-blue/20 border-white/10 text-white"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-space-accent hover:bg-space-accent/90"
            >
              <Search size={16} className="mr-2" />
              Search
            </Button>
          </form>
          
          {isLoading ? (
            <div className="text-space-muted text-center py-8">Searching for images...</div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <Card key={index} className="bg-space-blue/20 border-white/10 overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={img.preview_url} 
                      alt={img.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-2">{img.title}</h3>
                    <p className="text-space-muted text-sm mb-2">
                      {new Date(img.date_created).toLocaleDateString()}
                    </p>
                    <p className="text-space-muted text-sm line-clamp-3">
                      {img.description?.slice(0, 150)}{img.description?.length > 150 ? '...' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default NasaImageBot;
