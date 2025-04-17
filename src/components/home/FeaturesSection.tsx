
import { Activity, Layers, Zap, Radio, Bell, Brain } from 'lucide-react';

const features = [
  {
    icon: <Activity className="w-6 h-6 text-space-accent" />,
    title: 'Real-time Monitoring',
    description: 'Track solar flares, coronal mass ejections, and geomagnetic storms as they happen with live data feeds.'
  },
  {
    icon: <Layers className="w-6 h-6 text-space-highlight" />,
    title: 'Interactive Visualizations',
    description: 'Explore space weather phenomena through intuitive, interactive charts and 3D models.'
  },
  {
    icon: <Zap className="w-6 h-6 text-space-warning" />,
    title: 'Solar Event Predictions',
    description: 'Get forecasts for upcoming solar events and potential Earth impacts based on current data.'
  },
  {
    icon: <Radio className="w-6 h-6 text-space-success" />,
    title: 'Impact Assessment',
    description: 'Understand how space weather affects satellites, communications, power grids, and more.'
  },
  {
    icon: <Bell className="w-6 h-6 text-red-400" />,
    title: 'Customizable Alerts',
    description: 'Set up notifications for specific types of space weather events or threshold conditions.'
  },
  {
    icon: <Brain className="w-6 h-6 text-blue-400" />,
    title: 'AI-Powered Assistant',
    description: 'Ask questions and get explanations about space weather phenomena from our intelligent chatbot.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Explore Our Features</h2>
          <p className="text-lg text-space-muted">
            SolarSentinel brings the complex world of space weather to your fingertips
            through innovative technology and clear visualization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
            >
              <div className="bg-space-blue/30 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-space-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-space-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 left-0 w-80 h-80 bg-space-highlight/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
