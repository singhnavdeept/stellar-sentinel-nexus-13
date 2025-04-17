
import { ArrowRight, Rocket, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarField from '../ui/StarField';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <StarField />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-24 sm:pb-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-gradient">SolarSentinel</span>
              <br />
              <span className="text-white">Space Weather Intelligence</span>
            </h1>
            <p className="text-xl text-space-muted mb-8 max-w-2xl">
              Your AI-powered companion for tracking, understanding, and visualizing 
              space weather phenomena. Real-time solar flare alerts, geomagnetic storm 
              tracking, and educational resources in one place.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="button-primary">
                View Live Dashboard
                <ArrowRight size={20} />
              </Link>
              <Link to="/chatbot" className="button-secondary">
                Ask Our AI Assistant
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <Rocket size={20} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
              </div>
              <p className="text-sm text-space-muted">
                Powered by NASA, NOAA and space weather data
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square relative">
              {/* Sun Animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_60px_rgba(249,115,22,0.7)] animate-pulse-slow"></div>
              
              {/* Orbiting Earth */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full border border-white/10 relative animate-rotate-slow" style={{ animationDuration: '20s' }}>
                  <div className="absolute w-8 h-8 -left-4 -top-4">
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="absolute inset-1 rounded-full bg-blue-700"></div>
                  </div>
                </div>
              </div>
              
              {/* Solar Flare Animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] opacity-0 animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }}>
                <div className="absolute inset-0 rounded-full bg-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.5)]"></div>
              </div>
              
              {/* Particles */}
              <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-float" 
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${3 + Math.random() * 5}s`,
                      animationDelay: `${Math.random() * 2}s`,
                      opacity: 0.7,
                      boxShadow: '0 0 10px rgba(253, 224, 71, 0.7)'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Live Data Overlay */}
            <div className="absolute -bottom-4 -right-4 p-3 glass-card rounded-lg text-xs text-white animate-pulse-slow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-space-warning"></div>
                <span>Solar Flare Alert: M2.5 detected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-space-muted text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-space-muted rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-space-muted rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
