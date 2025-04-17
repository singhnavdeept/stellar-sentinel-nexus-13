
import { ArrowRight, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-space-blue via-space to-space-dark rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-space-accent rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-space-highlight rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative py-16 px-8 md:px-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Stay Informed About Space Weather</h2>
            <p className="text-lg text-white/80 max-w-2xl mb-10">
              Track solar events, receive alerts, and explore the fascinating world of space weather.
              Join thousands of space enthusiasts, researchers, and educators.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard" className="button-primary">
                Explore Live Dashboard
                <ArrowRight size={20} />
              </Link>
              <Link to="/chatbot" className="button-secondary">
                <BellRing size={20} />
                Set Up Alerts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
