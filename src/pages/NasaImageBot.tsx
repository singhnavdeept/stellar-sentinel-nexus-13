
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { searchNASAImages } from '@/services/nasaImageApi';
import StarField from '@/components/ui/StarField';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NasaImageBot = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const images = await searchNASAImages(query);
      if (images.length === 0) {
        setResults('No images found for your search. Try different keywords!');
      } else {
        const formattedResults = images.map(img => (
          `**${img.title}**\n` +
          `- 📅 Date: ${new Date(img.date_created).toLocaleDateString()}\n` +
          `- 📝 Description: ${img.description?.slice(0, 150)}...\n` +
          `- 🆔 NASA ID: ${img.nasa_id}\n` +
          `- 🔗 Preview: [View Image](${img.preview_url})\n\n`
        )).join('');
        setResults(formattedResults);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="text-space-muted">Searching for images...</div>
          ) : results ? (
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: results }} />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default NasaImageBot;
