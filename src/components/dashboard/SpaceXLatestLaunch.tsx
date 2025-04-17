
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Rocket,
  Youtube,
  ExternalLink,
  Image as ImageIcon,
  Check,
  X,
  Info,
  Calendar,
  Users,
  Navigation,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Crew {
  crew: string;
  role: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

interface Links {
  patch: {
    small: string | null;
    large: string | null;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_local: string;
  date_precision: string;
  static_fire_date_utc: string | null;
  details: string | null;
  success: boolean | null;
  failures: any[];
  upcoming: boolean;
  cores: Core[];
  crew: Crew[];
  ships: string[];
  links: Links;
}

const fetchLatestLaunch = async (): Promise<SpaceXLaunch> => {
  const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
  if (!response.ok) {
    throw new Error('Failed to fetch latest SpaceX launch data');
  }
  return response.json();
};

const SpaceXLatestLaunch = () => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['spacex-latest-launch'],
    queryFn: fetchLatestLaunch,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load SpaceX launch data', {
        description: 'Please try again later',
      });
    }
  }, [error]);

  const handleRefresh = () => {
    toast.info('Refreshing SpaceX launch data...');
    refetch();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy • h:mm a');
    } catch (e) {
      return 'Date unavailable';
    }
  };

  const truncateDetails = (text: string | null, maxLength: number = 400) => {
    if (!text) return 'No details available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Card className="bg-space-blue/20 border border-white/10 shadow-lg overflow-hidden">
      <CardHeader className="relative">
        {isLoading ? (
          <Skeleton className="h-8 w-48 mb-2" />
        ) : (
          <div className="flex items-center">
            {data?.links.patch.small && (
              <div className="mr-4 h-12 w-12 rounded-full overflow-hidden bg-black/40 flex items-center justify-center p-1">
                <img
                  src={data.links.patch.small}
                  alt={`${data?.name} mission patch`}
                  className="h-full w-auto object-contain"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Rocket size={18} className="text-space-accent" />
                🚀 Latest Launch Update – SpaceX
              </CardTitle>
              <CardDescription className="text-space-muted">
                Real-time information about the most recent SpaceX mission
              </CardDescription>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-[200px] w-full mb-2" />
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-400">Could not load launch data</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{data?.name}</h3>
                {data?.success !== null && (
                  <Badge
                    variant={data?.success ? 'default' : 'destructive'}
                    className={`${
                      data?.success
                        ? 'bg-green-600/30 text-green-400 hover:bg-green-600/40'
                        : 'bg-red-600/30 text-red-400 hover:bg-red-600/40'
                    }`}
                  >
                    {data?.success ? (
                      <span className="flex items-center gap-1">
                        <Check size={12} /> Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <X size={12} /> Failed
                      </span>
                    )}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-space-muted">
                <Calendar size={14} />
                <span>{formatDate(data?.date_utc || '')}</span>
              </div>

              {/* Mission Details */}
              <div className="mt-2">
                <p className="text-white/80">
                  {showFullDetails
                    ? data?.details || 'No details available'
                    : truncateDetails(data?.details)}
                </p>
                {data?.details && data.details.length > 400 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-space-accent mt-1"
                    onClick={() => setShowFullDetails(!showFullDetails)}
                  >
                    {showFullDetails ? 'Show Less' : 'Read More'}
                  </Button>
                )}
              </div>

              {/* Landing Status */}
              {data?.cores && data.cores.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="bg-space/30 border-space-blue text-white"
                  >
                    <span className="flex items-center gap-1">
                      <Navigation size={12} /> Landing:&nbsp;
                      {data.cores[0].landing_success === true ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <Check size={12} /> Successful
                        </span>
                      ) : data.cores[0].landing_success === false ? (
                        <span className="text-red-400 flex items-center gap-1">
                          <X size={12} /> Failed
                        </span>
                      ) : data.cores[0].landing_attempt ? (
                        <span className="text-yellow-400 flex items-center gap-1">
                          Attempted
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-1">
                          No Attempt
                        </span>
                      )}
                    </span>
                  </Badge>
                </div>
              )}

              {/* Crew Members */}
              {data?.crew && data.crew.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm uppercase text-space-muted mb-1 flex items-center gap-1">
                    <Users size={14} /> Crew Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.crew.map((member, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-space-blue/40 text-white"
                      >
                        {member.role || 'Crew Member'}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {data?.links?.flickr?.original && data.links.flickr.original.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm uppercase text-space-muted mb-2 flex items-center gap-1">
                    <ImageIcon size={14} /> Mission Gallery
                  </h4>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {data.links.flickr.original.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="overflow-hidden rounded-lg h-[200px] bg-black/20">
                              <img
                                src={image}
                                alt={`${data.name} launch image ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              )}

              {/* Links Section */}
              <div className="mt-4">
                <h4 className="text-sm uppercase text-space-muted mb-2 flex items-center gap-1">
                  <ExternalLink size={14} /> Mission Links
                </h4>
                <div className="flex flex-wrap gap-3">
                  <TooltipProvider>
                    {data?.links?.webcast && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={data.links.webcast}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-space/40 rounded-full hover:bg-space-blue/30 transition-colors"
                          >
                            <Youtube size={18} className="text-red-500" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Watch Launch on YouTube</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {data?.links?.reddit?.campaign && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={data.links.reddit.campaign}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-space/40 rounded-full hover:bg-space-blue/30 transition-colors"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-orange-500"
                            >
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.5 14.5C16.5 12.5 14.5 11 12 11C9.5 11 7.5 12.5 7.5 14.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 9C16.5 9 16 8.5 16 8C16 7.5 16.5 7 17 7C17.5 7 18 7.5 18 8C18 8.5 17.5 9 17 9Z"
                                fill="currentColor"
                              />
                              <path
                                d="M7 9C6.5 9 6 8.5 6 8C6 7.5 6.5 7 7 7C7.5 7 8 7.5 8 8C8 8.5 7.5 9 7 9Z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reddit Campaign Thread</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {data?.links?.wikipedia && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={data.links.wikipedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-space/40 rounded-full hover:bg-space-blue/30 transition-colors"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-400"
                            >
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.5 8.5L12 12L9.5 8.5L7 12L4.5 8.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.5 8.5L17 12L14.5 15.5L12 19L9.5 15.5L7 19L4.5 15.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Wikipedia Page</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {data?.links?.presskit && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={data.links.presskit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-space/40 rounded-full hover:bg-space-blue/30 transition-colors"
                          >
                            <Info size={18} className="text-blue-400" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Press Kit</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {data?.links?.article && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={data.links.article}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-space/40 rounded-full hover:bg-space-blue/30 transition-colors"
                          >
                            <ExternalLink size={18} className="text-white" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Article</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-white/10 pt-4 text-xs text-space-muted">
        <span>Last updated: {isLoading ? 'Loading...' : formatDate(new Date().toISOString())}</span>
        <Button variant="ghost" size="sm" onClick={handleRefresh} className="text-space-muted">
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpaceXLatestLaunch;
