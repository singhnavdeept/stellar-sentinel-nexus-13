
import { BookOpen, FileText, Video, Link2 } from 'lucide-react';

const resources = [
  {
    icon: <BookOpen className="w-6 h-6 text-space-accent" />,
    title: 'Space Weather Glossary',
    description: 'Learn key terms and concepts related to space weather phenomena.',
    link: '#'
  },
  {
    icon: <FileText className="w-6 h-6 text-space-highlight" />,
    title: 'Research Papers',
    description: 'Access recent scientific publications on space weather research.',
    link: '#'
  },
  {
    icon: <Video className="w-6 h-6 text-space-warning" />,
    title: 'Educational Videos',
    description: 'Watch explanatory videos about solar activity and its effects.',
    link: '#'
  },
  {
    icon: <Link2 className="w-6 h-6 text-space-success" />,
    title: 'External Resources',
    description: 'Explore NASA, NOAA, and other space weather monitoring sites.',
    link: '#'
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Educational Resources</h2>
          <p className="text-lg text-space-muted">
            Expand your knowledge of space weather with our curated collection of educational materials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              className="feature-card flex flex-col h-full"
            >
              <div className="bg-space-blue/30 p-3 rounded-full w-fit mb-4">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
              <p className="text-space-muted flex-grow">{resource.description}</p>
              <div className="mt-4 text-space-accent font-medium text-sm">
                Explore
              </div>
            </a>
          ))}
        </div>
        
        {/* Educational tip card */}
        <div className="mt-16 p-6 glass-card rounded-xl max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white flex items-center mb-4">
            <div className="mr-2 p-1 rounded-full bg-blue-500/20">
              <span className="text-blue-400 text-lg">💡</span>
            </div>
            Did You Know?
          </h3>
          <p className="text-space-muted">
            Earth's magnetosphere extends about 64,000 kilometers (40,000 miles) into space on the side facing the Sun, 
            and much further on the opposite side. This protective magnetic shield deflects most of the charged 
            particles from the solar wind, preventing them from reaching our planet's surface. During intense solar storms, 
            however, the magnetosphere can be compressed and some particles can enter, creating auroras and potentially 
            affecting power grids and satellites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
