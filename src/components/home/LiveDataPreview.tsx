
import { useState, useEffect } from 'react';
import { ArrowRight, Activity, Sun, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockData = {
  solarFlares: [
    { class: 'M1.5', time: '2025-04-17T08:22:00Z', region: 'AR3664' },
    { class: 'C7.3', time: '2025-04-16T14:57:00Z', region: 'AR3662' },
    { class: 'X1.2', time: '2025-04-15T03:11:00Z', region: 'AR3664' },
  ],
  kpIndex: 3,
  solarWindSpeed: 478, // km/s
  protonFlux: 3.8,
  lastUpdated: new Date().toISOString()
};

const LiveDataPreview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };
  
  // Get KP index color
  const getKpColor = (kp: number) => {
    if (kp <= 3) return 'bg-green-500';
    if (kp <= 5) return 'bg-yellow-500';
    if (kp <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Live Space Weather</h2>
          <p className="text-lg text-space-muted">
            Get real-time updates on current space weather conditions and recent solar activity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Solar Flares */}
          <div className="data-visualization">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sun className="text-space-warning" size={20} />
                Recent Solar Flares
              </h3>
              <span className="text-xs text-space-muted">Last 48 hours</span>
            </div>
            
            <div className="space-y-4">
              {mockData.solarFlares.map((flare, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md transition-colors">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      flare.class.startsWith('X') ? 'bg-red-500/20 text-red-400' : 
                      flare.class.startsWith('M') ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {flare.class.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{flare.class} Flare</p>
                    <p className="text-xs text-space-muted">
                      {new Date(flare.time).toLocaleString()} - Region {flare.region}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current Conditions */}
          <div className="data-visualization">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Activity className="text-space-highlight" size={20} />
                Current Conditions
              </h3>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                <span className="text-xs text-space-muted">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card">
                <div className="text-xs text-space-muted mb-1">Kp Index</div>
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  {mockData.kpIndex}
                  <div className={`w-3 h-3 rounded-full ${getKpColor(mockData.kpIndex)}`}></div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-xs text-space-muted mb-1">Solar Wind</div>
                <div className="text-3xl font-bold text-white">{mockData.solarWindSpeed}</div>
                <div className="text-xs text-space-muted">km/s</div>
              </div>
              
              <div className="stat-card col-span-2">
                <div className="text-xs text-space-muted mb-1">Proton Flux</div>
                <div className="text-3xl font-bold text-white">
                  {mockData.protonFlux} <span className="text-sm font-normal">pfu</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-space-muted flex justify-between">
              <div>Last updated: {new Date(mockData.lastUpdated).toLocaleTimeString()}</div>
              <div>Source: NOAA SWPC</div>
            </div>
          </div>
          
          {/* Earth Status */}
          <div className="data-visualization">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Shield className="text-space-accent" size={20} />
                Earth Status
              </h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400">
                Normal
              </span>
            </div>
            
            <div className="relative h-48 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-blue-500 absolute animate-pulse-slow">
                <div className="absolute inset-2 rounded-full bg-blue-700"></div>
              </div>
              
              {/* Magnetic field representation */}
              <div className="absolute w-full h-full">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full h-0.5 bg-blue-400/20 rounded-full"
                    style={{ 
                      transform: `rotate(${i * 22.5}deg)`, 
                      top: 'calc(50% - 1px)',
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Current time display */}
              <div className="absolute bottom-0 w-full text-center text-xs text-space-muted">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/dashboard" className="button-primary">
            View Full Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveDataPreview;
