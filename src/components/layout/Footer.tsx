
import { Github, Twitter, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-space-dark py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="flex items-center gap-2">
                <span className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
                  <div className="absolute inset-1 bg-blue-700 rounded-full"></div>
                  <div className="absolute inset-[6px] bg-orange-500 rounded-full"></div>
                </span>
                <span className="text-xl font-bold text-white">SolarSentinel</span>
              </span>
            </Link>
            <p className="text-space-muted mt-2 mb-4">
              Your AI-Powered Space Weather Companion
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-space-muted hover:text-white transition-colors duration-200">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-space-muted hover:text-white transition-colors duration-200">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-space-muted hover:text-white transition-colors duration-200">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
              <a href="#" className="text-space-muted hover:text-white transition-colors duration-200">
                <Globe size={20} />
                <span className="sr-only">Website</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-space-muted hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/dashboard" className="text-space-muted hover:text-white transition-colors duration-200">Live Data</Link></li>
              <li><Link to="/phenomena" className="text-space-muted hover:text-white transition-colors duration-200">Phenomena</Link></li>
              <li><Link to="/chatbot" className="text-space-muted hover:text-white transition-colors duration-200">AI Assistant</Link></li>
              <li><Link to="/resources" className="text-space-muted hover:text-white transition-colors duration-200">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-space-muted hover:text-white transition-colors duration-200">NASA APIs</a></li>
              <li><a href="#" className="text-space-muted hover:text-white transition-colors duration-200">NOAA Space Weather</a></li>
              <li><a href="#" className="text-space-muted hover:text-white transition-colors duration-200">Space Weather Glossary</a></li>
              <li><a href="#" className="text-space-muted hover:text-white transition-colors duration-200">Educational Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-space-muted mb-4">Subscribe to our newsletter for space weather updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 bg-space-blue/20 rounded-l-lg border border-space-muted focus:outline-none focus:border-space-accent"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-space-accent text-white rounded-r-lg hover:bg-purple-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-space-blue">
          <p className="text-center text-space-muted">
            &copy; {new Date().getFullYear()} SolarSentinel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
